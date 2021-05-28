import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import moment from 'moment'

class Search extends Component {
  constructor () {
    super()

    this.state = {
      result: [],
      search: false,
      searchBarInput: '',
      button: 'story',
      dateButton: 'all'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (event) => {
    event.persist()
    this.setState({ searchBarInput: event.target.value })
  }

  handleSubmit = () => {
    axios({
      url: `http://hn.algolia.com/api/v1/search?query=${this.state.searchBarInput}&tags=story&hitsPerPage=10000`,
      method: 'GET'
    })
      .then(response => {
        // axios response object contains a `data` key
        // setting the state will force a re-render
        this.setState({ result: response.data.hits, searched: true })
        console.log(response.data.hits)
        console.log(this.state.searchBarInput)
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
        // setting the state will force a re-render
        this.setState({ result: response.data.hits, searched: true })
        console.log(response.data.hits)
        console.log(this.state.button)
        console.log(this.state.searchBarInput)
      })
      .catch(console.error)
  }

  handleSubmitAuthor = () => {
    axios({
      url: `http://hn.algolia.com/api/v1/search?tags=story,author_${this.state.searchBarInput}`,
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
    console.log('seeing if this renders twice')
    let resultJSX = []

    if (this.state.searched) {
      resultJSX = (
        <div>
          {this.state.result.map(result => <div key={result.created_at}>
            <Card className='mt-2 mb-3 shadow bg-white rounded'>
              <Card.Body className=''>
                <Card.Title>
                  <a href={result.url}>{result.url ? result.title : ''}</a>
                  <br/>
                  <a className='url' href={result.url}>{result.url}</a>
                  {this.state.button === 'comment' ? <div dangerouslySetInnerHTML={{ _html: result._highlightResult.comment_text.value }}></div> : '' }
                </Card.Title>
                <p className='d-inline'>By {result.author}</p>
                <p className='text-right font-italic' >{moment(result.created_at).format('MMMM Do, YYYY')} </p>
              </Card.Body>
            </Card>
            {this.state.button === 'comment' ? <div>{result._highlightResult.comment_text.value}</div> : '' }
          </div>)}
        </div>
      )
    } else {
      resultJSX = ''
    }

    return (
      <Fragment>
        <div>
          <div className='mx-auto'>
            <h1 className='main-title mb-3'>HACKER NEWS SEARCH</h1>
            <form className='form-inline mb-4'>
              <input
                className='form-control col-8'
                type="text"
                placeholder="Enter your search"
                value={this.state.searchBarInput}
                onChange={this.handleChange}
              />

              {/* Show corresponding button to correct axios request for either author, title, or comment given this.state.button */}
              {this.state.button === 'story' && <button className='ml-2 btn btn-outline-primary' onClick={this.handleSubmit}>Get search</button>}
              {this.state.button === 'comment' && <button className='ml-2 btn btn-outline-primary' onClick={this.handleSubmitComment}>Get search</button>}
              {this.state.button === 'author' && <button className='ml-2 btn btn-outline-primary' onClick={this.handleSubmitAuthor}>Get search</button>}
            </form>

            <div className='d-inline mt-2'>
              <p className='search-instruction-text d-inline mr-3'>Search by</p>

              <Dropdown className=' d-inline'>
                {this.state.button === 'comment' ? <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Comment
                </Dropdown.Toggle> : '' }

                {this.state.button === 'story' ? <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Title
                </Dropdown.Toggle> : '' }

                {this.state.button === 'author' ? <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Author
                </Dropdown.Toggle> : '' }

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => this.setState({ button: 'story' })} href="#/search">Title</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({ button: 'comment' })} href="#/search">Comment</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({ button: 'author' })} href="#/search">Author</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <p className='search-instruction-text d-inline ml-3 mr-3'>from</p>

              <Dropdown className=' d-inline'>
                {this.state.dateButton === 'all' ? <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Forever
                </Dropdown.Toggle> : '' }
                {this.state.dateButton === 'day' ? <Dropdown.Toggle variant="primary" id="dropdown-basic">
                24 hr
                </Dropdown.Toggle> : '' }
                {this.state.dateButton === 'year' ? <Dropdown.Toggle variant="primary" id="dropdown-basic">
                past year
                </Dropdown.Toggle> : '' }

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => this.setState({ dateButton: 'all' })} href="#/search">All</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({ dateButton: 'day' })} href="#/search">Last 24 hours</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({ dateButton: 'year' })} href="#/search">Last year</Dropdown.Item>
                </Dropdown.Menu>

              </Dropdown>

            </div>

            <div className="mt-3 mb-2">
              <div className="">
                <div className="tab-content" id="nav-tabContent">
                  <div className={this.state.button === 'story' ? 'tab-pane fade show active' : 'tab-pane fade' } role="tabpanel">Search articles with headlines containing your search word!</div>
                  <div className={this.state.button === 'comment' ? 'tab-pane fade show active' : 'tab-pane fade' } role="tabpanel">Search articles with comments containing search word!</div>
                  <div className={this.state.button === 'author' ? 'tab-pane fade show active' : 'tab-pane fade' } role="tabpanel">Search articles by author!</div>
                </div>
              </div>
            </div>
            <div>{resultJSX}</div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Search)
