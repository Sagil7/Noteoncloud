import React, { useEffect, useRef ,useState} from 'react'
import { useContext } from 'react';
import Notecontext from '../context/notes/notecontext';
import Noteitem from './Noteitem';
import Adddnote from './Addnote';
import { useNavigate } from 'react-router-dom';
function Notes() {
    const context=useContext(Notecontext);
    const ref=useRef(null);
    const refclose=useRef(null)
    let navigate=useNavigate()
    const {notes,getNotes,editnode}=context;
    useEffect(()=>{
      if(localStorage.getItem('token'))
      {
        getNotes();
      }
      else{
       navigate('/login')
      }
    },[]);
    const [note, setnotes] = useState({id:"" ,etitle: "",edescription: "", etag: "" })
    const updateNote=(currentnote)=>{
     setnotes({id:currentnote._id, etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag}); 
    ref.current.click()
    }

    const handleonclick = (e) => {
      e.preventDefault();
      // console.log("update done",note);
      editnode(note.id,note.etitle,note.edescription,note.etag)
      refclose.current.click()
      // addnote(note.etitle,note.edescription,note.etag)
    }
    const onchange = (e) => {
      setnotes({ ...note, [e.target.name]: e.target.value })
    }
  return (
    <>
    <Adddnote/>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="etitle"value={note.etitle} name='etitle' aria-describedby="emailHelp" placeholder="Enter Title" onChange={onchange} />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <input type="text" className="form-control"value={note.edescription} id="edescription" name='edescription' placeholder="Description" onChange={onchange} />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input type="text" className="form-control" id="etag" value={note.etag} name='etag' placeholder="Tag" onChange={onchange} />
        </div>
      
      
      </form>
      </div>
      <div className="modal-footer">
        <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={handleonclick} type="button" className="btn btn-primary">Update Notes</button>
      </div>
    </div>
  </div>
</div>
    <div className='row my-3'>    
        {notes.map((note)=>{
          return <Noteitem key={note._id} note ={note} updateNote={updateNote}/>
     })}
    </div>
    </>
  )
}

export default Notes
