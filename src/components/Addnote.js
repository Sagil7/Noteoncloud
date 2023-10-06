import React, { useState } from 'react'
import { useContext } from 'react';
import Notecontext from '../context/notes/notecontext';
function Adddnote() {
  const context = useContext(Notecontext);
  const { addnote } = context
  const [note, setnotes] = useState({ title: "", description: "", tag: "" })
  const handleonclick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);

  }
  const onchange = (e) => {
    setnotes({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div className='container my-3'>
      <h2>Add a note</h2>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" placeholder="Enter Title" onChange={onchange} />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <input type="text" className="form-control" id="description" name='description' placeholder="Description" onChange={onchange} />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' placeholder="Tag" onChange={onchange} />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleonclick}>AddNote</button>
      </form>
      <h2>your notes</h2>

    </div>
  )
}

export default Adddnote
