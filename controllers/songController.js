const axios = require("axios");
const songModel = require("../models/songModel");

async function getSongs(req, res) {
    try {
        const songs = await songModel.getAllSongs();
        res.json(songs);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Database Error",
        });
    }
}

async function searchSong(req, res) {
    try {
        const { track, artist } = req.query;

        const response = await axios.get(
            "https://lrclib.net/api/search",
            {
                params: {
                    track_name: track,
                    artist_name: artist,
                },
            }
        );

        res.json(response.data);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Gagal mengambil data",
        });
    }
}

async function saveSong(req, res) {
    try {
        const song = await songModel.insertSong(req.body);

        res.status(201).json({
            message: "Lagu berhasil disimpan",
            data: song,
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Gagal menyimpan lagu",
        });
    }
}

async function deleteSong(req, res) {

    try {

        await songModel.deleteSong(req.params.id);

        res.json({
            message: "Lagu berhasil dihapus"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Gagal menghapus lagu"
        });

    }

}

module.exports = {
    getSongs,
    searchSong,
    saveSong,
    deleteSong
};