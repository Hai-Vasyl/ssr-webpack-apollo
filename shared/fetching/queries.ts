import { gql } from "@apollo/client"

export const GET_POSTS = gql`
  query GET_POSTS{
    posts{
      title
      content
      likes
      state
      id
      author
    }
  }
`
export const GET_POST = gql`
  query GET_POST($id: ID!){
    post(id: $id){
      title
      content
      likes
      state
      id
      author
    }
  }
`