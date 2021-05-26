import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class Search extends Component {
  constructor () {
    super()

    this.state = {
      picture: '',
      result: [],
      search: false
    }
  }

  handleSubmit = () => {
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
          {this.state.result.map(result => <div key={result.author}>{result.author}</div>)}
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
                name="title"
                placeholder="Post Title"
                value={this.state.picture.title}
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
