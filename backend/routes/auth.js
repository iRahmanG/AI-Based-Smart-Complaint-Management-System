const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup — supports fullName, email, phoneNumber, password
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'An account with this email already exists.' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ fullName: fullName || 'Citizen', email, password: hashedPassword, phoneNumber: phoneNumber || '' });
    await user.save();

    const payload = { userId: user.id, role: user.role, fullName: user.fullName };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, fullName: user.fullName, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during signup.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'No account found with this email.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password. Please try again.' });

    const payload = { userId: user.id, role: user.role, fullName: user.fullName };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, fullName: user.fullName, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// Google Login (simulated — creates/finds demo account)
router.post('/google', async (req, res) => {
  try {
    const email = 'demo.citizen@google.com';
    let user = await User.findOne({ email });

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('google_oauth_placeholder', salt);
      user = new User({ fullName: 'Demo Citizen', email, password: hashedPassword, role: 'citizen' });
      await user.save();
    }

    const payload = { userId: user.id, role: user.role, fullName: user.fullName };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, fullName: user.fullName, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Google login failed.' });
  }
});

// Get logged-in user profile
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });
    const token = authHeader.split(' ')[1];
    const decoded = require('jsonwebtoken').verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
