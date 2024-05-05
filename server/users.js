const express = require('express');
const User = require('./userModel');

const router = express.Router();

// GET /users
router.get('/', async  (req, res) => {
    const users = await User.find({}).sort({ date_created: -1 })
    res.status(200).json(users)
});

// get /users/:username
router.get('/:username', (req, res) => {
    res.json({ message: `Get user ${req.params.username}` });
});

// POST /users
router.post('/', async  (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.create({ username, password });
        user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST /users/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the provided hashed password matches the user's hashed password
      if (user.password !== password) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
  
      // If username and password are correct, return success
      res.status(200).json({ message: 'Login successful' });
    } catch (err) {
      // If an error occurs, return an error response
      res.status(500).json({ error: err.message });
    }
  });  

module.exports = router;