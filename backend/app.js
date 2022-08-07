const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const path = require('path');
require('dotenv').config();


//MongoDB through Mongoose connection
mongoose.connect(process.env.URL)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
});

//Prevents cross-origin resourse sharing (CORS) errors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Asking express app to serve images folder endpoint
app.use('/images', express.static(path.join(__dirname, 'images')));

//importing user routes
app.use('/api/auth', userRoutes);

//importing sauce routes
app.use('/api/sauces', sauceRoutes);


module.exports = app;