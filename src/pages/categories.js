import React from 'react'
import Layout from '../components/layout';
import Card from '../components/card'

import { Link } from 'gatsby'

class Categories extends React.Component {
    render() {

        let { filterCategories } = this.props.data

        //console.log(filterCategories);
        const shops = filterCategories.edges.map(e => e.node)
        

        return (
            <Layout>
                <div className="column has-margin is-12-mobile is-10-tablet is-offset-1-tablet is-8-widescreen is-offset-2-widescreen is-6-fullhd is-offset-3-fullhd">
                    <h1 className="h1 has-margin">Kategorien</h1>
                </div>


                <div className="catWrap column is-6-tablet is-5-widescreen is-4-fullhd">
                    <div className="sh-container">
                        

                        {
                            shops.map((shop) => {
                                return (

                                    <div class="linkWrap">
                                        <Link to={`overview?category=${shop.data.slug}`}>
                                            {shop.data.title}
                                            <div class="insideLink"></div>
                                        </Link><br />
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>



            </Layout>
        )
    }
}

export const overviewQuery = graphql`
query {  
  filterCategories: allAirtable(filter: {table: {eq: "productRange"}}) {
    edges {
      node {
        data {
            title
            slug
        }
      }
    }
  }
}
`

export default Categories 
