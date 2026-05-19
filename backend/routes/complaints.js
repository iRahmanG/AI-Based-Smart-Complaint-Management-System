const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const auth = require('../middleware/authMiddleware');

// GET complaints (filtered by user unless admin)
router.get('/', auth, async (req, res) => {
  try {
    const filter = {};
    if (req.user.role !== 'admin') {
      filter.user = req.user.userId;
    }
    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// SEARCH complaints by keyword/location/category/status
router.get('/search/query', auth, async (req, res) => {
  try {
    const { q, location, category, status } = req.query;
    const filter = {};

    if (req.user.role !== 'admin') {
      filter.user = req.user.userId;
    }

    if (q) {
      filter.$or = [
        { title: { $regex: new RegExp(q, 'i') } },
        { description: { $regex: new RegExp(q, 'i') } },
        { location: { $regex: new RegExp(q, 'i') } }
      ];
    }
    if (location) filter.location = { $regex: new RegExp(location, 'i') };
    if (category) filter.category = category;
    if (status) filter.status = status;

    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET single complaint by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    if (req.user.role !== 'admin' && complaint.user?.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST create new complaint (with full AI fields)
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, title, description, category, location,
            priority, department, aiSummary, aiResponse, urgency, sentiment } = req.body;

    if (!title || !description || !email || !name || !category || !location) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }
    if (!email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    const newComplaint = new Complaint({
      name, email, title, description, category, location,
      priority: priority || 'Medium',
      department: department || '',
      aiSummary: aiSummary || '',
      aiResponse: aiResponse || '',
      urgency: urgency || '',
      sentiment: sentiment || '',
      user: req.user.userId
    });

    const complaint = await newComplaint.save();
    res.status(201).json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT update complaint status (admin/auth)
router.put('/:id', auth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    if (req.user.role !== 'admin' && complaint.user?.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    Object.assign(complaint, req.body);
    await complaint.save();
    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE complaint
router.delete('/:id', auth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    if (req.user.role !== 'admin' && complaint.user?.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: 'Complaint removed successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
