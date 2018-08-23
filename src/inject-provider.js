import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default ({ element }, pluginOptions) => {
    const shopName = pluginOptions.shopName || {}
    const accessToken = pluginOptions.accessToken || {}

    const httpLink = createHttpLink({ uri: `https://${shopName}.myshopify.com/api/graphql` });

    const middlewareLink = setContext(() => ({
        headers: {
            'X-Shopify-Storefront-Access-Token': accessToken,
        },
    }))

    const client = new ApolloClient({
        link: middlewareLink.concat(httpLink),
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>{element}</ApolloProvider>
    )
}