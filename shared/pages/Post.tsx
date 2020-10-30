import React from 'react'
import { useParams } from "react-router-dom"
import { GET_POST } from "../fetching/queries"
import { useQuery } from "@apollo/client"

const Post: React.FC = () => {
  const { postId }: { postId: string } = useParams()

  const { data, error, loading } = useQuery(GET_POST, { variables: { id: postId } })

  if (loading) {
    return <div>LOADING ...</div>
  }
  if (error) {
    return <div>ERROR ((</div>
  }

  return (
    <div>
      <div>
        <div>sdfsdf</div>
        <div>{data && data.post.title}</div>
        <div>{data && data.post.content}</div>
        <div>{data && data.post.likes}</div>
        <div>{data && data.post.state}</div>
        <div>{data && data.post.author}</div>
      </div>
    </div>
  )
}

export default Post
