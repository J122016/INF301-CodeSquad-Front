import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

// Creación del cliente Apollo
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

// Renderizado de la aplicación
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  );

reportWebVitals();
