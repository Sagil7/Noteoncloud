const express = require('express');
const User = require('../model/User');
const router = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const secretkey = "sagilisanice@man"


//ROUTE 1. Creating new user authenitcation is not requierd
router.post('/createuser', [
  // applying validiation using express validator on body values
  body('email').isEmail(),
  body('name').isLength({ min: 3 }),
  body('password').isLength({ min: 5 }),
], async (req, res) => {
  let sucsess = false;

  // checkig is there any error return by express validator if it exist then return the error array
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ sucsess, errors: errors.array() });
  }

  // Wrapping the content in try catch block inorder to deal with unknown error
  try {

    // checking if the email already registered
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ sucsess, errors: "email already exist" });
    }
    // adding some salt to password become more secure by adding some more string to it  using bcryptjs
    const salt = await bcrypt.genSalt(10);
    // converting plain text into a hash value
    const secpass = await bcrypt.hash(req.body.password, salt);

    // if all the above checks are correct the we will create the user in password we are passing the hash  value 'secpass' for security not the plain text
    user = await User.create({
      name: req.body.name,
      password: secpass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    // signing the authtoken
    sucsess = true;
    const authtoken = jwt.sign(data, secretkey);
    // sendint the authtoken itself as the response
    res.send({ sucsess, authtoken })

  }
  catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "some error occured" });
  }

});

//ROUTE 2.Login a existing user  authentication not required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password').isLength({ min: 5 }),

], async (req, res) => {
  // express validation check 
  let sucsess = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

    // Deconstructing the email and password value from req body 
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    // if user doesnot exit return email not found
    if (!user) {
      return res.status(400).json({ success, error: "email not found" });
    }


    const hash = user.password;
    // comparing the password saved in the database with the pasword enter by user
    const passwordcompare = await bcrypt.compare(password, hash);
    console.log(passwordcompare)
    if (!passwordcompare) {
      return res.status(400).json({ error: "enter correct credential" });
    }
    // This is the data which will be used in auth token take Id so that uniqueness of auth token acheived
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, secretkey);
    sucsess = true;
    res.send({ sucsess, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "some error occured" });
  }

});

//ROUTE 3 get user detail login required
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    const userid = req.user.id;
    // Geting user detail using id and return all the value in user except password 
    let user = await User.findById(userid).select("-password");
    res.send(user);

  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "some error occured" });
  }
})

module.exports = router;