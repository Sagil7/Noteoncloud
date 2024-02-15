import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"; 
import '../Style/loginstyle.css'

function Login() {

  const [credential, setcredential] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await fetch("https://assignment-6q57.onrender.com/api/auth/login", {
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
   <div className='maincontainer'>
<h4 style={{color:'wheat'}}>Welcome to NoteOnCloude Here you can save your note and you can acess it from anywhere with right credential</h4>
<h5 style={{textAlign:'center',color:'wheat'}}>if You are new user then Signup first</h5>
    <div class="container1">
	<div class="screen">
		<div class="screen__content">
			<form class="login" onSubmit={handleSubmit}>
				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
          <input type="email" className="login__input" id="email" onChange={onchange} name='email' value={credential.email} aria-describedby="emailHelp"  placeholder='Email'/>
       	{/* <input type="text" class="login__input" placeholder="User name / Email"/> */}
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
          <input type="password" className="login__input" onChange={onchange} name='password' value={credential.password} id="password" placeholder='password'/>
					{/* <input type="password" class="login__input" placeholder="Password"/> */}
				</div>
				<button class="button login__submit" type='submit'>
					<span class="button__text">Log In Now</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div class="social-login">
				<h3>log in via</h3>
				<h6>soon available</h6>
				<div class="social-icons">
					<a href="#" class="social-login__icon fab fa-instagram"></a>
					<a href="#" class="social-login__icon fab fa-facebook"></a>
					<a href="#" class="social-login__icon fab fa-twitter"></a>
				</div>
			</div>
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

export default Login
