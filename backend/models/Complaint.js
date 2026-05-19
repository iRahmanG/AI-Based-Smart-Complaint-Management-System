const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String }, // URL or base64
  status: { 
    type: String, 
    enum: ['Pending', 'Under Review', 'In Progress', 'Resolved'],
    default: 'Pending' 
  },
  priority: { type: String },
  department: { type: String },
  aiSummary: { type: String },
  aiResponse: { type: String },
  urgency: { type: String },
  sentiment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
