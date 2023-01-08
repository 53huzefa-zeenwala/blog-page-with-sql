import {
  addPost,
  deletePost,
  getPosts,
  getSinglePost,
  updatePost,
} from "../controllers/post.js";
import express from "express";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
