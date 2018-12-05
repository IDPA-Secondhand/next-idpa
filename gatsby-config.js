module.exports = {
  siteMetadata: {
    title: 'IDPA Site',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: `keyTiycvkXZLfi2WO`, // may instead specify via env, see below
        tables: [
          {
            baseId: `appQYj69gppLZwlvn`,
            tableName: `shopsFinal`,
            tableView: `Public`,
            // queryName: `OPTIONAL_NAME_TO_IDENTIFY_TABLE`, // optional
            // mapping: { `CASE_SENSITIVE_COLUMN_NAME`: `VALUE_FORMAT` }, // optional, e.g. "text/markdown", "fileNode"
            tableLinks: [`cities`, `priceRange`, `productRange`] // optional, for deep linking to records across tables.
          },
          {
            baseId: `appQYj69gppLZwlvn`,
            tableName: `cities`,
            tableView: `Grid view`,
          },
          {
            baseId: `appQYj69gppLZwlvn`,
            tableName: `priceRange`,
            tableView: `Grid view`
          },
          {
            baseId: `appQYj69gppLZwlvn`,
            tableName: `productRange`,
            tableView: `Grid view`
          }
        ]
      }
    },
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Poppins:500,600,700', 'IBM Plex Sans']
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
  ],
}
