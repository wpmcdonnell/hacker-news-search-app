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
    return (
      <Fragment>
        <div>
          <h2 className='d-flex justify-content-center mt-3'> User past searches</h2>
          <div>{this.state.pastSearches.map((item, index) => <p className='d-flex justify-content-center' key={index}>{item}</p>)} </div>
          {this.state.pastSearches.toString() !== [].toString() ? <button className='btn-primary mt-2 mb-5 justify-content-center' onClick={this.clearSearches}> Clear Searches</button> : 'You have no search history!' }
        </div>
      </Fragment>
    )
  }
}

export default withRouter(History)
