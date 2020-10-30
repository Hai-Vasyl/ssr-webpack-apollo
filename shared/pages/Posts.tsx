import React from 'react'
import { GET_POSTS } from "../fetching/queries"
import { useQuery } from "@apollo/client"
import { IPost } from "../interfaces"

const Posts: React.FC = () => {
  const { data, error, loading } = useQuery(GET_POSTS)

  if (loading) {
    return <div>LOADING ...</div>
  }
  if (error) {
    return <div>ERROR ((</div>
  }
  return (
    <div>
      <div>{
        data.posts.map((post: IPost) => {
          return (
            <div key={post.id}>
              <div>{post.title}</div>
              <div>{post.content}</div>
              <div>{post.likes}</div>
              <div>{post.state}</div>
              <div>{post.author}</div>
            </div>)
        })
      }</div>
    </div>
  )
}

export default Posts
