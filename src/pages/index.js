import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

// const IndexPage = ({ data }) => (
//   <Layout>
//     <h1>Hi people</h1>
//   </Layout>
// )

class IndexPage extends React.Component {
  render () {
    let { shopsQuery } = this.props.data
    
    const shops = shopsQuery.edges.map(e => e.node)

    return (
      <Layout>
        <>        
        {shops.map((shop) => {
          let shopBody = shop.data
          const categories = shopBody.productRange.map(e => e.data)

          return(
            <div key={shopBody.slug}>
              <h1>{shopBody.name}</h1>
              <p>{shopBody.slug}</p>
              {categories.map((category) => {
                return <span key={category.uid}>{category.title}</span>
              })}

            </div>
          )
        })}
        </>
      </Layout>
    )
  }
}

export const query = graphql`
query {  
  shopsQuery: allAirtable(filter: {table: {eq: "shopsFinal"}}) {
    edges {
      node {
        data {
          slug
          name
          owner
          productRange {
            id
            data {
              title
              uid
            }
          }
        }
      }
    }
  }
}
`

export default IndexPage
