import { ApolloServer } from "apollo-server"
import mongoose from "mongoose"
import { config } from "dotenv"
import schema from "./scherma"
config()

const { NODE_ENV, PORT_API, MONGO_DB, MONGO_USER, MONGO_PASS } = process.env
const isDev = NODE_ENV === "development"
const { resolvers, typeDefs } = schema

  ; (async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.osxef.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }, () => console.log("MongoDB started successfully!"))

      const server = new ApolloServer({
        resolvers, typeDefs,
        playground: isDev
      })

      server.listen({ port: PORT_API }).then(({ url }) => {
        console.log(`Server started on url: ${url}`)
      })
    } catch (error) {
      console.log(`Server error: ${error.message}`)
    }
  })()


