const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// GET all users sorted by totalPoints
router.get('/users', async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json({ users });
});

// POST add a new user
router.post('/users', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const user = new User({ name });
  await user.save();
  res.status(201).json(user);
});

// POST claim random points for a user
router.post('/users/:id/claim', async (req, res) => {
  const { id } = req.params;
  const points = Math.floor(Math.random() * 10) + 1;

  const user = await User.findByIdAndUpdate(id, { $inc: { totalPoints: points } }, { new: true });
  if (!user) return res.status(404).json({ error: "User not found" });

  const history = await ClaimHistory.create({ userId: id, points });
  res.json({ user, points, history });
});

// GET claim history
router.get('/history', async (req, res) => {
  const history = await ClaimHistory.find().populate('userId', 'name');
  res.json({ history });
});

module.exports = router;
