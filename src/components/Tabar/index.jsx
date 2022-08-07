import React, { Component } from 'react'
import { Badge, TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UserOutline,
    SmileOutline,
    FrownFill
  } from 'antd-mobile-icons'
import './index.css'
class Tabar extends Component {
    state = {
        tabs:[
            {
              key: 'home',
              title: '首页',
              icon: <AppOutline />,
              badge: Badge.dot,
            },
            {
              key: 'house',
              title: '找房',
              icon: (active) =>
              active ? <SmileOutline /> : <FrownFill/>,
              badge: '5',
            },
            {
              key: 'news',
              title: '资讯',
              icon: (active) =>
                active ? <MessageFill /> : <MessageOutline />,
              badge: '99+',
            },
            {
              key: 'my',
              title: '我的',
              icon: <UserOutline />,
            },
          ],
          k:""
        
    }
    goToCategoryPage = (a) => {
        switch(a){
          case 'home':
            this.props.history.push('/home');
            break;
          case 'house':
            this.props.history.push('/house')
            break;
          case 'news':
            this.props.history.push('/news')
            break;
          case 'my':
            this.props.history.push('/my');
            break;
          default:
            this.push.history.push('/home')
            break;
        }  
    }
  componentDidMount(){
    const newK = this.props.location.pathname.slice(1)
    console.log(newK)
    this.setState({k:newK}) 
  }

  
  render() {
    const {tabs,k} = this.state
    return (
        <div className="tabbar-nav">
           <TabBar safeArea onChange={this.goToCategoryPage} activeKey={k}>
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
            </TabBar>
        </div>
    )
  }
}
export default  withRouter(Tabar)
