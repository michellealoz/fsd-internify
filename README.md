# 🚀 Internify

**Full-Stack Internship Management Portal**  
A Semester 4 Full Stack Development Project

---

## 📌 Problem Statement

To streamline the internship process for students, faculty, and administrators by offering a unified platform for applying, tracking, and evaluating internships efficiently.

---

## 🎯 Objective

**Internify** aims to bridge the gap between students and internship opportunities, enabling admin oversight, application tracking, SDG/PO/PEO tagging, and progress monitoring through a scalable full-stack web app.

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### 🔹 Backend
- Node.js
- Express.js

### 🔹 Database
- MongoDB (via Mongoose)

---

## ✨ Key Features

- 👥 **User Roles**: Admin, PEO/PO/SDG Coordinator, Student
- 🔐 **Authentication**: Login/Registration with role-based access
- 📄 **Internship Applications**: Submit, view, and track applications
- 🧮 **Progress Tracking**: Current stage, remarks, and last updated timestamp
- 🏷️ **PO/PEO/SDG Mapping**: Associate learning outcomes with real internships
- 🧠 **Filtering & Matching**: AI-based volunteer-NGO match (optional future scope)
- 💡 **Responsive UI**: Mobile-friendly, clean dashboard design

---

## 📽️ Demo Video

🎬 **[Watch the Demo on Google Drive](https://drive.google.com/drive/folders/1XJKZv99jeVvCSfmUW0McXiYxTDQTKjxE?usp=drive_link)**



## 📸 Screenshots



## 🧪 How to Run the Project

### 📦 Prerequisites

- Node.js v18+  
- MongoDB (Atlas or local)  
- `.env` file for secrets (Mongo URI, JWT secret, etc.)




### ⚙️ Local Setup
# Step 1: Clone the repository
git clone https://github.com/YourUsername/fsd-internify.git
cd fsd-internify

# Step 2: Setup Backend
cd backend
npm install
# Create a .env file and add Mongo URI + JWT_SECRET
npm run dev

# Open a new PowerShell tab or split terminal for frontend

# Step 3: Setup Frontend
cd ../frontend
npm install
npm run dev
