const express = require('express');
const User = require('./userModel');

const router = express.Router();

// GET /users
router.get('/', (req, res) => {
    res.json({ message: 'Get users' });
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

module.exports = router;