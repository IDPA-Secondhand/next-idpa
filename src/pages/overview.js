import React from 'react'
// import queryString from 'querystring'
import Select from 'react-select'

import Layout from '../components/layout'
import Card from '../components/card'
// import { Link } from 'gatsby'

class Overview extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      categoriesOptions: props.data.filterCategories.edges.map((e) => e.node.data),
      selectedCategoriesOptions: [],
      citiesOptions: props.data.filterCities.edges.map((e) => e.node.data),
      selectedCityOption: null,
      allShops: props.data.overview.edges.map((e) => e.node.data),
      filteredShops: [],
    }
  }

  handleCategoriesChange = selectedOption => {
    this.setState(
      {
        selectedCategoriesOptions: selectedOption
      },
      this.myFilter
      )
  }

  handleCityChange = selectedOption => {
    this.setState(
      {
        selectedCityOption: selectedOption
      },
      this.myFilter
    )
  }

  myFilter () {

    if (this.state.selectedCityOption === null && this.state.selectedCategoriesOptions.length === 0) {
      this.setState({
        filteredShops: this.state.allShops
      })
    } else {

      let {
        allShops,
        selectedCategoriesOptions,
        selectedCityOption
      } = this.state

      let fCategories = selectedCategoriesOptions.map((fCategory) => {
        return fCategory.value
      })

      console.log('cat', fCategories, 'city', selectedCityOption)

      const fShops = allShops.filter(shop => {
        return (fCategories.length === 0 ? true : shop.productRange.find(category => fCategories.includes(category.data.slug))) && (selectedCityOption === null ? true : selectedCityOption.value === shop.cities[0].data.zip)
        // return shop.cities.data.zip === selectedCityOption.value
      })

      console.log(this.state)

      this.setState({
        filteredShops: fShops
      })
    }
  }

  componentDidMount () {
    this.setState({
      filteredShops: this.state.allShops
    })
  }

  render () {

    const {
      categoriesOptions,
      selectedCategoriesOptions,
      citiesOptions,
      selectedCityOption,
    } = this.state

    return (
      <Layout>
          <div className="column is-3 is-offset-2">
            <div className="sh-container">
            
              <div className="has-margin">
                <h2 className="h2 has-margin">Kategorien</h2>
                <Select
                  isMulti
                  isClearable
                  options={categoriesOptions}
                  selectedOption={selectedCategoriesOptions}
                  onChange={this.handleCategoriesChange} />
              </div>
              <div className="has-margin">
                <h2 className="h2 has-margin">Ort</h2>
                <Select
                  isClearable
                  options={citiesOptions}
                  selectedOption={selectedCityOption}
                  onChange={this.handleCityChange} />
              </div>
            </div>
          </div>
            {/* {this.state.filteredShops.map((shop) => {
              return (
                <div key={shop.slug} className="card has-margin">
                  <div className="card-content">
                    {shop.cities[0].data.zip}
                    <p>{shop.productRange.map((category, i) => <span key={i}>{category.data.slug}<br/></span>)}</p>
                  </div>
                </div>
              )
            })} */}
            <div className="column is-5">
              <div className="sh-container">
                {this.state.filteredShops.map((shop) => {
                  const categories = shop.productRange.map(e => e.data)
                  const imageUrl = shop.fileNode[0].thumbnails.large.url
                  return(
                    <div className="has-margin" key={shop.slug}>
                      <Card
                        title={shop.name}
                        imageUrl={imageUrl}
                        to={shop.slug}
                        priceRange={Number(shop.priceRange[0].data.value)}
                        categories={categories} />
                    </div>
                  )
                })}
              </div>
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
          owner
          priceRange {
            data {
              value
            }
          }
          cities {
            data {
              zip
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
  filterCategories: allAirtable(filter: {table: {eq: "productRange"}}) {
    edges {
      node {
        data {
          label: title
          value: slug
        }
      }
    }
  }
  filterCities: allAirtable(
    filter: {
      table: {eq: "cities"},
      data: {
        shopsFinal: {ne: null}
      }}
  ) {
    edges {
      node {
        data {
          label: name,
          value: zip
          shopsFinal
        }
      }
    }
  }
}
`

export default Overview