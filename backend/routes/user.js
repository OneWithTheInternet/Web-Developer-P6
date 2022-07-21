const express = require('express');

const router = express.Router();

const userModel = require("../models/user");


//creates an new user account in the data base
router.post("/signup", (req, res, next) => {
  
  const user = new userModel({
    email: req.body.email,
    password: req.body.password,
  });
  
  //saving request post data to database and sending back response
  user.save().then(

    () => {
      res.status(201).json({
      message: 'Account created successfully'
      });
      console.log('account created');
    })
    
    .catch(

    (error) => {
      res.status(400).json({
        error: error
      });
      console.log('error happend');
    }
    
  );

  next();
});


//generic test API response
router.get('/', (req, res, next) => {
  res.json({message:"love"});
});


module.exports = router;