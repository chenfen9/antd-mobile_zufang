import React, { Component } from 'react'
import Tabar from '../../components/Tabar'
import { Swiper , Grid , Divider, Dropdown ,List} from 'antd-mobile'
import {SearchOutline,EnvironmentOutline} from 'antd-mobile-icons'
import './index.less'
import axios from 'axios'
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'
import { getCurrentCity } from '../../utils/position'
export default class Home extends Component {
  state = {
    // 轮播图数据
    swipers:[],
    navList:[
      {
        imgsrc:nav1,
        title:'整租'
      },
      {
        imgsrc:nav2,
        title:'合租'
      },
      {
        imgsrc:nav3,
        title:'地图找房'
      },
      {
        imgsrc:nav4,
        title:'去出租'
      }
    ],
    // 租房小组
    rentGroups:[],
    // 最新资讯
    recentNews:[],
    // 当前城市信息
    currentCityInfo:''
  }

  // 获取轮播图数据
   getSwiperData = async() => {
   const result = await axios.get('http://localhost:8080/home/swiper')
   if(result.status === 200){
   this.setState({swipers:result.data.body})
   }
  }

  // 获取租房小组数据
  getRentGroup  = async() => {
   const result  = await axios.get('http://localhost:8080/home/groups',{
     params:{
       area:'AREA%7C88cff55c-aaa4-e2e0'
     }
   })
   if(result.status === 200){
    this.setState({rentGroups:result.data.body})
   }
  }

  // 获取最新资讯数据
  getRecentNewData = async() => {
   const result = await axios.get('http://localhost:8080/home/news',{
     params:{
       area:'AREA%7C88cff55c-aaa4-e2e0'
     }
   })
   if(result.status === 200){ 
     this.setState({recentNews:result.data.body})
   }
  }

 async componentDidMount(){
    // 挂载时获取轮播图数据
    this.getSwiperData()

    // 挂载时获取租房小组数据
    this.getRentGroup()

    // 挂载时获取最新资讯
    this.getRecentNewData()

    // IP定位
   const result =  await getCurrentCity()
   this.setState({currentCityInfo:result.label})
  }

  // 去找房页面
  gotoHouse = () => {
    this.props.history.push('/house')
  }

  // 去城市选房页面
  goToCityList = () => {    
    this.props.history.push('/city')
  }

  // 去搜索页面
  goToSearch = () => {
    this.props.history.push('/search')
  }

  // 去地图页面
  goToMap = () => {
    this.props.history.push('/map')
  }
  render() {
    const {swipers,navList,rentGroups,recentNews,currentCityInfo} = this.state
    if( swipers.length === 0){
     return null;
    }
    // 轮播图所有数据
    const items = swipers.map((item, index) => (
      <Swiper.Item key={index}>
        <div>
        <img src={'http://localhost:8080'+item.imgSrc} alt="" className='pic'/>
        </div>
      </Swiper.Item>
    ))
    return (
      <div className="home">
        {/* 轮播图 */}
       <div className="swiper_control">
         <div className="search">
          {/* 下拉列表框 */}
          <div onClick={this.goToCityList} style={{height:'35px'}}>
          <Dropdown closeOnMaskClick={false} closeOnClickAway={false} >
            <Dropdown.Item key='sorter' title={currentCityInfo}>
            </Dropdown.Item>
          </Dropdown>
          </div>
          {/* 搜索列表 */}
          <List>
            <List.Item prefix={<SearchOutline />} onClick={this.goToSearch}>
              请输入小区或地址
            </List.Item>
          </List>
         </div>
         <EnvironmentOutline style={{position:'absolute',color:'pink',zIndex:1,fontSize:'30px',right:'5px',top:'22px'}} onClick={this.goToMap}/>
          <Swiper loop autoplay  indicatorProps={{ color: 'white',}}>{items}
          </Swiper>
       </div>

        {/* 导航菜单 */}
        <div className="nav-tab">
         {
           navList.map((nav,index)=>{
             return(
              <div className="nav" key={index} onClick={this.gotoHouse}>
                <img src={nav.imgsrc} alt="" />
                <span>{nav.title}</span>
              </div>
             )
           })
         }
        </div>

        {/* 租房小组 */}
        <div className="group">
          <h3 className='rentName'>租房小组
          <span className='more'>更多</span></h3>
          <Grid columns={2} gap={8}>
          {
              rentGroups.map(item=>{
                  return(
                    <Grid.Item key={item.id}>
                        <div className='rent-category'>
                          <div className="wordDesc">
                            <div className='title'>{item.title}</div>
                            <div className='desc'>{item.desc}</div>
                          </div>
                          <img src={'http://localhost:8080'+item.imgSrc} alt="" className='rent-pic'/>
                        </div>
                    </Grid.Item>
                  )
              })
          }
        </Grid>
        </div>

        {/* 资讯 */}
        <div className="recentNews">
          <h3 className="title">最新资讯</h3>
          {
            recentNews.map(item=>{
              return (
                <div key={item.id}>
                    <div className="nav_news" >
                  <img className="news_pic" src={'http://localhost:8080'+item.imgSrc} alt="" />
                  <div className="introduce">
                    <div className="simple_title">{item.title}</div>
                    <div className="about_from">
                      <span>{item.from}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
                <Divider />
                </div>
                
              )
            })
          }
        </div>

        {/* tabar */}
        <Tabar/>
        
      </div>
    )
  }
}
