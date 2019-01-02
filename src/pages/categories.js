import React from 'react'
import Layout from '../components/layout';

class Categories extends React.Component {
  render () {
    return (
      <Layout>
        <div className="column has-margin is-12-mobile is-10-tablet is-offset-1-tablet is-8-widescreen is-offset-2-widescreen is-6-fullhd is-offset-3-fullhd">
          <h1 className="h1 has-margin">Kategorien</h1>
        </div>
      
      
      <div className="columns has-margin">
                {shops.map((shop) => {
                  let shopBody = shop.data
                  const categories = shopBody.productRange.map(e => e.data)

                  return(
				  
				  
				  
                    <div className="column is-half" key={shopBody.slug}>
                      <Card
                        categories={categories} />
                    </div>
                  )
                })
				}
              </div>
      </Layout>
    )
  }
}

export default Categories
