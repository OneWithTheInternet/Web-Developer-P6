//MongoDB PW: RuKgA0EcZh4waX3n
//MongoDB connection:  mongodb+srv://onewiththeinternet:<password>@cluster0.fwyqr.mongodb.net/?retryWrites=true&w=majority

const express = require('express');

const app = express();

/**
 * extracts/parses request's JSON body
 */
app.use(express.json());

/**
 * Mongoose package importing
 * Mongoose allows for a more robust NoSQL features
 */
const mongoose = require('mongoose');

/**
 * MongoDB through Mongoose connection
 */
mongoose.connect('mongodb+srv://onewiththeinternet:RuKgA0EcZh4waX3n@cluster0.fwyqr.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
});

/**
 * This middleware allows HTTP calls between servers
 * Prevents Cross-origin resourse sharing (CORS) errors
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Thing created successfully!'
    });
});

app.get("/api/auth/login", (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'My first thing',
        description: 'All of the info about my first thing',
        imageUrl: '',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'My second thing',
        description: 'All of the info about my second thing',
        imageUrl: '',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
    next();
});

module.exports = app;
