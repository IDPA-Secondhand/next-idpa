import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

// import Img from 'gatsby-image'
import Rating from 'react-star-ratings'

// import { ReactComponent as DollarsAndCents } from '../icons/dollar.svg'

class Card extends React.Component {
  render () {
    let {
      large,
      title,
      imageUrl,
      className,
      categories,
      to,
      priceRange
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
          <h1 className="h3 card-spacing is-extended">{title}</h1>

          <div className="card-spacing is-regular">

            {/* _Stars_ currently not in use… */}
            {/* <Rating
              rating={3}
              numberOfStars={5}
              svgIconPath="M5.56108 21.0922C5.74768 21.106 5.93439 21.0671 6.1 20.98L11.52 18.13L16.92 20.98C17.0859 21.0699 17.2738 21.111 17.4621 21.0987C17.6504 21.0863 17.8313 21.0209 17.984 20.91C18.1367 20.7992 18.2549 20.6474 18.325 20.4722C18.395 20.297 18.4141 20.1056 18.38 19.92L17.34 13.89L21.72 9.62001C21.8519 9.48982 21.945 9.32556 21.989 9.14553C22.0329 8.96551 22.026 8.77681 21.969 8.60049C21.9119 8.42417 21.807 8.26718 21.6659 8.14702C21.5248 8.02686 21.3531 7.94826 21.17 7.92001L15.11 7.04001L12.41 1.56001C12.3281 1.39093 12.2003 1.24835 12.0411 1.14858C11.8819 1.04881 11.6979 0.995895 11.51 0.995895C11.3221 0.995895 11.1381 1.04881 10.9789 1.14858C10.8197 1.24835 10.6919 1.39093 10.61 1.56001L7.91 7.04001L1.86 7.92001C1.67398 7.94532 1.49885 8.02249 1.35464 8.14269C1.21043 8.26288 1.10296 8.42124 1.04453 8.59965C0.986106 8.77806 0.97908 8.96931 1.02426 9.15152C1.06944 9.33374 1.165 9.49956 1.3 9.63001L5.68 13.89L4.65 19.92C4.61727 20.1042 4.63689 20.2939 4.70661 20.4676C4.77634 20.6412 4.89338 20.7918 5.04443 20.9022C5.19548 21.0126 5.37448 21.0785 5.56108 21.0922Z"
              svgIconViewBox="0 0 23 22"
              starDimension="24px"
              starSpacing="2px"
              starRatedColor="#F2C94C" /> <br /> */}
            <Rating
              rating={priceRange}
              numberOfStars={3}
              svgIconPath="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-11v2h1a3 3 0 0 1 0 6h-1v1a1 1 0 0 1-2 0v-1H8a1 1 0 0 1 0-2h3v-2h-1a3 3 0 0 1 0-6h1V6a1 1 0 0 1 2 0v1h3a1 1 0 0 1 0 2h-3zm-2 0h-1a1 1 0 1 0 0 2h1V9zm2 6h1a1 1 0 0 0 0-2h-1v2z"
              svgIconViewBox="0 0 24 24"
              starDimension="24px"
              starSpacing="2px"
              starRatedColor="rgba(0, 0, 0, 0.7)" />
          </div>

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
          <Link className="card-footer-item" to={`/${to}`}>Mehr erfahren</Link>
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
  imageUrl: PropTypes.string,
  to: PropTypes.string,
  priceRange: PropTypes.number,
}

Card.defaultProps = {
  large: true
}

export default Card
