const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { email, mobile, password, role, name, workType, location } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create and save the new user
    const newUser = new User({ email, mobile, password, role, name, workType, location });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({ message: 'Registration successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body; // identifier can be email or mobile
  try {
    const user = await User.findOne({ $or: [{ email: identifier }, { mobile: identifier }] });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
