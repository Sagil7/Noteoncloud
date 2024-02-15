import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/loginstyle.css'

function Signup() {

  const [credential, setcredential] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    const { name, email, password } = credential;
    e.preventDefault();
    const response = await fetch("https://assignment-6q57.onrender.com/api/auth/createuser", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    if (json.sucsess) {
      localStorage.setItem("token", json.authtoken)
      navigate('/home')
    }
    else {
      alert("invalid cerdential")
    }
    console.log(json)
  }
  const onchange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value })
  }

  return (
    <div className='maincontainer'>
     
      <div class="container1">
	<div class="screen">
		<div class="screen__content">
			<form class="login" onSubmit={handleSubmit}>
				<div class="login__field">
          <i class="fa-solid fa-user" style={{color: '#B197FC'}}></i>
          <input type="text" className="login__input" id="name" required minLength={3} onChange={onchange} name='name' value={credential.name} aria-describedby="emailHelp" placeholder='Enter your Name' />
				</div>
				<div class="login__field">
					{/* <i class="login__icon fas fa-lock"></i> */}
          <i class="fa-solid fa-envelope" style={{color: '#B197FC'}}></i>
          <input type="email" className="login__input" id="email" onChange={onchange} name='email' value={credential.email} aria-describedby="emailHelp" placeholder='Email' />
				</div>
				<div class="login__field">
          <i class="fa-solid fa-lock" style={{color: '#B197FC'}}></i>
          <input type="password" className="login__input" onChange={onchange} name='password' value={credential.password} id="password"  placeholder='Password'/>
				</div>
				<button class="button login__submit" type='submit'>
					<span class="button__text">Sign Up</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
		
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
    </div>
  )


}

export default Signup
