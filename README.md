# 🎵 Lyrics Dashboard

Lyrics Dashboard adalah aplikasi web untuk mencari, menyimpan, dan mengelola data lagu serta lirik.

Aplikasi ini menggunakan **LRCLIB API** sebagai sumber data lagu dan lirik, kemudian menyimpan koleksi lagu ke **PostgreSQL**.

Project ini dibuat sebagai learning project untuk mempelajari integrasi REST API, database, MVC architecture, dan responsive web UI.

## ✨ Features

- 🔍 Search song from LRCLIB API
- 💾 Save song to PostgreSQL
- 📚 Display saved songs
- 🗑️ Delete saved songs
- 📝 Display song lyrics
- 📖 Expand / collapse lyrics
- 📄 Pagination
- 🌙 Dark / Light mode
- 🔄 Loading state
- 🔔 SweetAlert notifications
- 📱 Responsive UI
- 🎨 Tailwind CSS

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| Node.js | Runtime |
| Express.js | Backend / REST API |
| PostgreSQL | Database |
| Tailwind CSS | Frontend styling |
| JavaScript | Frontend logic |
| LRCLIB API | Song and lyrics data |
| SweetAlert2 | Notifications |
| Git & GitHub | Version control |

## 🎯 Learning Objectives

This project demonstrates practical implementation:

- REST API integration
- PostgreSQL database operations
- CRUD operations
- MVC architecture
- Pagination
- Async JavaScript
- Fetch API
- Responsive web design
- Tailwind CSS
- Git & GitHub workflow

## 📂 Project Structure

```text
Dashboard1/
├── controllers/
│   └── songController.js
├── models/
│   └── songModel.js
├── routes/
│   └── songs.js
├── public/
│   ├── css/
│   │   └── output.css
│   ├── index.html
│   ├── script.js
│   └── favicon.ico
├── db.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md