import React, { Component } from 'react'
import { withRouter, matchPath } from 'react-router-dom'
import { connect } from 'react-redux'
import '../styles/account.css'


class Account extends Component {

  constructor(props) {
    super(props)
  }

  getParams = (location) => {
    const match = matchPath((location || this.props.location).pathname, {
      path: '/account/:id',
      exact: true,
      strict: true
    })

    return match && match.params || {}
  }

  componentWillMount() {
    const params = this.getParams()
    this.id = params.id
  }

  render() {
    return (
      <div>
        我的ID{this.id}
      </div>
    )
  }
}

const mapStateToProps = state => {
  // const { account } = state
  return { }
}

export default withRouter(connect(mapStateToProps)(Account))
