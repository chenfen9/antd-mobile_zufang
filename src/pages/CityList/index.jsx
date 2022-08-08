import React, { Component } from 'react'
import {IndexBar, List,Toast } from 'antd-mobile'
import axios from 'axios'
import './index.less'
import { getCurrentCity } from '../../utils/position'
import NavAbout from '../../components/NavAbout'
export default class CityList extends Component {
  state = {
    cityList:{},
    cityIndex:[],
    currentCity:'',
    city:['北京','上海','广州','深圳']
  }


  // 获取城市列表数据
  getCityListData  = async () => {
     const result =  await axios.get('http://localhost:8080/area/city?level=1')
    //  console.log(result)
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
    //  console.log(cityList)
     cityIndex = Object.keys(cityList).sort()
    // console.log(cityIndex)
     return {
       cityList,
       cityIndex
     }
      
   }

    //  切换城市
    changeCity  = (cityInfo) => {
     if(this.state.city.indexOf(cityInfo.label) > -1){
      localStorage.setItem('currentCity',JSON.stringify(cityInfo))
      // console.log(cityInfo)
      this.props.history.go(-1)
     }else{
      Toast.show({
        content: '该地区暂无房源'
      })
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
  //  console.log(cityList,cityIndex)
   const charCodeOfA = 'A'.charCodeAt(0)
   const groups = Array(28)
  .fill('')
  .map((_, i) => ({
    title: i === 0 ? '#': i===1 ? '热门城市': String.fromCharCode(charCodeOfA + i-2),
    items: i === 0 ? cityList['#']: i===1 ? cityList['热门城市'] : cityList[String.fromCharCode(charCodeOfA + i-2).toLowerCase()],
  }))
  // console.log(groups)
    return (
      <div className="citylist">
        <NavAbout title='城市选择'/>
         <div style={{ height: window.innerHeight }}>
      <IndexBar>
        {groups.map(group => {
          const { title, items } = group
          return (
            <IndexBar.Panel
              index={title}
              title={`${title}`}
              key={`${title}`}
              className={!items ? 'hide' : ''}
            >
              <List className={!items ? 'hide' : ''}>
                { items ? items.map(item=>{
                   return (
                    <List.Item key={item.value} onClick={()=>this.changeCity(item)}>
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
