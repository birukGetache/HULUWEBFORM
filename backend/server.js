// src/server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/User');
const FormData = require('./model/Form');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const Blog = require('./model/Blog');
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/HULUGENERAL', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.post('/signup', async (req, res) => {

  const { email, password } = req.body;
  console.log(req.body)
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).send({ message: 'User created' });
  } catch (error) {
    res.status(500).send({ error: 'Error creating user' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ error: 'Invalid email ' });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(user.password)
    if (!isMatch) return res.status(400).send({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Error logging in' });
  }
});

app.get('/api/blog', async (req, res) => {
  try {
    const posts = await Blog.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blog posts' });
  }
});

app.delete('/api/data/:id', async (req, res) => {
  try {
    await FormData.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting data', error });
  }
});

// Update a data entry
app.put('/api/data/:id', async (req, res) => {
  try {
    const updatedData = await FormData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ message: 'Error updating data', error });
  }
});

// Create a new blog post
app.post('/api/blog', async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = new Blog({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create blog post' });
  }
});


app.post('/api/submit', async (req, res) => {
    console.log(req.body);
    try {
      const data = new FormData(req.body);
      await data.save();
      res.status(201).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  app.get('/api/data', async (req, res) => {
    try {
      const data = await FormData.find(); // Ensure this is awaited
      res.json(data); // Send JSON response
    } catch (error) {
      console.error('Error fetching data:', error); // Log the error for debugging
      res.status(500).json({ message: 'Internal Server Error' }); // Send error response
    }
  });
  

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
