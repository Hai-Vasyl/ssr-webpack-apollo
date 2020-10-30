import typeDefs from "./typeDefs"
import Mutation from "./resolvers/mutations"
import Query from "./resolvers/querys"

const schema = {
  typeDefs,
  resolvers: { Mutation, Query }
}

export default schema