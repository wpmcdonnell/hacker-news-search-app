import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'

class History extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pastSearches: Object.values(sessionStorage).sort()
    }
  }

  componentDidMount () {
    if (window.performance.navigation.type === 1) {
      this.setState({ pastSearches: [] })
    }
  }

  clearSearches = () => {
    sessionStorage.clear()
    this.setState({ pastSearches: [] })
  }

  render () {
    console.log(this.state.pastSearches)
    console.log(sessionStorage)
    console.log('this is ur object.values', Object.values(sessionStorage))
    return (
      <Fragment>
        <div>
          <h2> User past searches</h2>
          <div>{this.state.pastSearches.map((item, index) => <p key={index}>{item}</p>)} </div>
          <button onClick={this.clearSearches}> Clear Searches</button>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(History)
