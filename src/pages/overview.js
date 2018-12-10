import React from 'react'
import queryString from 'querystring'

import Layout from '../components/layout'

class Overview extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      // category: null,
      city: null
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
    return (
      <Layout>
        <div className="column sh-container is-10 is-offset-1">
          <h1 className="h1" style={{marginTop: '2em'}}>Übersicht</h1>
          {this.state.category}<br/>
          {this.state.city}
        </div>
      </Layout>
    )
  }
}

export default Overview