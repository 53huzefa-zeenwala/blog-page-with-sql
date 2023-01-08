import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.category
    ? "SELECT * FROM posts WHERE category=? ORDER BY id DESC"
    : "SELECT * FROM posts ORDER BY id DESC LIMIT 10";

  db.query(q, [req.query.category], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

export const getSinglePost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `description`, p.image, u.image AS userImg, `category`,`date` FROM users AS u JOIN posts AS p ON u.id = p.user_id WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authorized");

  jwt.verify(token, "jwtKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "INSERT INTO posts(`title`, `description`, `image`, `category`, `date`,`user_id`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.description,
      req.body.image,
      req.body.category,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`description`=?,`image`=?,`category`=? WHERE `id` = ? AND `user_id` = ?";

    const values = [req.body.title, req.body.description, req.body.image, req.body.category];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authorized");

  jwt.verify(token, "jwtKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `user_id`  = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("Yon cannot delete this post");
      return res.json("Post has been deleted.");
    });
  });
};

export const relatedPosts = (req, res) => {
  const q =
    "SELECT * FROM posts WHERE category=? AND id != ? ORDER BY id DESC LIMIT 3";

  db.query(q, [req.query.category, req.query.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};
