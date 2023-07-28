import Blog from "../models/blogModel.mjs";
import User from "../models/userModel.mjs";
import AsyncHandler from "express-async-handler";
import dotenv from "dotenv";
// import pkg from "gridfs-stream";
// const { GridFSBucket, GridFSStorage } = pkg;
import { GridFSBucket, GridFSBucketWriteStream } from "mongodb";
dotenv.config();

const db = mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
});

import multer from "multer";
import express from "express";

import { GridFsStorage } from "multer-gridfs-storage";

const app = express();
app.use(express.urlencoded({ extended: true }));

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error("Error in fetching blogs", error);
    res.status(500).json({ error: "Server error" });
  }
};
const createBlog = AsyncHandler(async (req, res) => {
  const { title, description, categories } = req.body;

  const newBlog = new Blog({
    title,
    description,
    categories,
    image: {
      data: buffer,
      contentType: mimetype,
    },
  });
  const savedBlog = await newBlog.save();
  res.status(200).json(savedBlog);
  console.log(savedBlog);
});

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!updatedBlog) {
      // If the blog post with the provided ID doesn't exist
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(updatedBlog);
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error("Error updating blog post:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const author = "kanik";
    // const user = await User.
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    blog.comments.push({ author, content });

    // Save the updated blog post
    const updatedBlog = await blog.save();

    res.status(200).json(updatedBlog);
    console.log(updatedBlog);
  } catch (error) {
    console.log("error creating comment", error);
    res.status(500).json({ error: "Server error aari hai" });
  }
};

const likes = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // Find the blog post by its ID in the database
    const post = await Blog.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    // Check if the user has already liked the blog post
    const existingLike = post.likes.find((like) => like.userId === userId);

    if (existingLike) {
      // User has already liked the post, so unlike it
      post.likes = post.likes.filter((like) => like.userId !== userId);
    } else {
      // User has not liked the post, so add the new like
      post.likes.push({ userId });
    }

    // Save the updated blog post in the database
    const updatedBlog = await post.save();

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Error in adding like", error);
    res.status(500).json({ error: "Server error" });
  }
};

const filterByCategory = async (req, res) => {
  try {
    const { categories } = req.query; // Get the categories from the query parameter

    if (!categories || categories.length === 0) {
      return res.status(400).json({ error: "Invalid categories provided" });
    }
    const blogs = await Blog.find({ categories: { $in: categories } });
    if (blogs.length === 0) {
      return res
        .status(404)
        .json({ error: "No blogs found for the given category" });
    }
    res.json(blogs);
  } catch (error) {
    console.error("Error in fetching category-wise blogs", error);
    res.status(500).json({ error: "Server error" });
  }
};
const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    console.log(title);
    const regex = new RegExp(title, "i");
    const blog = await Blog.find({ title: { $regex: regex } });
    if (blog.length === 0) {
      return res
        .status(404)
        .json({ error: `No blog found for the given title : ${title}` });
    }
    res.json(blog);
    console.log(blog);
  } catch (error) {
    console.error(`Error in searching ${title}  blog`, error);
    res.status(500).json({ error: "Server error aari hai mere bhai" });
  }
};

import mongoose from "mongoose";

const makeBlog = async (req, res) => {
  try {
    const { title, description, categories, image } = req.body;
    console.log("i am in backend");
    // const image = req.file ? req.file.filename : null;

    const blog = new Blog({
      title,
      description,
      categories,
      image,
    });

    const savedBlog = await blog.save();

    return res.status(201).json(savedBlog);
  } catch (error) {
    console.log("Error in creating blog", error);
    res.status(500).json({ error: "Server error aari hai mere bhai" });
  }
};
const getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const seemore = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog post", error);
    res.status(500).json({ error: "Server error" });
  }
};

export {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  addComment,
  likes,
  filterByCategory,
  searchByTitle,
  makeBlog,
  getImage,
  seemore,
};
