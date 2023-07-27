import Express from "express";
import {
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
} from "../controllers/blogController.mjs";
import multer from "multer";
import bodyParser from "body-parser";
import express from "express";
const app = express();
app.use(express.urlencoded({ extended: true }));

// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     // Generate a unique filename for the uploaded image
//     return cb(null, `${Date.now()}--${file.originalname}`);
//   },
// });
import upload from "../utils/upload.mjs";

const router = Express.Router();
router.get("/allBlog", getAllBlogs);
router.post("/create", createBlog);
router.put("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);
router.post("/comment/:id", addComment);
router.post("/likes/:id", likes);
router.get("/filter", filterByCategory);
router.get("/search", searchByTitle);
// router.post("/upload", upload.single("image"), uploadImage);
router.post("/make", upload.single("image"), makeBlog);
router.get("/file/:filename", getImage);
router.get("/seemore/:id", seemore);

export default router;
