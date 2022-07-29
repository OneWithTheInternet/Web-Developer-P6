const express = require('express');

const app = express();

app.use(express.json());

const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

//MongoDB through Mongoose connection
mongoose.connect('mongodb+srv://onewiththeinternet:RuKgA0EcZh4waX3n@cluster0.fwyqr.mongodb.net/?retryWrites=true&w=majority')
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

//importing routes
app.use('/api/auth', userRoutes);


module.exports = app;