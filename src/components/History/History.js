import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'

class History extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // Add sessionStorage to state, sort by value, and then reverse for latest search on top
      pastSearches: Object.values(sessionStorage).sort().reverse()
    }
  }

  // On mount, checks to see if page has been refreshed, if so, it clears this.state.pastSearches
  componentDidMount () {
    if (window.performance.navigation.type === 1) {
      this.setState({ pastSearches: [] })
    }
  }

  // clear sessionStorage
  clearSearches = () => {
    sessionStorage.clear()
    this.setState({ pastSearches: [] })
    // Reset counter to 1 in parent App component
    this.props.clearSearchStorageCounter()
  }

  render () {
    return (
      <Fragment>
        <div>
          {/* Map sessionStorage via this.state.pastSearches */}
          <h2 className='d-flex justify-content-center mt-3 mb-3'> User Past Searches</h2>
          <div>{this.state.pastSearches.map((item, index) => <p className='d-flex justify-content-center' key={index}>{item}</p>)} </div>
          {/* Show clear search button if there are searches present in state */}
          {this.state.pastSearches.toString() !== [].toString() ? <button className='btn-primary mt-2 mb-5 ml-5 d-flex justify-content-center' onClick={this.clearSearches}> Clear Searches</button> : <p className='d-flex justify-content-center'> You have no search history! </p> }
        </div>
      </Fragment>
    )
  }
}

export default withRouter(History)
