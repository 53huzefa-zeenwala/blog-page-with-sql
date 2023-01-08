import express from "express";
import postRouter from "./routes/posts.js";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { relatedPosts } from "./controllers/post.js";
import multer from "multer";

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true, withCredentials: true }));
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.get("/api/related", relatedPosts);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.json(file.filename);
});

app.get("/api", (req, res) => {
  res.json("hello this is backend");
});

app.listen(8000, () => {
  console.log("Connected to express");
});
