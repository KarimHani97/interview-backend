const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  interviewer: { type: String, required: true },
  result: { type: String, enum: ['Pending', 'Passed', 'Failed'], default: 'Pending' },
});

module.exports = mongoose.model('Interview', interviewSchema);