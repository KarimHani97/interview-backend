const express = require('express');
const multer = require('multer');
const { auth, hrOnly } = require('../middleware/auth');
const Candidate = require('../models/Candidate');
const { sendEmail } = require('../utils/emailService');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/apply', auth, upload.single('cv'), async (req, res) => {
  const { name, email, phone, position } = req.body;
  const candidate = new Candidate({ user: req.user.id, name, email, phone, position, cv: req.file?.path });
  await candidate.save();
  res.status(201).json({ message: 'Application submitted' });
});

router.get('/status', auth, async (req, res) => {
  const candidate = await Candidate.findOne({ user: req.user.id });
  res.json(candidate);
});

router.get('/', auth, hrOnly, async (req, res) => {
  const { position, status } = req.query;
  const filter = {};
  if (position) filter.position = position;
  if (status) filter.status = status;
  const candidates = await Candidate.find(filter).populate('user');
  res.json(candidates);
});

router.put('/:id/status', auth, hrOnly, async (req, res) => {
  const { status } = req.body;
  const candidate = await Candidate.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (status === 'Rejected') {
    await sendEmail(candidate.email, 'Application Update', 'Sorry, you were not selected.');
  } else if (status === 'Interview Scheduled') {
    await sendEmail(candidate.email, 'Interview Scheduled', 'Your interview is scheduled.');
  }
  res.json(candidate);
});

module.exports = router;