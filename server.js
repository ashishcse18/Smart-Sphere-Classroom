const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 2000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/school', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => {
    console.log("✅ MongoDB Connected...");
});

// Define Schema
const eventSchema = new mongoose.Schema({
    date: Date,
    desc: String
});
const Events = mongoose.model("events", eventSchema);

// API to insert data
app.post('/post', async (req, res) => {
    try {
        const { date, desc } = req.body;
        const formattedDate = new Date(date);
        formattedDate.setUTCHours(0, 0, 0, 0); 

        const event = new Events({ date: formattedDate, desc });
        await event.save();

        res.json({ message: "✅ Schedule added!", event });
    } catch (error) {
        res.status(500).json({ message: "❌ Error saving schedule." });
    }
});

// API to fetch events
app.get('/events', async (req, res) => {
    try {
        const events = await Events.find().sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "❌ Error fetching events" });
    }
});

// API to delete an event
app.delete('/delete/:id', async (req, res) => {
    try {
        await Events.findByIdAndDelete(req.params.id);
        res.json({ message: "🗑 Schedule deleted!" });
    } catch (error) {
        res.status(500).json({ message: "❌ Error deleting schedule" });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
