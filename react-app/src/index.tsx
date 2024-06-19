import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

// Declaración de las consultas GraphQL como constantes
const LOGIN_QUERY = gql`
  query Login($datoslog1: login) {
    login(input: $datoslog1) {
      rut
      nrol
      mensaje
    }
  }
`;



// Creación del cliente Apollo
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

// Renderizado de la aplicación
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();
