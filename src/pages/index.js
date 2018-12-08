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
        <div className="sh-container">
          <div className="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop is-6-fullhd is-offset-3-fullhd">

            <div className="columns" style={{marginTop: '3em'}}>
              {shops.map((shop) => {
                let shopBody = shop.data
                const categories = shopBody.productRange.map(e => e.data)
                const imageUrl = shopBody.fileNode[0].thumbnails.large.url
                // console.log(imageUrl)
                return(
                  <div className="column is-half" key={shopBody.slug}>
                    <Card
                      title={shopBody.name}
                      imageUrl={imageUrl}
                      to={shopBody.slug}
                      priceRange={Number(shopBody.priceRange[0].data.value)}
                      categories={categories} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
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
          priceRange {
            data {
              value
            }
          }
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
