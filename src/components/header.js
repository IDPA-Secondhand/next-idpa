import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showMenu: false };
  }

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  render () {
    let {
      siteTitle
    } = this.props

    return (
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/"><h1 className="is-size-4 is-family-primary has-text-weight-bold" style={{fontFamily: 'Poppins'}}>{siteTitle}</h1></Link>
          <div role="button" className="navbar-burger burger" aria-label="menu" aria-expanded={this.state.showMenu ? 'true' : 'false'} onClick={this.toggleMenu} >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>

        <div className={`navbar-menu${this.state.showMenu ? ' is-active' : '' }`}>
          <div className="navbar-end">
            <Link className="navbar-item" to="/there/">Shops</Link>
            <Link className="navbar-item" to="/there/">Kategorien</Link>
            <Link className="navbar-item" to="/there/">Über Uns</Link>
          </div>
        </div>
      </nav>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
