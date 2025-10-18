const express = require('express');
const { auth, hrOnly } = require('../middleware/auth');
const Interview = require('../models/Interview');
const Candidate = require('../models/Candidate');
const { sendEmail } = require('../utils/emailService');

const router = express.Router();

router.post('/', auth, hrOnly, async (req, res) => {
  const { candidateId, date, time, interviewer } = req.body;
  const interview = new Interview({ candidate: candidateId, date, time, interviewer });
  await interview.save();
  const candidate = await Candidate.findById(candidateId);
  await sendEmail(candidate.email, 'Interview Details', `Date: ${date}, Time: ${time}, Interviewer: ${interviewer}`);
  res.status(201).json(interview);
});

router.put('/:id/result', auth, hrOnly, async (req, res) => {
  const { result } = req.body;
  const interview = await Interview.findByIdAndUpdate(req.params.id, { result }, { new: true });
  res.json(interview);
});

module.exports = router;