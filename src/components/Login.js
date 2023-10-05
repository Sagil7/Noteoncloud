import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Login() {

  const [credential, setcredential] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credential.email, password: credential.password })
    });
    const json = await response.json()
    if (json.sucsess) {
      localStorage.setItem("token", json.authtoken)
      navigate('/home')
    }
    else {
      alert("invalid cerdential")
    }
  }
  const onchange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <h2>Please login to use Inotebook</h2>
          <label htmlFor="email" className="form-label" >Email address</label>
          <input type="email" className="form-control" id="email" onChange={onchange} name='email' value={credential.email} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onchange} name='password' value={credential.password} id="password" />
        </div>

        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login
