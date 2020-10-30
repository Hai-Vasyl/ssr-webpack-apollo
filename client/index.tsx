import React from "react"
import { hydrate } from "react-dom"
import App from "../shared/App"
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from "@apollo/client"
import { BrowserRouter as Router } from "react-router-dom"
import "./index.scss"
import fetch from "cross-fetch"

const client = new ApolloClient({
  cache: new InMemoryCache().restore((window as any).__INITIAL_DATA__),
  ssrMode: true,
  link: createHttpLink({ uri: 'http://localhost:5000/', fetch }),
});

hydrate(
  <ApolloProvider client={client} >
    <Router>
      <App />
    </Router>
  </ApolloProvider>
  , document.getElementById("root"))