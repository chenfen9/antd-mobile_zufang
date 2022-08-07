import React, { Component } from 'react'
import { NavBar,IndexBar, List } from 'antd-mobile'
import axios from 'axios'
import './index.less'
import { getCurrentCity } from '../../utils/position'
import { ListItem } from 'antd-mobile/es/components/list/list-item'
export default class CityList extends Component {
  state = {
    cityList:{},
    cityIndex:[],
    currentCity:''
  }
  // 返回上一级页面
  goBack = () => {
    this.props.history.go(-1)
  }

  // 获取城市列表数据
  getCityListData  = async () => {
     const result =  await axios.get('http://localhost:8080/area/city?level=1')
     console.log(result)
     let {cityIndex,cityList} = this.handlerCityData(result.data.body)
     const hotInfo = await axios.get('http://localhost:8080/area/hot')
    //  console.log(hotInfo)
     const res = await getCurrentCity()
     cityList['#'] = [res]
     cityList['热门城市'] = hotInfo.data.body//  cityList['当前定位'] = this.state.currentCity
     cityIndex.unshift('热门城市')
     cityIndex.unshift('#')
     this.setState({cityIndex})
     this.setState({cityList})
    
  }

  // 处理城市数据
   handlerCityData = (list) => {
     let cityList = {};
     let cityIndex = [];
     list.forEach(item=>{
       let index  = item.short.slice(0,1)
       if(cityList[index]){
           cityList[index].push(item)
       }else{
         cityList[index] = [item]
       }
     })
     console.log(cityList)
     cityIndex = Object.keys(cityList).sort()
    // console.log(cityIndex)
     return {
       cityList,
       cityIndex
     }
      
   }

  componentDidMount(){
     this.getCityListData()
  }

  render() {
   const {cityIndex,cityList} = this.state
   if(cityIndex.length === 0 || cityList === {}){
    return false
   }
   console.log(cityList,cityIndex)
   const charCodeOfA = 'A'.charCodeAt(0)
   const groups = Array(28)
  .fill('')
  .map((_, i) => ({
    title: i === 0 ? '#': i===1 ? '热门城市': String.fromCharCode(charCodeOfA + i-2),
    items: i === 0 ? cityList['#']: i===1 ? cityList['热门城市'] : cityList[String.fromCharCode(charCodeOfA + i-2).toLowerCase()],
  }))
  console.log(groups)
    return (
      <div className="citylist">
         <NavBar onBack={this.goBack}>城市选择</NavBar>
         <div style={{ height: window.innerHeight }}>
      <IndexBar>
        {groups.map(group => {
          const { title, items } = group
          console.log(items)
          return (
            <IndexBar.Panel
              index={title}
              title={!items ? '' : `${title}`}
              key={`${title}`}
              // className={!items ? 'hide' : ''}
            >
              <List>
                { items ? items.map(item=>{
                   return (
                    <List.Item key={item.value}>
                     {item.label}
                    </List.Item>
                   )
                 }):''}
              </List>
            </IndexBar.Panel>
          )
        })}
      </IndexBar>
    </div>
      </div>
    )
  }
}
