import React from 'react'
import { Link } from 'gatsby'

const Button = ({ children, to, className }) => {
  return (
    <Link to={to} className={`button is-primary is-custom ${className}`}>{children}</Link>    
  )
}

export default Button