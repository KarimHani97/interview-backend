const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  cv: { type: String },
  status: { type: String, enum: ['Applied', 'Interview Scheduled', 'Rejected', 'Hired'], default: 'Applied' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Candidate', candidateSchema)