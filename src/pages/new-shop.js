import React from 'react'

import Layout from '../components/layout'

class IndexPage extends React.Component {
  render () {

    return (
      <Layout>
        <iframe 
            class="airtable-embed"
            src="https://airtable.com/embed/shrUtL22tnPBcZ5YF?backgroundColor=red"
            frameBorder="0"
            onmousewheel=""
            width="100%"
            height="533"
            style={{background: 'transparent', border: '1px solid #ccc', height: '100vh'}}
            title="New Shop"></iframe>
      </Layout>
    )
  }
}
export default IndexPage
