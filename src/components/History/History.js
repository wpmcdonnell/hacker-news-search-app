import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'

class History extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pastSearches: Object.values(sessionStorage).sort().reverse()
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
    this.props.clearSearchStorageCounter()
  }

  render () {
    return (
      <Fragment>
        <div>
          <h2 className='d-flex justify-content-center mt-3 mb-3'> User Past Searches</h2>
          <div>{this.state.pastSearches.map((item, index) => <p className='d-flex justify-content-center' key={index}>{item}</p>)} </div>
          {this.state.pastSearches.toString() !== [].toString() ? <button className='btn-primary mt-2 mb-5 ml-5 d-flex justify-content-center' onClick={this.clearSearches}> Clear Searches</button> : <p className='d-flex justify-content-center'> You have no search history! </p> }
        </div>
      </Fragment>
    )
  }
}

export default withRouter(History)
