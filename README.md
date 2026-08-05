# 🎵 Lyrics Dashboard

Lyrics Dashboard adalah aplikasi web sederhana yang dibuat menggunakan Express.js, PostgreSQL, dan Tailwind CSS.

Aplikasi ini terintegrasi dengan API LRCLIB untuk mencari data lagu dan lirik, kemudian menyimpannya ke database PostgreSQL.

## ✨ Features

* Search song from LRCLIB API
* Save song to PostgreSQL
* Display saved songs
* Delete saved songs
* Responsive UI with Tailwind CSS

## 🛠️ Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Tailwind CSS
* JavaScript (Vanilla)

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

```bash
npm run dev
```

Open browser:

```text
http://localhost:3000
```

## 📌 Roadmap

* [x] Search song from LRCLIB
* [x] Save song to PostgreSQL
* [x] Delete song
* [x] Tailwind CSS UI
* [ ] Update song
* [ ] Search collection
* [ ] Pagination
* [ ] Authentication
* [ ] Dashboard statistics

## 📄 License

MIT License
