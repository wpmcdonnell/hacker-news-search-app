import React, { Component } from 'react'

class About extends Component {
  render () {
    const aboutStyle = {
      display: 'flex',
      alignItems: 'center',
      color: 'Black',
      textAlign: 'center',
      marginTop: '5rem',
      justifyContent: 'center'
    }

    return (
      <div style={aboutStyle} className="about mx-auto">
        <div>
          <h2 className=''>Welcome to </h2>
          <h2 className='mb-3'>HACKER NEWS SEARCH APP </h2>
          <p> <em>Hacker News Search App</em> is a place where users may search for articles by title, comments, or author, as well as time. </p>
          <p> Please click the links below or the items in the nav bar to search or see your history. </p>
          <h5 className='mt-4'> <a className='text-primary' href="?#search">Search</a> or <a className='text-primary' href="?#history">History</a></h5>
        </div>
      </div>
    )
  }
}

export default About
