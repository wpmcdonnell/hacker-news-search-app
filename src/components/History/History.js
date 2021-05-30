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
    for (let i = 0; i < localStorage.length; i++) {
      console.log(localStorage.getItem(localStorage.key(i)))
    }
  }

  render () {
    console.log(localStorage)
    return (
      <Fragment>
        <div>
          <p>{this.state.pastSearches}</p>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(History)
