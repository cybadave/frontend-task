import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import App from './App';
import { cache } from './cache';

const client = new ApolloClient({
  uri: 'https://pjg9t4mlk1.execute-api.eu-west-1.amazonaws.com/staging/graphql',
  cache,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
