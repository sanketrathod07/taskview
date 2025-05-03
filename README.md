# 🗂️ TaskFlow - Project and Task Management Application

TaskFlow is a full-stack web application designed to help users efficiently manage their projects and tasks. It offers robust features such as real-time task tracking, progress monitoring, and user authentication — all packed into a responsive and user-friendly UI.

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🛠 Technologies Used](#-technologies-used)
- [⚙️ Installation](#️-installation)
- [🚀 Usage](#-usage)
- [📡 API Endpoints](#-api-endpoints)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

- ✅ **Project Management** – Create, edit, and delete projects.
- ✅ **Task Tracking** – Manage tasks with status updates (To Do, In Progress, Done).
- ✅ **Progress Monitoring** – Visualize task completion and stats per project.
- ✅ **User Authentication** – Register, login, logout, and manage profiles securely.
- 🌙 **Dark Mode** – Seamless toggle between light and dark themes.
- 📱 **Responsive Design** – Works great on mobile, tablet, and desktop.

---

## 🛠 Technologies Used

### 🌐 Frontend

- **React** – UI library for building components.
- **TypeScript** – Type-safe JavaScript.
- **React Router** – Declarative routing.
- **Framer Motion** – Smooth animations.
- **React Query** – Server state management.
- **Tailwind CSS** – Utility-first styling.

### 🧠 Backend

- **Node.js** – Server-side JavaScript.
- **Express.js** – Web server framework.
- **MongoDB** – NoSQL database.
- **Mongoose** – MongoDB ODM.
- **JWT** – Authentication via JSON Web Tokens.

---

## ⚙️ Installation

### 📋 Prerequisites

- Node.js (v16 or later)
- MongoDB (local or cloud via MongoDB Atlas)

### 🧪 Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/taskflow.git
   cd taskflow
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   Create a `.env` file in the root directory and add:

   ```env
   PORT=8000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskflow
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the development client**:

   ```bash
   npm run dev
   ```

5. **Start the backend server**:

   ```bash
   npm run server
   ```

---

## 🚀 Usage

### 📊 Dashboard

- View all active projects and overall stats.
- Create up to 4 personal projects.

### 📁 Project Page

- View all tasks categorized as:
  - ✅ To Do
  - 🔄 In Progress
  - ✅ Done
- Add, edit, or delete tasks.

### 👤 Profile Page

- Update user profile details.
- Change your password.

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| POST   | /auth/register | Register a new user    |
| POST   | /auth/login    | Login a user           |
| POST   | /auth/logout   | Logout current session |
| GET    | /auth/me       | Get current user info  |

### 📁 Projects

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| GET    | /projects     | Fetch all projects         |
| GET    | /projects/:id | Fetch project by ID        |
| POST   | /projects     | Create a new project       |
| PUT    | /projects/:id | Update an existing project |
| DELETE | /projects/:id | Delete a project           |

### ✅ Tasks

| Method | Endpoint                   | Description                 |
| ------ | -------------------------- | --------------------------- |
| GET    | /projects/:projectId/tasks | Get all tasks for a project |
| POST   | /projects/:projectId/tasks | Create a new task           |
| PUT    | /tasks/:taskId             | Update a task               |
| DELETE | /tasks/:taskId             | Delete a task               |

---

## 🤝 Contributing

Contributions are what make open source such an amazing place to learn and grow. Feel free to fork the project and submit a PR:

1. **Fork the repository**.

2. **Create a new branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit your changes**:

   ```bash
   git commit -m "Add your message here"
   ```

4. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**.

---

## 📄 License

This project is licensed under the MIT License. Feel free to use it for personal or commercial projects — just give credit where it’s due.

Made with 💡 by Sanket H. Rathod
