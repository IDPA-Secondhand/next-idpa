import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

import Card from '../components/card'

class IndexPage extends React.Component {
  render () {
    let {
      shopsQuery
    } = this.props.data
    
    const shops = shopsQuery.edges.map(e => e.node)

    return (
      <Layout>
        <>        

        <div className="columns" style={{marginTop: '3em'}}>
          <div className="column is-half">

            {shops.map((shop) => {
              let shopBody = shop.data
              const categories = shopBody.productRange.map(e => e.data)
              const imageUrl = shopBody.fileNode[0].thumbnails.large.url
              // console.log(imageUrl)
              return(
                <Card
                  key={shopBody.slug}
                  title={shopBody.name}
                  imageUrl={imageUrl}
                  categories={categories} />
              )
            })}
          </div>
        </div>

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
          fileNode {
            thumbnails {
              large {
                url
              }
            }
          }
          productRange {
            id
            data {
              title
              uid
              slug
            }
          }
        }
      }
    }
  }
}
`

export default IndexPage
