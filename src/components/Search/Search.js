import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import moment from 'moment'
import parse from 'html-react-parser'

class Search extends Component {
  constructor () {
    super()

    this.state = {
      result: [],
      search: false,
      searchBarInput: '',
      button: 'story',
      dateButton: 'all',
      commentJSX: false,
      timeParams: 0,
      pageParams: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.setState({ searchStorageCounter: this.props.searchStorageCounterParentState })
  }

  handleChange = (event) => {
    event.persist()
    this.setState({ searchBarInput: event.target.value })
  }

  handleSubmit = () => {
    axios({
      url: `http://hn.algolia.com/api/v1/search?query=${this.state.searchBarInput}&tags=story&hitsPerPage=60&numericFilters=created_at_i>${this.state.timeParams}&page=${this.state.pageParams}`,
      method: 'GET'
    })
      .then(response => {
        // axios response object contains a `data` key
        // setting the state will force a re-render
        this.setState({ result: response.data, searched: true, commentJSX: false, pageParams: 0 })
      })
      .then(window.scrollTo(0, 0))
      .then(sessionStorage.setItem(`${this.props.searchStorageCounterParentState}`, `You searched for ${this.state.searchBarInput} in article ${this.state.button} from ${this.state.dateButton} time `))
      .then(this.props.searchStorageCounterFunction())
      .catch(console.error)
  }

  handleSubmitComment= () => {
    axios({
      url: `http://hn.algolia.com/api/v1/search?query=${this.state.searchBarInput}&tags=comment&hitsPerPage=35&numericFilters=created_at_i>${this.state.timeParams}&page=${this.state.pageParams}`,
      method: 'GET'
    })
      .then(response => {
        // axios response object contains a `data` key
        // setting the state will force a re-render
        this.setState({ result: response.data, searched: true, commentJSX: true, pageParams: 0 })
      })
      .then(window.scrollTo(0, 0))
      .then(sessionStorage.setItem(`${this.props.searchStorageCounterParentState}`, `You searched for ${this.state.searchBarInput} in article ${this.state.button} from ${this.state.dateButton} time `))
      .catch(console.error)
  }

  handleSubmitAuthor = () => {
    axios({
      url: `http://hn.algolia.com/api/v1/search?tags=story,author_${this.state.searchBarInput}&hitsPerPage=50&numericFilters=created_at_i>${this.state.timeParams}&page=${this.state.pageParams}`,
      method: 'GET'
    })
      .then(response => {
        // axios response object contains a `data` key
        // { data: { post: { title... }}}
        // setting the state will force a re-render
        this.setState({ result: response.data, searched: true, commentJSX: false, pageParams: 0 })
      })
      .then(sessionStorage.setItem(`${this.props.searchStorageCounterParentState}`, `You searched for ${this.state.searchBarInput} in article ${this.state.button} from ${this.state.dateButton} time `))
      .then(window.scrollTo(0, 0))

      .catch(console.error)
  }

  render () {
    let resultJSX = []

    if (this.state.searched && !this.state.commentJSX && this.state.result.toString() !== [].toString()) {
      resultJSX = (
        <div>
          {this.state.result.hits.map(result => <div key={result.created_at}>

            <Card className='mt-2 mb-3 shadow bg-white rounded'>
              <Card.Body className=''>
                <Card.Title>
                  {result.url === '' ? <p>{result.title} (source unavailble)</p> : '' }
                  <a href={result.url}>{result.url !== '' ? result.title : '' }</a>
                  <br/>
                  <a className='url' href={result.url}>{result.url}</a>
                </Card.Title>
                <p className='d-inline'>By {result.author}</p>
                <p className='text-right font-italic' >{moment(result.created_at).format('MMMM Do, YYYY')} </p>
              </Card.Body>
            </Card>
          </div>)}
        </div>
      )
    } else if (this.state.searched && this.state.commentJSX && this.state.result.toString() !== [].toString()) {
      resultJSX = (
        <div>
          {this.state.result.hits.map(result => <div key={result.created_at}>
            <div className='row ml-1 mr-1 comment-header-text'>

              <p className=''>{result.points} points | </p>
              <p className='ml-1'>{result.author} | </p>
              <p className='ml-1'>{moment(result.created_at, 'YYYYMMDD').fromNow()} | via: </p>
              <a className='ml-1 mb-2 comment-header-text comment-story-link' href={result.story_url}>{result.story_title} </a>

            </div>

            {this.state.commentJSX ? <div>{parse(result._highlightResult.comment_text.value)}</div> : '' }
          </div>
          )} </div>
      )
    } else if (this.state.searched && this.state.result.toString() === [].toString()) {
      resultJSX = (
        <p> No results! Try again! </p>
      )
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
                  <Dropdown.Item onClick={() => this.setState({ dateButton: 'all', timeParams: 0 })} href="#/search">All</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({ dateButton: 'day', timeParams: Math.floor(Date.now() / 1000) - 86400 })} href="#/search">Last 24 hours</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({ dateButton: 'year', timeParams: Math.floor(Date.now() / 1000) - 31556926 })} href="#/search">Last year</Dropdown.Item>
                </Dropdown.Menu>

              </Dropdown>

            </div>

            <div className="mt-4 mb-4">
              <div className="">
                <div className="tab-content" id="nav-tabContent">
                  <div className={this.state.button === 'story' ? 'tab-pane fade show active' : 'tab-pane fade' } role="tabpanel">Search articles with headlines containing your search word!</div>
                  <div className={this.state.button === 'comment' ? 'tab-pane fade show active' : 'tab-pane fade' } role="tabpanel">Search articles with comments containing your search word!</div>
                  <div className={this.state.button === 'author' ? 'tab-pane fade show active' : 'tab-pane fade' } role="tabpanel">Search articles by author!</div>
                </div>
              </div>
            </div>
            <div className='mb-4'>{resultJSX}</div>

            <div className='ml-1 mr-1 mb-5'>
              {this.state.searched && this.state.result.nbPages !== 1 ? <p className='pagination-title d-flex justify-content-center'>pages</p> : '' }
              <nav aria-label="Page navigation example" >
                <ul className="pagination">

                  {this.state.searched && this.state.result.nbPages > 1 ? Array.from(Array(this.state.result.nbPages).keys()).map(result => <li className="page-item flex-wrap ml-1 mr-1 mb-1" key={result}><a onClick={async () => {
                    await this.setState({ pageParams: result }); if (this.state.button === 'story') { this.handleSubmit() } else if (this.state.button === 'comment') { this.handleSubmitComment() } else if (this.state.button === 'author') { this.handleSubmitAuthor() }
                  } }
                  className="page-link" href="#/search">{result + 1}</a></li>) : '' }

                </ul>
              </nav>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Search)
