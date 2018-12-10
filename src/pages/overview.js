import React from 'react'
import queryString from 'querystring'

import Layout from '../components/layout'
import { Link } from 'gatsby'

class Overview extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      city: null,
      allShops: null
    };
  }

  componentDidMount () {
    this.updateCategory()
  }

  updateCategory = () => {
    const search = this.props.location.search.substr(1);
    const queries = queryString.parse(search)

    console.log(queries.city)

    this.setState({
      category: queries.category ? queries.category : '',
      city: queries.city ? queries.city : null
    })
  }

  render () {

    let {
      overview
    } = this.props.data

    const shops = overview.edges.map(e => e.node)

    // 
    // LOOK INTO
    // https://github.com/JedWatson/react-select
    //
    // filter component
    //

    return (
      <Layout>
        <div className="column sh-container is-10 is-offset-1">
          <h1 className="h1" style={{marginTop: '2em'}}>Übersicht</h1>
          {this.state.category}<br/>
          {this.state.city}

          {shops.map((shop, i) => {
            const body = shop.data
            return (
              <div key={body.slug} className="card" style={{margin: '2em 0', padding: '3em'}}>
                <Link to={body.slug}><h2 className="h2">{body.name}</h2></Link>
                {body.productRange.map((category) => (<p style={{paddingLeft: '1em'}}>{category.data.slug}</p>))}
              </div>
            )
          })}
        </div>
      </Layout>
    )
  }
}

export const overviewQuery = graphql`
query {  
  overview: allAirtable(filter: {table: {eq: "shopsFinal"}}) {
    edges {
      node {
        data {
          slug
          name
          productRange {
            data {
              slug
            }
          }
        }
      }
    }
  }
}
`

export default Overview