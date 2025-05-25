# 📡 Real-time Text Sharing App

A lightweight, private, real-time text sharing platform powered by **WebSockets**.  
This app allows users to join private rooms and instantly share messages — great for quick collaboration without the clutter of full-blown chat apps.

---

## 🧠 Project Overview

This project is split into two parts:

- **Backend** – Node.js + TypeScript using `ws` WebSocket library
- **Frontend** – React + TypeScript using Tailwind CSS 

---

## ✨ Features

- 🔐 Private room-based messaging
- ✍️ Role-based access: `writer` (can send) & `reader` (can only receive)
- 💬 Real-time text sharing using WebSockets
- 📤 Lightweight in-memory room and client management (via JavaScript Maps)
- 🧹 Automatic room cleanup when all users leave

---

## 🧰 Tech Stack

### Backend
- Node.js
- TypeScript
- [`ws`](https://github.com/websockets/ws) – WebSocket server library

### Frontend
- React
- TypeScript
- Tailwind CSS

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/steath094/EzShare.git
cd EzShare
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the WebSocket Server

```bash
npm run dev
```

The WebSocket server will run at `ws://localhost:3000`.

---

## 🖥️ Frontend

The frontend is built using:

- ⚛️ **React + TypeScript** for component-based UI
- 🎨 **Tailwind CSS** for fast styling
- 🔐 Simple form to join/create a room and select role
- 💬 Live text input and display synced via WebSocket

The frontend connects to the backend via WebSocket and support:

- Room join via room code
- Role selection (reader or writer)
- Live message stream for readers

---



## 📌 To-Do

- [x] WebSocket server with room & role management
- [x] Real-time chat for writers → readers
- [x] Build React frontend (room join, messaging UI)
- [ ] Add typing indicator / feedback
- [ ] Add code formatted text box

---

## 📄 License

MIT License  
© 2025 Sameer Dawood Khan

---

## 🙌 Contributions

Contributions are welcome! Feel free to open issues or submit pull requests if you'd like to improve the project.
