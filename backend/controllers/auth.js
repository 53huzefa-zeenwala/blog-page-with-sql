import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const { username, email, password } = req.body;

  //check existing user
  const q = "SELECT * FROM users WHERE email = ? OR username  = ?";

  db.query(q, [email, username], (err, data) => {
    if (err) return res.status(400).json(err);
    if (data.length) return res.status(500).json("user already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [username, email, hash];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json("User has been successfully created");
    });
  });
};
export const login = (req, res) => {
  const { username, password } = req.body;

  const q = "SELECT * FROM users WHERE username  = ?";

  db.query(q, [username], (err, data) => {
    if (err) return res.status(400).json(err);
    if (data.length === 0) return res.status(404).json("user not fount!");

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password");

    const token = jwt.sign({ id: data[0].id }, "jwtKey");
    const { password, ...other } = data[0];

    res.cookie("access_token", token).status(200).json(other);
  });
};
export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: "true",
    })
    .status(200)
    .json("User has been logged out.");
};
