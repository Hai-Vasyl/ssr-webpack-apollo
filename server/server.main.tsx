import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client"
import fetch from "cross-fetch"
import React from "react"
import { renderToString } from "react-dom/server"
import express from "express"
import { StaticRouter } from "react-router"
import { getDataFromTree } from "@apollo/client/react/ssr"
import serialize from "serialize-javascript"
// @ts-ignore
import stats from "../dist/client/stats.json"
import App from '../shared/App'
import { config } from "dotenv"
config()

const { NODE_ENV, PORT_MAIN } = process.env
const app = express()
app.use(express.static("dist/client"))


app.use((req, res) => {

  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'http://localhost:5000/',
      credentials: 'same-origin',
      fetch,
      headers: {
        cookie: req.header('Cookie'),
      },
    }),
    cache: new InMemoryCache(),
  });

  const context = {};

  const AppRendered = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  );

  getDataFromTree(AppRendered).then(() => {
    const content = renderToString(AppRendered);
    const initialState = client.extract();

    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>SSR Apollo React</title>
        <link rel="stylesheet" href="/${stats.assetsByChunkName.main[0]}" />
        <script src="/${stats.assetsByChunkName.main[1]}" defer></script>
      </head>
      <body>
        <div id="root">${content}</div>
        <script>window.__INITIAL_DATA__ = ${serialize(initialState).replace(/</g, '\\u003c')}</script>
      </body>
      </html>
    `);
    res.end()
  })
})

app.listen(PORT_MAIN, () => console.log(`Server started on port: ${PORT_MAIN}`))

