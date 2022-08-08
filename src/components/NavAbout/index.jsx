import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { NavBar } from 'antd-mobile'
class NavAbout extends Component {
  
  goBack = () => {
        this.props.history.go(-1)
 }
  render() {
    return (
        <NavBar onBack={this.goBack}>{this.props.title}</NavBar>
    )
  }
}
export default withRouter(NavAbout)
