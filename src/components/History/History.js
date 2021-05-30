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
    const keys = Object.keys(sessionStorage)
    let i = keys.length

    while (i--) {
      searches.push(sessionStorage.getItem(keys[i]))
    }
    this.setState({ pastSearches: searches })
  }

  clearSearches = () => {
    sessionStorage.clear()
    this.setState({ pastSearches: [] })
  }

  render () {
    console.log(sessionStorage)
    return (
      <Fragment>
        <div>
          <h2> User past searches</h2>
          <div>{this.state.pastSearches.map(item => <p key={item}>{item}</p>)} </div>
          <button onClick={this.clearSearches}> Clear Searches</button>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(History)
