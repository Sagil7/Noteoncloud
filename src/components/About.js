import React, { useContext, useEffect, useRef } from 'react'
import { createContext } from 'react'
import Notecontext from '../context/notes/notecontext'
function About() {
  const inputRef = useRef(null);


  return (
    <>
    <div>
      <h1>About NoteOncloud</h1>
      <p>NoteOncloud is a powerful and convenient note-taking web application designed to simplify your note management experience. Whether you're a student, professional, or anyone who loves jotting down thoughts, NoteOncloud is here to enhance your note-taking journey.
      </p>
      <h3>Key Feature</h3>
        <p>
      1. User-Friendly Interface <br />
      2. CRUD Operations<br />
      3. Secure Login and Signup <br />
      4. Cross-Browser Access<br />
      5. Hosted on a Secure Server<br />
      </p>
      <h1></h1>
    </div>
    <div>
      <h1>Building a Secure and Efficient Express Server with Essential Libraries</h1>
      <h3>1. Express.js: The Backbone of the Server</h3>
      <p>At the heart of our server is Express.js, a minimal and flexible Node.js web application framework. Express simplifies the process of building APIs and handling HTTP requests, providing a solid foundation for our server architecture.</p>
      <h3>2. Mongoose: Bridging Node.js and MongoDB</h3>
      <p>It provides a straightforward way to define data schemas, interact with the database, and perform CRUD operations.</p>
      <h3>3. Bcrypt.js: Safeguarding User Passwords</h3>
      <p>User authentication requires a robust method for password hashing. Bcrypt.js is a library that helps us achieve this by securely hashing passwords using the bcrypt algorithm.</p>
      <h3>4. JSON Web Token (JWT): Enhancing Authentication</h3>
      <p>JSON Web Tokens (JWT) play a pivotal role in secure user authentication. By encoding user information into a token, we can verify the user's identity across different requests.</p>
      <h3>5. Express Validator: Streamlining Input Validation</h3>
      <p>It provides a straightforward way to define data schemas, interact with the database, and perform CRUD operations.</p>
      <h3>6. Managing Notes with React Context</h3>
      <p>In the realm of frontend development, the importance of state management cannot be overstated. React, a popular JavaScript library for building user interfaces, provides a powerful feature known as context. Your provided code showcases a React context designed to manage notes within your applicatio.</p>
    </div>
    </>
  )
}

export default About
