import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
  Link
} from 'react-router-dom'
import Bundle from './bundle'
import PrivateRoute from './components/common/private-route'
import NotFound from './components/common/not-found'
import loadHome from 'bundle-loader?lazy!./containers/home'
import loadAccount from 'bundle-loader?lazy!./containers/account'
import loadLogin from 'bundle-loader?lazy!./containers/login'

//lazy load chunks
const bundle = (load) => () => (
  <Bundle load={load}>
    {(Component) => <Component/>}
  </Bundle>
)

const Home = bundle(loadHome)
const Account = bundle(loadAccount)
const Login = bundle(loadLogin)

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <Switch>
          <Route exact strict path="/" component={Home} />
          <Route exact strict path="/login" component={Login} />
          <PrivateRoute exact strict path="/account/:id" component={Account} />
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
