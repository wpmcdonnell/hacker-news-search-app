import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'

class History extends Component {
  constructor () {
    super()

    this.state = {

    }
  }

  render () {
    return (
      <Fragment>
        <div>
          <p>History Page </p>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(History)
