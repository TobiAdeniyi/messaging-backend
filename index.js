const express = require('express');
const app = express();

// add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get all the routes

/**
 * Get home page
 */
app.get('/', (req, res, next) => {
  try {
    res.status(200).json({ message: 'Hello World!' });
    next();
  } catch (error) {
    console.log(error);
    next(error)
  }
});


module.exports = app;