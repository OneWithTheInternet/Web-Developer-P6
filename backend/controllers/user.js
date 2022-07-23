const userModel = require("../models/user");

exports.createUser = (req, res, next) => {
  
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
};

exports.testAPI = (req, res, next) => {
    res.json({message:"love"});
    next();
};