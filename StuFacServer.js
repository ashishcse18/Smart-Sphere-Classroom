// appServer.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/smartSphere', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- Faculty Side: Test Creation ---

// Test Schema
const testSchema = new mongoose.Schema({
    subjectTitle: { type: String, required: true },
    subjectCode: { type: String, required: true },
    duration: { type: Number, required: true },
    questions: [{
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctOption: { type: String, required: true }
    }]
});

const Test = mongoose.model('Test', testSchema);

// Faculty: Create a new Test
app.post('/createTest', async (req, res) => {
    const { subjectTitle, subjectCode, duration, questions } = req.body;

    console.log('Received Test Data:', req.body);

    if (!questions || questions.length === 0) {
        return res.status(400).json({ error: 'Test must have at least one question' });
    }

    const newTest = new Test({
        subjectTitle,
        subjectCode,
        duration,
        questions
    });

    try {
        const savedTest = await newTest.save();
        res.status(201).json({ message: 'Test Created Successfully!', test: savedTest });
    } catch (error) {
        console.error('Error saving the test:', error);
        res.status(500).json({ error: 'Error saving the test' });
    }
});

// --- Student Side: Exam Fetching, Submission ---

// Exam Schema
const examSchema = new mongoose.Schema({
    subjectTitle: String,
    subjectCode: String,
    date: { type: Date, default: Date.now },
    questions: Array
});

const Exam = mongoose.model('Exam', examSchema);

// Mark Schema
const markSchema = new mongoose.Schema({
    studentName: String,
    examName: String,
    marks: Number,
    examId: mongoose.Schema.Types.ObjectId
});

const Mark = mongoose.model('Mark', markSchema);

// Student: Fetch all Exams
app.get('/api/exams/getExams', async (req, res) => {
    try {
        const exams = await Exam.find({});
        res.json(exams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ error: 'Error fetching exams' });
    }
});

// Student: Fetch Single Exam by ID
app.get('/api/exams/getExamById/:id', async (req, res) => {
    try {
      const exam = await Exam.findById(req.params.id);
      if (!exam) {
        return res.status(404).json({ error: 'Exam not found' });
      }
      res.json(exam);
    } catch (error) {
      console.error('Error fetching exam:', error);
      res.status(500).json({ error: 'Error fetching exam' });
    }
  });
  
// app.get('/api/exams/getExamById/:id', async (req, res) => {
//     try {
//         const exam = await Exam.findById(req.params.id);
//         if (!exam) {
//             return res.status(404).json({ error: 'Exam not found' });
//         }
//         res.json(exam);
//     } catch (error) {
//         console.error('Error fetching exam:', error);
//         res.status(500).json({ error: 'Error fetching exam' });
//     }
// });

// Student: Submit Marks
app.get('/api/exams/getExamById/:id', async (req, res) => {
    const examId = req.params.id;
    try {
        const exam = await db.collection('Testporta').findOne({ _id: new ObjectId(examId) });
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.json(exam);
    } catch (err) {
        console.error('Error fetching exam by ID:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ New Route: Fetch Exams from Test Collection (Using Mongoose Test model)
app.get('/api/getExamsFromDB', async (req, res) => {
    try {
        const exams = await Test.find({}); // Fetching all Tests
        res.json(exams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ error: 'Failed to fetch exams' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
