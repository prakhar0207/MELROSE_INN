// app.js
const express = require('express');
const app = express();
const path = require('path');
const User = require('./Models/user');
const cors = require('cors');
require('./DB/connection');

// Set up middleware to parse JSON bodies
app.use(express.json());
app.use(cors())

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve views
app.set('views', path.join(__dirname, 'views'));

// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for the menu page
app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'menu.html'));
});

// Route for user login
app.post('/login', async (req, res) => {
  try {
    const { name, email, appt_type } = req.body;

    // Basic validation
    if (!name || !appt_type) {
      return res.status(400).send("Name and appointment type are required");
    }

    // Create a new user
    const newUser = new User({
      name: name,
      email: email || "",
      appt_type: appt_type
    });

    // Save the user
    const user = await newUser.save();
    return res.status(200).json({
      user: user
    });
    console.log(user);
  } catch (error) {
    console.log(error);
    if (error.code === 11000 && error.keyValue && error.keyValue.email === null) {
      return res.status(400).json("Email cannot be null");
    }
    res.status(500).json("An error occurred while creating the user");
  }
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
