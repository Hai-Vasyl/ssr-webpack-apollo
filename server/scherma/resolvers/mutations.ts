import Post from "../models/Post"
import { IPost } from "../interfaces"

const Mutation = {
  addPost: async (_: any, args: IPost) => {
    try {
      const newPost = await Post.create({ ...args })
      return newPost
    } catch (error) {
      console.log(`Add new post error: ${error.message}`)
    }
  }
}

export default Mutation