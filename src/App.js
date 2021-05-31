import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Search from './components/Search/Search'
import History from './components/History/History'
import About from './components/About/About'

class App extends Component {
  constructor (props) {
    super(props)
    this.searchStorageCounterFunction = this.searchStorageCounterFunction.bind(this)
    this.clearSearchStorageCounter = this.clearSearchStorageCounter.bind(this)
    this.state = {
      searchStorageCounter: 1
    }
  }

  // if triggered from axios request from submit in child /Search components
  // Will add 1 to counter
  searchStorageCounterFunction () {
    this.setState({ searchStorageCounter: this.state.searchStorageCounter + 1 })
  }

  // If triggered from child /History component, will set counter back to 0
  clearSearchStorageCounter () {
    this.setState({ searchStorageCounter: 0 })
  }

  // On mount, checks to see if page has been refreshed, if so, it clears this.state.pastSearches
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
          <Route exact path='/' render={() => (
            <About />
          )} />
          <Route path='/search' render={() => (
            <Search searchStorageCounterFunction={this.searchStorageCounterFunction} searchStorageCounterParentState={this.state.searchStorageCounter} />
          )} />
          <Route path='/history' render={() => (
            <History clearSearchStorageCounter={this.clearSearchStorageCounter} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
