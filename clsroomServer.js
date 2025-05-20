const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/school', { useNewUrlParser: true, useUnifiedTopology: true });

const noteSchema = new mongoose.Schema({
  name: String,
  path: String
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
  notes: [noteSchema]
});

const Course = mongoose.model('Course', courseSchema);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const courseFolder = path.join(__dirname, 'uploads', req.params.title);
    fs.mkdirSync(courseFolder, { recursive: true });
    cb(null, courseFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Routes

// Get all courses (sorted by date)
app.get('/courses', async (req, res) => {
  const courses = await Course.find().sort({ date: -1 });
  res.json(courses);
});

// Create a new course
app.post('/courses', async (req, res) => {
  const { title, description } = req.body;
  const course = new Course({ title, description });
  await course.save();
  res.status(201).json(course);
});

// Upload notes for a course
app.post('/courses/:title/notes', upload.array('files'), async (req, res) => {
  const { title } = req.params;
  const course = await Course.findOne({ title });
  if (!course) return res.status(404).json({ error: 'Course not found' });

  const notes = req.files.map(file => ({
    name: file.originalname,
    path: `uploads/${title}/${file.originalname}`
  }));

  course.notes.push(...notes);
  await course.save();
  res.status(201).json(notes);
});

// Get notes of a course
app.get('/courses/:title/notes', async (req, res) => {
  const { title } = req.params;
  const course = await Course.findOne({ title });
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json(course.notes);
});

// Delete a note from a course
app.delete('/courses/:title/notes/:name', async (req, res) => {
  const { title, name } = req.params;
  const course = await Course.findOne({ title });
  if (!course) return res.status(404).json({ error: 'Course not found' });

  course.notes = course.notes.filter(note => note.name !== name);
  await course.save();

  const filePath = path.join(__dirname, 'uploads', title, name);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Classroom Folder Server running at http://localhost:${PORT}`);
});
