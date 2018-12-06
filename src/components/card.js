import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

// import Img from 'gatsby-image'

class Card extends React.Component {
  render () {
    let {
      large,
      title,
      imageUrl,
      className,
      categories
    } = this.props

    return (
      <div className={`box card is-paddingless is-clipped ${className}`}>
        <div className="card-image">
          <figure className="image is-16by9">
            <img src={imageUrl} alt={title} />
          </figure>
          {/* <Img fluid={image.childImageSharp.fluid} /> */}
        </div>
        <div className="card-content">
          <h1 className="h3">{title}</h1>
          <div className="pill-wrapper">
            <div className="pill-childwrapper">
              {categories.map((category) => {
                return (
                  <Link
                    className="customised tag"
                    to={`/overview?category=${category.slug}`}
                    key={category.slug}>
                    {category.title}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
        <div className="card-footer">
          <Link className="card-footer-item" to="/">Mehr erfahren</Link>
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  large: PropTypes.bool,
  title: PropTypes.string,
  categories: PropTypes.array,
  className: PropTypes.string,
  imageUrl: PropTypes.string
}

Card.defaultProps = {
  large: true
}

export default Card
