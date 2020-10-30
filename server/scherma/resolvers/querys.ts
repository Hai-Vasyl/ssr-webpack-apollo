import Post from "../models/Post"
import { DocumentQuery, Document } from "mongoose"
import { IPost } from "../interfaces"

const Query = {
  posts: async (): Promise<DocumentQuery<Document[], Document, {}> | undefined> => {
    try {
      const posts = await Post.find()
      return posts
    } catch (error) {
      console.log(`Get all posts error: ${error.message}`)
    }
  },
  post: (_: any, { id }: { id: string }): IPost | undefined => {
    try {
      return Post.findById(id)
    } catch (error) {
      console.log(`Get post error: ${error.message}`)
    }
  }
}

export default Query