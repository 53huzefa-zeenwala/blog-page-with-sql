import { Link, useNavigate } from "react-router-dom";
import React from 'react'
import { useState } from "react";
import axios from 'axios'

export default function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [err, setErr] = useState(null)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8000/api/auth/register", inputs)
      navigate('/login')
    } catch (error) {
      console.log(error)
      setErr(error?.response?.data || error.message)
    }
  }
  return (
    <div className="auth">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Username' name="username" autoComplete="username" onChange={handleChange} required />
        <input type="email" placeholder='Email' name="email" autoComplete="email" onChange={handleChange} required />
        <input type="password" placeholder='Password' name="password" autoComplete="new-password" onChange={handleChange} required />
        <button type="submit">Register</button>
        {err && <p>{err}</p>}
        <span>Do you have an account? <Link to='/login'>Login</Link> </span>
      </form>
    </div>
  )
}
