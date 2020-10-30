import { Schema, model } from "mongoose"

const schema = new Schema({
  content: { type: String, required: true, default: "" },
  title: { type: String, required: true, default: "" },
  author: { type: String, required: true, default: "Unknown author" },
  likes: { type: Number, required: true, default: 0 },
  state: { type: Boolean, required: true, default: true }
})

export default model("Post", schema)