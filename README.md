# gatsby-plugin-apollo-shopify

## Install

`npm install --save gatsby-plugin-apollo-shopify`

## How to use

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-apollo-shopify`,
    options: {
      shopName: `gatsbyjs`,
      accessToken: `48bbac10dae7225fe4e36a545d1b9b2f`,
      // Optionally set the API version you want to use. For a list of available API versions,
      // see: https://shopify.dev/concepts/about-apis/versioning/release-notes
      // Defaults to unspecified/oldest stable
      apiVersion: "2020-07",
    },
  },
]
```

## How to Query within Gatsby

To utilize the Apollo client within your Gatsby project, import `graphql-tag` and `react-apollo`. for example:

```js

import gql from "graphql-tag"
import { Query } from "react-apollo"

const GET_PRODUCT = gql`
  query($handle: String!) {
    shop {
      products(first:1, query: $handle) {
        edges {
          node {
            variants(first: 1) {
              edges {
                node {
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  }
`

export default ({ children, data }) => {
    const product = data.shopifyProduct

    return (
        <Query query={GET_PRODUCT} variables={{ handle: product.handle }}>
            {({ loading, error, data }) => {
                if (loading) return <div>Loading stock status...</div>
                if (error) return <div>There was an error!</div>

                return (
                <>
                    <h3>Stock Status: {data && data.shop.products && data.shop.products.edges[0].node.variants && data.shop.products.edges[0].node.variants.edges[0].node.availableForSale.toString()}</h3>
                </>
                )
            }}
        </Query>
    )
}

export const query = graphql`
    query productQuery($id: String!) {
        shopifyProduct(id: { eq: $id }) {
            handle
        }
    }
`

```

## Credits

Most of this plugin was taken from the [gatsby-plugin-apollo-client](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-multiple-providers/plugins/gatsby-plugin-apollo-client) within the using-multiple-providers example site.