import React, { useState } from "react";
import Notecontext from "./notecontext";

const Notestate=(props)=>{
  const [notes,setnotes]=useState([])
  const host="http://localhost:5000"


  const getNotes=async ()=>{
    const response = await fetch(`${host}/api/notes/fetchalluser`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')

      }, 
    });
    const json=await response.json()
    //  console.log(json);
     setnotes(json)
  }



  // Add a note 
  
  const addnote =async (title,description,tag)=>{
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')

      }, 
      body: JSON.stringify({title,description,tag}), 
    });
    const note=await response.json();

   setnotes(notes.concat(note))
  }

  // Delte a node
    const Deletenode =async (id)=>{
      const response = await fetch(`${host}/api/notes/delete/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')

        }, 
      });
      console.log(await response.json());
    // console.log("deleting the node with id "+id);
    const newnote=notes.filter((note)=>{return note._id!==id});
    setnotes(newnote)
   }
  // edit a node
  const editnode =async (id,title,description,tag)=>{
    
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')

      }, 
      body: JSON.stringify({title,description,tag}), 
    });
    // const json= response.json(); 
    
    let newnote=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id===id)
      {
        newnote[index].title=title;
        newnote[index].description=description;
        newnote[index].tag=tag;
        break;
      }
      setnotes(newnote)
      
    }
  } 
    return(
        <Notecontext.Provider value={{notes,setnotes,addnote,Deletenode,editnode,getNotes}}>
            {props.children}
        </Notecontext.Provider>
    )

};

export default Notestate;