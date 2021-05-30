import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'

class History extends Component {
  constructor (props) {
    super(props)

    this.state = {
      button: 5
    }
  }

  componentDidMount () {
  }

  render () {
    return (
      <Fragment>
        <div>
          <p>History </p>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(History)
