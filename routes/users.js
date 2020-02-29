const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/User');
const express = require('express');
const router = express.Router();

//Create an user account
router.post('/', async (req, res) => {
  //search for error in the body of the request
  const error = validateUser(req.body);
  console.log('body',req.body)
  if(error) return res.status(400).send(error.details);
  // check if email is available
  const notAvailable = await User.findOne({email: req.body.email})
  if(notAvailable) return res.status(400).send({succes: false, message: 'email not available'})
  //encrypt password
  const hash = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, hash);
  //save the new customer user
  req.body.password = hashPassword;
  let user = new User(req.body);
  user = await user.save();
  res.send({succes: true, message: 'user created successfully'})
});

//login to an existin account
router.post('/login', async (req, res) => {
  //search for error in the body of the request
  const error = validateUser(req.body);
  console.log('body',req.body)
  if(error) return res.status(400).send(error.details);
  //check if email exist
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send({success: 'false', message: 'no user with this email'});
  //check if password match
  const matchPassword = await bcrypt.compare(req.body.password, user.password);
  if(!matchPassword) return res.status(400).send({success: 'false', message: 'incorrect password!'});
  //generate token and send the response
  const token = user.generateToken();
  res.send({success: 'true',token: token});
});
module.exports = router;