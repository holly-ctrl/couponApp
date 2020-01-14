import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Welcome from './components/Welcome'
import Landing from './components/Landing'
import Wallet from './components/Wallet'
import LoginError from './components/LoginError'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/welcome' component={Welcome}/>
        <Route path='/wallet' component={Wallet}/>
        <Route path='/loginError' component={LoginError}/>
    </Switch>
)