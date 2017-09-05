// https://reacttraining.com/react-router/web/guides/code-splitting
import { Component } from 'react'

class Bundle extends Component {
  // state = {
  //   // short for "module" but that's a keyword in js, so "mod"
  //   mod: null
  // }
  constructor(props) {
    super(props);
    this.state = {mod: null};
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({
      mod: null
    })
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    if(!this.state.mod) return false //官网没有这句，该项目下需要添加
    return this.props.children(this.state.mod)
  }
}

export default Bundle
