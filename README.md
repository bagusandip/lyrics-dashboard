# 🎵 Lyrics Dashboard

Lyrics Dashboard adalah aplikasi web sederhana yang dibuat menggunakan Express.js, PostgreSQL, dan Tailwind CSS.

Aplikasi ini terintegrasi dengan API LRCLIB untuk mencari data lagu dan lirik, kemudian menyimpannya ke database PostgreSQL.

## ✨ Features

- 🔍 Search songs using LRCLIB API
- 🎵 Display song information
- 📝 Display song lyrics
- 💾 Save songs to PostgreSQL database
- 🗑️ Delete songs from collection
- 📖 Expand/collapse lyrics
- 📄 Pagination for song collection
- 🌙 Dark / Light mode
- 🔔 SweetAlert notifications
- 📱 Responsive UI with Tailwind CSS
- 🔌 REST API using Express.js
- 🗄️ PostgreSQL database
- 🧩 MVC project structure

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

## 📌 Roadmap

* [x] Search song from LRCLIB
* [x] Save song to PostgreSQL
* [x] Delete song
* [x] Tailwind CSS UI
* [x] Pagination

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
│   ├── index.html
│   ├── script.js
│   └── favicon.ico
├── db.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

## 🚀 Installation

Clone repository:

```bash
git clone https://github.com/bagusandip/lyrics-dashboard.git
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=dashboard1
```

Run application:

Open browser:

```text
http://localhost:3000
```

