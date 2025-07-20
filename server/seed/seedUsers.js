const mongoose = require('mongoose');
const User = require('../models/User');

const users = ['Rahul', 'Kamal', 'Sanak', 'Amit', 'Pooja', 'Divya', 'Rohit', 'Sneha', 'Vikram', 'Neha'];

mongoose.connect('mongodb://127.0.0.1:27017/leaderboard')
  .then(async () => {
    await User.deleteMany({});
    await User.insertMany(users.map(name => ({ name })));
    console.log("✅ Users seeded");
    process.exit();
  })
  .catch(err => console.log("❌ Seeding error:", err));
