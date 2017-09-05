import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../styles/home.css'

class Home extends Component {

  render() {

    return (
      <div>
        <h4>首页</h4>
        <Link to="/account/123">我的</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // const { home } = state
  return { }
}

export default withRouter(connect(mapStateToProps)(Home))
