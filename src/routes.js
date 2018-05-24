import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Meeting from './Meeting'
import Grid from './Grid'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Grid}/>
      <Route exact path='/meeting' component={Meeting}/>
    </Switch>
  </main>
)

export default Main;
