# 💬 AI Chat Application — Real-Time AI Streaming

[![Node.js](https://img.shields.io/badge/Node.js-v24-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![OpenAI SDK](https://img.shields.io/badge/OpenAI-SDK-412991?logo=openai&logoColor=white)](https://platform.openai.com/)
[![Cerebras](https://img.shields.io/badge/Powered%20by-Cerebras-FF6B00)](https://www.cerebras.ai/)

## 📖 Overview

This project is a full-stack AI Chat Application developed during the **Devzey Summer Internship 2026**. It provides a ChatGPT-like experience where AI responses are streamed in real time instead of waiting for the complete answer.

The application consists of a React frontend and an Express backend connected to the Cerebras AI API using the OpenAI SDK.

---

# ✨ Features

- 💬 Real-time AI response streaming
- ⚡ Token-by-token output (ChatGPT-like experience)
- 🧠 AI integration using Cerebras API
- 🔒 Backend input validation and sanitization
- 🎛️ Adjustable Temperature parameter
- 🧩 Adjustable Reasoning Effort parameter
- 🚀 React + Vite frontend
- 🌐 Express.js REST API
- ❌ Error handling on both frontend and backend
- 🎨 Modern responsive chat interface

---

# 🛠️ Technologies Used

## Frontend

- React 19
- Vite
- JavaScript
- CSS

## Backend

- Node.js
- Express.js
- OpenAI SDK
- Cerebras AI API
- dotenv

---

# 📁 Project Structure

```text
chat-app_task7/
│
├── chat-backend/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── chat-frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── screenshots/
│
├── temperature&reasoning_notes.docx
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend Setup

```bash
cd chat-backend

npm install
```

Create a `.env` file

```env
PORT=5000

CEREBRAS_API_KEY=YOUR_API_KEY

CEREBRAS_BASE_URL=YOUR_BASE_URL
```

Start backend

```bash
node server.js
```

---

## Frontend Setup

```bash
cd chat-frontend

npm install

npm run dev
```

Open

```
http://localhost:5173
```

---

# 🔄 Streaming Workflow

1. User enters a prompt.
2. Frontend sends request to Express backend.
3. Backend validates user input.
4. Cerebras AI is called using the OpenAI SDK.
5. AI returns streamed tokens.
6. Backend forwards each token immediately.
7. Frontend updates the chat window live.
8. User sees the response appear progressively.

---

# 🧪 Temperature & Reasoning Experiment

This project includes experiments comparing different values of:

- Temperature
- Reasoning Effort

The complete observations are documented in:

```
temperature&reasoning_notes.docx
```

---

# 📸 Screenshots

The `screenshots` folder contains:

- Application UI
- Streaming conversation
- AI responses
- Successful execution

---

# 📚 Learning Outcomes

- React Fundamentals
- Express REST APIs
- Streaming Responses
- Async Iterators
- Fetch Streams API
- Environment Variables
- API Integration
- AI Prompt Engineering
- Error Handling
- Client-Server Communication

---

# 👩‍💻 Developed For

**Devzey Summer Internship 2026**

Task 7 – AI Chat Application