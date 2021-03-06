import React from 'react'
import queryString from 'querystring'
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

      const fShops = allShops.filter(shop => {
        return (fCategories.length === 0 ? true : shop.productRange.find(category => fCategories.includes(category.data.slug))) && (selectedCityOption === null ? true : selectedCityOption.value === shop.cities[0].data.zip)
      })

      this.setState({
        filteredShops: fShops
      })
    }
  }

  componentDidMount () {
    let search = queryString.parse(this.props.location.search.substr(1))
    if(search.city) {
      const resultCity = this.state.citiesOptions.find(city => city.value === Number(search.city))
      this.handleCityChange(resultCity)
    }

    if(search.category) {
      let arr = []
      const resultCategory = this.state.categoriesOptions.find( category => category.value === search.category)
      arr.push(resultCategory)
      this.handleCategoriesChange(arr)
    }
    
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
          <div className="column has-margin is-12-mobile is-10-tablet is-offset-1-tablet is-8-widescreen is-offset-2-widescreen is-6-fullhd is-offset-3-fullhd">
            <div className="sh-container">
              <h1 className="h1 has-margin">Übersicht aller Shops</h1>
            </div>
          </div>
          <div className="column is-12-mobile is-4-tablet is-offset-1-tablet is-3-widescreen is-offset-2-widescreen is-2-fullhd is-offset-3-fullhd">
            <div className="sh-container">

              <div className="has-margin">
                <h2 className="h3 has-margin">Ich suche nach:</h2>
                <Select
                  isMulti
                  isClearable
                  options={categoriesOptions}
                  selectedOption={selectedCategoriesOptions}
                  onChange={this.handleCategoriesChange} />
              </div>
              <div className="has-margin">
                <h2 className="h3 has-margin">In der Ortschaft:</h2>
                <Select
                  isClearable
                  options={citiesOptions}
                  selectedOption={selectedCityOption}
                  onChange={this.handleCityChange} />
              </div>
            </div>
          </div>
            <div className="column is-6-tablet is-5-widescreen is-4-fullhd">
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
                {this.state.filteredShops.length === 0 ? 
                  <div className="has-margin">
                    <p>Leider konnten anhand Ihrer Kriterien keine Shops gefunden werden </p>
                  </div>
                  :
                  null
                }
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