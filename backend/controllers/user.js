const userModel = require("../models/user");
//importing package for validating passwords
const bcrypt = require('bcrypt');
//importing package for token creation
const jwt = require('jsonwebtoken');

/**
 * Creates new user in the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
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
 * Validates user account input for login
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.login = (req, res, next) => {
  
  //validating email
  userModel.findOne({email: req.body.email})
  
  .then(
    (user) => {

      if (!user) {
        return res.status(401).json({
          error: new Error('User not found')
        });
      }
      
      //validating password
      bcrypt.compare(req.body.password, user.password)
      .then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('incorrent password')
            });
          }

          //Creating authorization token
          const token = jwt.sign(
            {userId: user._id},
            'RANDOM_TOKEN_KEY',
            {expiresIn: '24h'}
          );

          //sending response for succeful authentification
          res.status(200).json({
            userId: user._id,
            token: token
          });
        }  
      )
      
      .catch(
        (error) => {
          res.status(500).json({error: error});
        }
      );
    }
  )

  .catch(
    (error) => {
      res.status(400).json({error: error});
    }
  );

};