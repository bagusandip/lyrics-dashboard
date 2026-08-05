const express = require("express");
const router = express.Router();

const songController = require("../controllers/songController");

router.get("/", songController.getSongs);

router.get("/search", songController.searchSong);

router.post("/", songController.saveSong);

router.delete("/:id", songController.deleteSong);

module.exports = router;