import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//  impoort out axios request to get all mocies
class About extends Component {
  render () {
    // const backgroundImageUrl = <img src="nlbg.jpg" alt='Somewhere in Japan'>

    const backgroundStyle = {
      display: 'flex',
      alignItems: 'center',
      color: 'Black',
      textAlign: 'center',
      marginTop: '5rem',
      justifyContent: 'center'
    }

    // const textStyle = {
    //
    //
    // }
    return (
      <div style={backgroundStyle} className="about mx-auto">
        <div>
          <h2 className=''>Welcome to </h2>
          <h2 className='mb-3'>HACKER NEWS SEARCH APP </h2>
          <p> Hacker News Search app is a place where users may search for articles by title, comments, or author, as well as time. </p>
          <p> Please click the links below or the items in the nav bar to search or see your history. </p>
          <h5 className='mt-4'> <Link className='text-primary' to={'/search'}>Search</Link> or <Link className='text-primary' to={'/history'}>History</Link></h5>
          <h5 className='mr-2 ml-2'>to access message board</h5>
        </div>
      </div>
    )
  }
}

export default About
