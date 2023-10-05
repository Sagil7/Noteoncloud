const express = require('express');
const Note = require('../model/Notes');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


//ROUTE 1. Get allnotes using localhost:3000/api/notes/fetchalluser
router.get('/fetchalluser', fetchuser, async (req, res) => {

  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "some error occured" });
  }

})
//ROUTE 2. adding notes to the user

router.post('/addnote', [
  // applying validiation using express validator on body values
  body('title').isLength({ min: 3 }),
  body('description').isLength({ min: 5 }),
], fetchuser, async (req, res) => {

  // checkig is there any error return by express validator if it exist then return the error array
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description, tag } = req.body;
    const note = new Note({
      title, description, tag, user: req.user.id
    })
    const savenote = await note.save()
    res.json(savenote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "some error occured" });
  }

});

//ROUTE 3. updating an existing notes to the user
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  try {
    
 
  const { title, description, tag } = req.body;
  const newnote = {};
  if (title) { newnote.title =title};
  if (description) { newnote.description=description };
  if (tag) { newnote.tag=tag };
  // find the note to be update
  let note = await Note.findById(req.params.id);
  if (!note) { 
    return res.status(404).send("not found") 
  };
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed")
  }
  note =await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
  res.json({note});
  console.log(note);
} catch (error) {
  console.error(error.message);
  res.status(500).send({ error: "some error occured" });
}
  
})

//ROUTE 4. deleting an existing notes to the user
router.delete('/delete/:id', fetchuser, async (req, res) => {

  try {
    
  
  // find the note to be update
  let note = await Note.findById(req.params.id);
  if (!note) { 
    return res.status(404).send("not found") 
  };
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed")
  }
  note =await Note.findByIdAndDelete(req.params.id);
  res.json({"Succese":"note has been deleted",note:note});
  console.log(note);
} catch (error) {
    
}
})



module.exports = router;