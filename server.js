const express = require("express");
const dotenv = require("dotenv");
const pool = require("./db");

dotenv.config();

const app = express();

app.use(express.json());

const songsRoute = require("./routes/songs");

app.use("/songs", songsRoute);

// Folder public
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});