import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    author: String,
    category: String,
  },
  {
    timestamps: true,
  }
);

export const post = mongoose.model("post", postSchema);
