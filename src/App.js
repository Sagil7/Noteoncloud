import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Notestate from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
    <Notestate>
       <BrowserRouter>
       <Navbar/>
       <div className="container">
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes>
      </div>
    </BrowserRouter>
    </Notestate>
    </>
  );
}

export default App;
