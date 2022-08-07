import React,{Component} from 'react'
import Tabar from '../../components/Tabar'
import './index.less'
import {  Divider } from 'antd-mobile'
import axios from 'axios'
export default class News extends Component{
    state = {
        // 最新资讯
      recentNews:[],
    }
    componentDidMount(){
    this.getRecentNewData()
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
    render(){
        const {recentNews} = this.state
        return(
           <div>
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
                <Tabar/>
           </div>
        )
    }
}