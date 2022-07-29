const userModel = require("../models/user");
const bcrypt = require('bcrypt');

exports.createUser = (req, res, next) => {
  //encrypting the pasword input
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {

      //creating a user from our user model
      const user = new userModel({
        email: req.body.email,
        password: hash
      });
      
      //saving request post data to database and sending back response
      user.save().then(
    
        () => {
          res.status(201).json({
          message: 'Account created successfully'
          });
        }
    
      )
        
      .catch(
    
        (error) => {
          res.status(500).json({
            error: error
          });
        }
        
      );
    }
  );
};


/**
 * Validates existing account input by user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.login = (req, res, next) => {
  userModel.find().then(
    (users) => {
      res.status(200).json(users);
    }
  )

  .catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};


/* exports.login = (req, res, next) => {
  userModel.findOne({
    email: req.body.email
  }).then(
    (user) => {
      res.status(200).json(user);
      console.log(res.email);
    }
  )

  .catch(
    (error) => {
      res.status(400).json({
        error: error
      });
      console.log('oop, request did not work');
    }
  );
}; */