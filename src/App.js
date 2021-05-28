import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Search from './components/Search/Search'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  render () {
    return (
      <Fragment>
        <Header/>
        <main className="container">
          <Route path='/search' render={() => (
            <Search msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
