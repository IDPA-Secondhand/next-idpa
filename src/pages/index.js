import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

import Card from '../components/card'
import Button from '../components/button'
import { ReactComponent as OnlineShopping } from '../images/online-shopping.svg'

class IndexPage extends React.Component {
  render () {
    let {
      shopsQuery
    } = this.props.data
    
    const shops = shopsQuery.edges.map(e => e.node)

    return (
      <Layout>
        <>
        <section className="hero is-large unset-height-mobile is-primary">
          <div className="sh-container hero-text column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop is-6-fullhd is-offset-3-fullhd">
            <h1 className="h1">Mach den<br/>Unterschied.</h1>
            <hr className="seperator" />
            <div className="columns">
              <div className="column is-5">
                <p className="extended">
                  Hilf uns im Kampf gegen die Wegwerfgesellschaft und kaufe bereits Gebrauchtes.
                </p>
              </div>
            </div>
          </div>

          <OnlineShopping className="hero-icon" />

        </section>

        <div className="sh-container">
          <div className="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop is-6-fullhd is-offset-3-fullhd">

            <section className="section is-paddingless has-margin-large">

              <h2 className="h2">Secondhand Läden in Aarau.</h2>
              <div className="columns is-multiline has-margin">
                {shops.map((shop) => {
                  let shopBody = shop.data
                  const categories = shopBody.productRange.map(e => e.data)
                  const imageUrl = shopBody.fileNode[0].thumbnails.large.url
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
              <div className="buttons has-addons is-right">
                <Button to="/overview/">alle Shops anzeigen</Button>
              </div>
            </section>
          </div>
        </div>
        </>
      </Layout>
    )
  }
}

export const query = graphql`
query {  
  shopsQuery: allAirtable(limit: 2, filter: {table: {eq: "shopsFinal"}}) {
    #filter if there are enough shops in aarau... : data: {cities: {elemMatch: {data: {zip: {eq: 5000}}}}}
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
