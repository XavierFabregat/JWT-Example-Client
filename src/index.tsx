import React from 'react';
import ReactDOM from 'react-dom/client';

import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client'
import { App } from './App';
import { link, requestLink, tokenRefreshLink } from './graphql/Links';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './Themes';

const apolloOptions : ApolloClientOptions<any> = {
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    tokenRefreshLink,
    requestLink,
    link,
  ]),
}

const client = new ApolloClient(apolloOptions);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);


