import { gql } from "apollo-server"

const schema = gql`
  type Post {
    content: String!
    title: String!
    author: String!
    likes: Int!
    state: Boolean!
    id: ID!
  }
  type Query {
    posts: [Post]!,
    post(id: ID!): Post
  }
  type Mutation {
    addPost(content: String!, title: String!, author: String!): Post
  }
`

export default schema