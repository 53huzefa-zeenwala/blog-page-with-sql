import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Edit from "../img/edit.svg";
import Delete from "../img/delete.svg";
import Menu from '../components/Menu';
import axios from 'axios';
import { useEffect } from 'react';
import { AuthContext } from '../context/authContext';

export default function Single() {
  const { currentUser } = useContext(AuthContext)

  const [post, setPost] = useState([])

  const location = useLocation()
  const navigate = useNavigate()
  const postId = location?.pathname?.split("/")[2]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/posts/${postId}`)
        setPost(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [postId])

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${postId}`, {
        withCredentials: true
      })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.image}`} alt="" />
        <div className="user">
          <img src={post?.userImg || "https://images.pexels.com/photos/13009437/pexels-photo-13009437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" />
          <div className="ifo">
            <span>{post?.username}</span>
            <p>Posted 2 days ago</p>
          </div>
          {currentUser?.username === post.username && <div className="edit">
            <Link to={`/write?edit=${post.id}`} >
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>}
        </div>
        <h1>{post.title}</h1>
        {getText(post.description)}
      </div>
      <div className="menu">
        <Menu category={post.category} postId={postId} />
      </div>
    </div>
  )
}
