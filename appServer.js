const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importing CORS middleware

const app = express();

// Middleware to handle JSON requests and enable CORS
app.use(cors());  // Allow cross-origin requests
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/smartSphere', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the Test Schema

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
module.exports = Test;

// POST endpoint to create a new test
app.post('/createTest', async (req, res) => {
    const { subjectTitle, subjectCode, duration, questions } = req.body;

    console.log('Received Test Data:', req.body);  // Log the received data

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


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
