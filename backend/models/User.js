const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, default: 'Citizen' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, default: '' },
  role: { type: String, enum: ['citizen', 'admin'], default: 'citizen' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
