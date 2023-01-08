import axios from 'axios';
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useLocation, useNavigate } from "react-router-dom"
import moment from 'moment'
import { useEffect } from 'react';

export default function Write() {
  const state = useLocation()?.search?.split("=")[1]
  const navigate = useNavigate()
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("")
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null)
  const [defaultFile, setDefaultFile] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/posts/${state}`)
        setDefaultFile(data.image)
        setCategory(data.category)
        setValue(data.description)
        setTitle(data.title)
      } catch (error) {
        console.log(error)
      }
    }

    if (state) {
      fetchData()
    }
  }, [state])


  const upload = async () => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await axios.post("http://localhost:8000/upload", formData)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = async (e) => {
    e.preventDefault()
    if ((!file && !defaultFile) || !category || !title || !value) return console.log("nikal")
    const imgUrl = file && await upload()
    try {
      state
        ? await axios.put(`http://localhost:8000/api/posts/${state}`, {
          title,
          description: value,
          category,
          image: file ? imgUrl : defaultFile,
        }, {
          withCredentials: true
        })
        : await axios.post(`http://localhost:8000/api/posts/`, {
          title,
          description: value,
          category,
          image: file ? imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        }, {
          withCredentials: true
        });
      navigate('/')
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item"> <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={category === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}
