import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Login } from './pages'
export default function Routing () {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  )
}
