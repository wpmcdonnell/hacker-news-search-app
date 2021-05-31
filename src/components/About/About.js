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
      marginTop: '8rem',
      justifyContent: 'center'
    }

    // const textStyle = {
    //
    //
    // }
    return (
      <div style={backgroundStyle} className="about mx-auto">
        <div>
          <h2 className=''>Welcome to HACKER NEWS SEARCH APP </h2>
          <h5 className=''> <Link className='text-dark' to={'/sign-in/'}>Sign in</Link> or <Link className='text-dark' to={'/sign-up/'}>Sign up</Link></h5>
          <h5 className='mr-2 ml-2'>to access message board</h5>
        </div>
      </div>
    )
  }
}

export default About
