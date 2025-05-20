# 🎓 Smart Sphere Classroom

**Smart Sphere Classroom** is an intelligent, AI-integrated Learning Management System (LMS) developed to transform the traditional online education experience. Built with modern web technologies and AI, it offers an all-in-one platform for students and faculty to communicate, collaborate, and achieve academic success efficiently.

---

## 🚀 Features

- ✅ **User Authentication & Role-Based Access** (Student / Faculty)
- 🤖 **Gen Flash AI 2.0 Chatbot** – Real-time academic support using NLP
- 📝 **Assignment Management** – Upload, submit, and track assignments
- 📊 **Auto Test Evaluation** – Instant grading and analytics for quizzes/tests
- 🗂 **Classroom Folders** – Organized course material repository
- 📅 **Event Calendar & Notifications** – Scheduled task reminders via Email.js
- 🧮 **GPA/CGPA Calculator** – Helps students track academic progress
- 🎮 **Gamified Quiz Engine** – Fun, interactive quiz games
- 📚 **Course Enrollment & Certification** – Structured course learning

---

## 🛠️ Tech Stack

### 🌐 Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Responsive UI for smooth user experience

### 🧠 Backend
- Node.js
- Express.js

### 🗄️ Database
- MongoDB (with GridFS for file storage)

### ✉️ Notifications
- Email.js for task reminders and alerts

### 🤖 AI Integration
- Gen Flash AI 2.0 for chatbot functionality

---

## 📂 Project Structure

```bash
SmartSphereClassroom/
├── client/                 # HTML/CSS/JS Frontend
├── server/                 # Node.js + Express backend
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   └── models/             # MongoDB schemas
├── public/                 # Static assets
├── chatbot/                # Gen Flash AI integration
├── .env                    # Environment variables
└── README.md
🔐 Authentication
JSON Web Token (JWT) used for secure session management

Role-based dashboards (student/faculty/admin)

📈 How It Works
Users sign in and land on personalized dashboards

Students can:

View tasks and upcoming exams

Ask the chatbot subject-related questions

Play quiz games and calculate GPA

Faculty can:

Upload notes and assignments

Schedule tests and set reminders

Track student performance via dashboards

📦 Installation
bash
Copy
Edit
# 1. Clone the repository
git clone https://github.com/your-username/SmartSphereClassroom.git

# 2. Navigate to project folder
cd SmartSphereClassroom

# 3. Install server dependencies
cd server
npm install

# 4. Run the server
npm start

# 5. Open client/index.html in browser or host via live server
Ensure MongoDB is running locally or provide your MongoDB URI in .env

📮 Future Improvements
Mobile app version (React Native or Flutter)

Admin panel for advanced control

Integration with external learning APIs (e.g., Coursera, Udemy)

Performance analytics dashboard

Multilingual chatbot interface

👨‍💻 Developed By
Ashish Kumar Yadav

Ginni Sinha

Karunamoorthy S

Kavya O

In partial fulfillment of the degree B.E. Computer Science and Engineering
Agni College of Technology, Chennai – May 2025

📄 License
This project is licensed under the MIT License
