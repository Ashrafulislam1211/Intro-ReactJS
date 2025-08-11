import React from 'react'
import { Link, Links } from 'react-router-dom'

const Navigation = () => {
  return (
         <ul style={{listStyle: "none"}}>

          <Link to={"/"}>
          <li>Home</li>
          </Link>

           <Link to={"/top-leaderships"}>
          <li>Leadership</li>
          </Link>
          
          <Link to={"/people"}>
          <li>People</li>
          </Link>
      
          
        </ul>
    
  )
}

export default Navigation
