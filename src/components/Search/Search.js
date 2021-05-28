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
      searchBarInput: '',
      button: 'story'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (event) => {
    event.persist()
    this.setState({ searchBarInput: event.target.value })
  }

  handleSubmit = () => {
    axios({
      url: `http://hn.algolia.com/api/v1/search?query=${this.state.searchBarInput}&tags=story`,
      method: 'GET'
    })
      .then(response => {
        // axios response object contains a `data` key
        // { data: { post: { title... }}}
        // setting the state will force a re-render
        this.setState({ result: response.data.hits, searched: true })
        console.log(response.data.hits)
        console.log(this.state.searchBarInput)
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

  handleSubmitComment= () => {
    axios({
      url: `http://hn.algolia.com/api/v1/search?query=${this.state.searchBarInput}&tags=comment`,
      method: 'GET'
    })
      .then(response => {
        // axios response object contains a `data` key
        // { data: { post: { title... }}}
        // setting the state will force a re-render
        this.setState({ result: response.data.hits, searched: true })
        console.log(response.data.hits)
        console.log(this.state.button)
        console.log(this.state.searchBarInput)
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
          {this.state.result.map(result => <div key={result.created_at}>

            <a href={result.url}>{result.url ? result.title : ''}</a>
          </div>)}
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
                placeholder="Enter your search"
                value={this.state.searchBarInput}
                onChange={this.handleChange}
              />
              <div className="row">
                <div className="col-4">
                  <div className="list-group" id="list-tab" role="tablist">
                    <a className={this.state.button === 'story' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} onClick={() => this.setState({ button: 'story' })} id="list-home-list" data-toggle="list" href="#/search" role="tab" aria-controls="home">Seach story</a>
                    <a className={this.state.button === 'comment' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} onClick={() => this.setState({ button: 'comment' })} id="list-profile-list" data-toggle="list" href="#/search" role="tab" aria-controls="profile">Search Comments</a>
                    <a className="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Messages</a>
                    <a className="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">Settings</a>
                  </div>
                </div>
                <div className="col-8">
                  <div className="tab-content" id="nav-tabContent">
                    <div className={this.state.button === 'story' ? 'tab-pane fade show active' : 'tab-pane fade' } id="list-home" role="tabpanel" aria-labelledby="list-home-list">Go ahead and search the data base for article story content containing your search word!</div>
                    <div className={this.state.button === 'comment' ? 'tab-pane fade show active' : 'tab-pane fade' } id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">Search the all data base article comments containing your search word!</div>
                    <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
                    <div className="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
                  </div>
                </div>
              </div>
              {this.state.button === 'story' && <button onClick={this.handleSubmit}>Get search</button>}
              {this.state.button === 'comment' && <button onClick={this.handleSubmitComment}>Get search</button>}
              {this.state.button === 'author' && <button onClick={this.handleSubmitAuthor}>Get search</button>}
            </form>
            <div>{resultJSX}</div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Search)
