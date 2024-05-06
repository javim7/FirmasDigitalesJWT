require('dotenv').config();
const express = require('express');
const User = require('./userModel');
const jwt = require('jsonwebtoken');

const router = express.Router();

// GET /users
router.get('/', async  (req, res) => {
    const users = await User.find({}).sort({ date_created: -1 })
    res.status(200).json(users)
});

const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    
    if (!token) {
        res.status(401).send('No token provided');
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).send('Failed to authenticate');
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
}

// get /users/isAuth
router.get('/isAuth', verifyJWT, async (req, res) => {
    res.status(200).json({auth: true, message: 'Authenticated!'});
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
        return res.status(404).json({ error: 'User not found', auth: false });
      }
  
      // Check if the provided hashed password matches the user's hashed password
      if (user.password !== password) {
        return res.status(401).json({ error: 'Incorrect password', auth: false });
      }
      
      const id = user._id.toString();
      const token = jwt.sign({id}, process.env.JWT_SECRET, { 
        expiresIn: '1h' 
    });

    // console.log('id: ', id)
    // console.log('token: ', token)

      // If username and password are correct, return success
      res.status(200).json({ message: 'Login successful', auth: true, user: user.username, id: id, token: token });
    } catch (err) {
      // If an error occurs, return an error response
      res.status(500).json({ error: err.message, auth: false });
    }
  });  

module.exports = router;