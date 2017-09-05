import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

export default class PrivateRoute extends Component {

  render() {
    const { component, ...rest } = this.props
    const isAuthenticated = window.localStorage.isAuthenticated

    const renderRedirect = (props) => (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )

    return(
      <Route {...rest} render={isAuthenticated ? component : renderRedirect} />
    )
  }
}
