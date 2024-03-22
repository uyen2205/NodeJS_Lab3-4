import express from "express";
import { port } from "../models/post.js";
const route = express.Router();

//Get
route.get("/post", async (req, res) => {
  const response = await new post.find();
  res.send(response);
});
//Get ID
router.get("/post/:id", async, (req, res) => {
  res.send(response);
});
//Put
route.put("/post/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const response = await post.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  res.send(response);
});
//Post
router.post("/post", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    author: req.body.author,
    category: req.body.category,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
});
//delete
route.delete("/post/:id", async (req, res) => {
  const id = req.params.id;
  const response = await post.findOneAndDelete({ _id: id });
  res.send(response);
});
export default route;
