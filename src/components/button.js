import React from 'react'
import { Link } from 'gatsby'

const Button = ({ children, to }) => {
  return (
    <Link to={to} className="button is-primary is-custom">{children}</Link>    
  )
}

export default Button