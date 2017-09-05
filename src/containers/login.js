import React from 'react'
import { Redirect, withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchLoginIfNeeded } from '../actions/login'

class Login extends React.Component {


  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, history, location } = this.props
    const { login } = nextProps

    if(login.mobile) {
      window.localStorage.isAuthenticated = 1
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(fetchLoginIfNeeded())
  }

  handleChange = (event) => {
    this.setState({
      mobile: (event.target.value || '').trim()
    })
  }

  render() {
    const { location, history, login } = this.props
    const { from } = location.state || {from: {pathname: '/'}}
    const isAuthenticated = window.localStorage.isAuthenticated

    if(isAuthenticated) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <button type="submit">{login.isFetching ? '正在登录...' : '登 录'}</button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  const { login } = state
  return { login }
}

export default withRouter(connect(mapStateToProps)(Login))
