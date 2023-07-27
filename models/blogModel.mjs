import mongoose from "mongoose";
import User from "./userModel.mjs";
import express from "express";
const app = express();
app.use(express.json());

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "please provide blog title"],
    unique: [true, "blog title already exist"],
    minLength: 5,
  },
  description: {
    type: String,
    required: [true, "please provide blog description"],
    minLength: 100,
  },
  categories: {
    type: String,
    enum: ["travel", "food", "gaming", "movies", "tech"],
  },

  author: {
    type: String,
    default: "kanik",
    // required: true,
  },
  // author: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  image: {
    type: String,
  },
  comments: [
    {
      author: { type: String },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  likes: [
    {
      content: { type: String, required: false },
    },
  ],
  // likes: {
  //   content: { type: String, required: false },
  // },
});

const myblog = mongoose.model("Blog", blogSchema);
export default myblog;
