const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/school", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Assignment Schema
const assignmentSchema = new mongoose.Schema({
  subjectTitle: String,
  subjectCode: String,
  title: String,
  description: String,
  file: String, // Storing file as Base64 (if needed)
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

// Route to add an assignment (Faculty)
app.post("/assignments", async (req, res) => {
  try {
    const { subjectTitle, subjectCode, title, description, file } = req.body;

    if (!subjectTitle || !subjectCode || !title) {
      return res
        .status(400)
        .json({
          message:
            "Subject Title, Subject Code, and Assignment Title are required!",
        });
    }

    const newAssignment = new Assignment({
      subjectTitle,
      subjectCode,
      title,
      description,
      file,
    });
    await newAssignment.save();

    res.status(201).json({ message: "Assignment uploaded successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// Route to get assignments (Student)
app.get("/assignments", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// Route to delete an assignment by ID
app.delete("/assignments/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid assignment ID" });
    }

    const deletedAssignment = await Assignment.findByIdAndDelete(id);

    if (!deletedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json({ message: "Assignment deleted successfully!" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
