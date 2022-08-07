import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import Home from './pages/Home'
import My from './pages/My'
import News from './pages/News'
import House from './pages/House'
import CityList from './pages/CityList'
import Search from './pages/Search'
import Map from './pages/Map'
export default class App extends Component {
  render() {
    return (
     <Router>
       <div className='App'>
          <Switch>
          <Route  path="/home" component={Home}></Route>
          <Route  path="/my" component={My}></Route>
          <Route  path="/news" component={News}></Route>
          <Route  path="/house" component={House}></Route>
          <Route path="/city"  component={CityList}></Route>
          <Route path='/search'><Search/></Route>
          <Route path='/map'><Map/></Route>
          <Redirect to="/home"></Redirect>
          </Switch>
       </div>
     </Router>
    )
  }
}
