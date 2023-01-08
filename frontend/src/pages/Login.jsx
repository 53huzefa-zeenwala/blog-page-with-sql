import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/authContext';

export default function Login() {
  const { login } = useContext(AuthContext)
  const [inputs, setInputs] = useState({
    username: "",
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
      await login(inputs)
      navigate('/')
    } catch (error) {
      console.log(error)
      setErr(error?.response?.data || error.message)
    }
  }
  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Username' name='username' onChange={handleChange} required />
        <input type="password" placeholder='Password' name='password' onChange={handleChange} required />
        <button type='submit'>Login</button>
        {err && <p>{err}</p>}
        <span>Don't you have an account? <Link to='/register'>Register</Link> </span>
      </form>
    </div>
  )
}
