import { gql } from "@apollo/client"

export const ADD_POST = gql`
  mutation ADD_POST($content: String!, $title: String!, $author: String!){
    addPost(content: $content, title: $title, author: $author){
      title
      content
      likes
      state
      id
      author
    }
  }
`