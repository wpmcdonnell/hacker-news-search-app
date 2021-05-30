import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'

class History extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pastSearches: []
    }
  }

  componentDidMount () {
    const searches = []
    const keys = Object.keys(localStorage)
    let i = keys.length

    while (i--) {
      searches.push(localStorage.getItem(keys[i]))
    }
    this.setState({ pastSearches: searches })
  }

  render () {
    console.log(this.state.pastSearches)
    console.log(this.props.location.data)
    return (
      <Fragment>
        <div>
          <h2> User past searches</h2>
          <div>{this.state.pastSearches.map(item => <p key={item}>{item}</p>)}</div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(History)
