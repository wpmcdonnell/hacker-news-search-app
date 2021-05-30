import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Search from './components/Search/Search'
import History from './components/History/History'

class App extends Component {
  constructor (props) {
    super(props)
    this.searchStorageCounterFunction = this.searchStorageCounterFunction.bind(this)
    this.state = {
      searchStorageCounter: 1
    }
  }

  searchStorageCounterFunction () {
    this.setState({ searchStorageCounter: this.state.searchStorageCounter + 1 })
  }

  componentDidMount () {
    if (window.performance.navigation.type === 1) {
      sessionStorage.clear()
    }
  }

  render () {
    return (
      <Fragment>
        <Header/>
        <main className="container">
          <Route path='/search' render={() => (
            <Search searchStorageCounterFunction={this.searchStorageCounterFunction} searchStorageCounterParentState={this.state.searchStorageCounter} />
          )} />
          <Route path='/history' render={() => (
            <History />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
