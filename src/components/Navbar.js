import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const host="https://assignment-6q57.onrender.com"
  const [name,setname]=useState("")

  let navigate = useNavigate();
  const Handlelogout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
  
        const json = await response.json();
        setname(json.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData(); // Call the asynchronous function
  }, );
  
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">InoteBook</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" to="/about">About</Link>
              </li>

            </ul>
           
            {!localStorage.getItem('token')
             ?   <form className="d-flex" role="search">
              <Link className="btn btn-success mx-2" to="/login" role="button">Login</Link>
              <Link className="btn btn-success mx-2" to="/signup" role="button">Signup</Link>
                </form> :
            <form className="d-flex" role="search">
              <button className='btn btn-outline-warning   mx-5' ><i mar class="fa-solid fa-user fa-lg mx-2"></i>{name}</button>
              <button className='btn btn-danger' onClick={Handlelogout}>Logout</button>
            </form> }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
