import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class Search extends Component {
  constructor () {
    super()

    this.state = {
      picture: '',
      result: [],
      search: false,
      searchBar: {
        searchText: ''
      }
    }
  }

  handleChange = (event) => {
    event.persist()
    this.setState(oldState => {
      const value = event.target.value
      const name = event.target.name

      const updatedField = { [name]: value }

      // spread operator ends up merging these two objects
      return { searchBar: { ...oldState.searchBar, ...updatedField } }
    })
  }

  handleSubmit = () => {
    axios({
      url: `http://hn.algolia.com/api/v1/search?query=${this.state.searchBar.searchText}&tags=story`,
      method: 'GET'
    })
      .then(response => {
        // axios response object contains a `data` key
        // { data: { post: { title... }}}
        // setting the state will force a re-render
        this.setState({ result: response.data.hits, searched: true })
        console.log(response.data.hits)
        console.log(this.state.searchBar.searchText)
      })
      .catch(console.error)
  }

  handleSubmitAuthor = () => {
    axios({
      url: 'http://hn.algolia.com/api/v1/search?query=foo&tags=story',
      method: 'GET'
    })
      .then(response => {
        // axios response object contains a `data` key
        // { data: { post: { title... }}}
        // setting the state will force a re-render
        this.setState({ result: response.data.hits, searched: true })
        console.log(response.data.hits)
      })
      .catch(console.error)
  }

  handleSubmitComments= () => {
    axios({
      url: 'http://hn.algolia.com/api/v1/search?query=foo&tags=story',
      method: 'GET'
    })
      .then(response => {
        // axios response object contains a `data` key
        // { data: { post: { title... }}}
        // setting the state will force a re-render
        this.setState({ result: response.data.hits, searched: true })
        console.log(response.data.hits)
      })
      .catch(console.error)
  }

  handleSubmitHomePage = () => {
    axios({
      url: 'http://hn.algolia.com/api/v1/search?query=foo&tags=story',
      method: 'GET'
    })
      .then(response => {
        // axios response object contains a `data` key
        // { data: { post: { title... }}}
        // setting the state will force a re-render
        this.setState({ result: response.data.hits, searched: true })
        console.log(response.data.hits)
      })
      .catch(console.error)
  }

  render () {
    let resultJSX = []

    if (this.state.searched) {
      resultJSX = (
        <div>
          {this.state.result.map(result => <div key={result.url}>{result.url}</div>)}
        </div>
      )
    }

    return (
      <Fragment>
        <div>
          <div className='mx-auto'>
            <h1 className='mb-3'>Please enter your search</h1>
            <form onSubmit={this.handleSubmit}>
              <input
                className='form-control mb-2'
                type="text"
                name="searchText"
                placeholder="Enter your search"
                value={this.state.searchText}
                onChange={this.handleChange}
              />
              <button onClick={this.handleSubmit}>Get search</button>
            </form>
            <div>{resultJSX}</div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Search)
