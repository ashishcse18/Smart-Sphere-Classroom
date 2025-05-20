const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Setup
mongoose.connect('mongodb://localhost:27017/courseNotes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const noteSchema = new mongoose.Schema({
  name: String,
  path: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  desc: String,
  date: { type: Date, default: Date.now },
  notes: [noteSchema],
});

const Course = mongoose.model('Course', courseSchema);

// Multer Setup for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(__dirname, 'uploads', req.params.title);
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// Routes
app.get('/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

app.post('/courses', async (req, res) => {
  const { title, desc } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const exists = await Course.findOne({ title });
  if (exists) return res.status(409).json({ error: 'Course already exists' });

  const course = new Course({ title, desc });
  await course.save();
  res.status(201).json(course);
});

app.delete('/courses/:title', async (req, res) => {
  const { title } = req.params;
  await Course.deleteOne({ title });
  const folder = path.join(__dirname, 'uploads', title);
  if (fs.existsSync(folder)) fs.rmSync(folder, { recursive: true, force: true });
  res.sendStatus(204);
});

app.get('/courses/:title/notes', async (req, res) => {
  const course = await Course.findOne({ title: req.params.title });
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json(course.notes);
});

app.post('/courses/:title/notes', upload.array('files'), async (req, res) => {
  const course = await Course.findOne({ title: req.params.title });
  if (!course) return res.status(404).json({ error: 'Course not found' });

  const uploadedNotes = req.files.map(file => ({
    name: file.originalname,
    path: `uploads/${req.params.title}/${file.originalname}`,
  }));

  course.notes.push(...uploadedNotes);
  await course.save();
  res.status(201).json(uploadedNotes);
});

app.delete('/courses/:title/notes/:name', async (req, res) => {
  const { title, name } = req.params;
  const course = await Course.findOne({ title });
  if (!course) return res.status(404).json({ error: 'Course not found' });

  course.notes = course.notes.filter(n => n.name !== name);
  await course.save();

  const filePath = path.join(__dirname, 'uploads', title, name);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  res.sendStatus(204);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
