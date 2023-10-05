import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {

  const [credential,setcredential]=useState({name:"",email:"",password:"",cpassword:""});
  let navigate=useNavigate()
  const handleSubmit=async (e)=>{
    const {name,email,password}=credential;
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify({name,email,password})
        });
        const json=await response.json()
        if(json.sucsess)
        {
         localStorage.setItem("token",json.authtoken)
         navigate('/home')
        }
        else{
          alert("invalid cerdential")
        }
        console.log(json)
  }
  const onchange = (e) => {
      setcredential({ ...credential, [e.target.name]: e.target.value })
    }

return (
  <div>
    <h2>Please Signup to use Inotebook</h2>
      <form onSubmit={handleSubmit}>
<div className="mb-3">
  <label htmlFor="name" className="form-label" >Name</label>
  <input type="text" className="form-control" id="name" required minLength={3} onChange={onchange} name='name' value={credential.name} aria-describedby="emailHelp"/>
</div>
<div className="mb-3">
  <label htmlFor="email" className="form-label" >Email address</label>
  <input type="email" className="form-control" id="email" onChange={onchange} name='email' value={credential.email} aria-describedby="emailHelp"/>
  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
</div>
<div className="mb-3">
  <label htmlFor="password" className="form-label">Password</label>
  <input type="password" className="form-control" onChange={onchange} name='password' value={credential.password} id="password"/>
</div>


<button type="submit" className="btn btn-primary" >Submit</button>
</form>
  </div>
)


}

export default Signup
