import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Meeting from './Meeting'
import Grid from './Grid'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Meeting}/>
      <Route exact path='/meeting' component={Grid}/>
      <Route exact path='/meeting/:number/' component={Grid}/>
    </Switch>
  </main>
)

export default Main;
