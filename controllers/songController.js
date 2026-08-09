const axios = require("axios");
const songModel = require("../models/songModel");

// async function getSongs(req, res) {
//     try {
//         const songs = await songModel.getAllSongs();
//         res.json(songs);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             message: "Database Error",
//         });
//     }
// }

async function getSongs(req, res) {

    try {

        const page = parseInt(req.query.page) || 1;

        const limit = parseInt(req.query.limit) || 10;


        const result =
            await songModel.getSongsPaginated(page, limit);


        res.json(result);

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

        const result = await songModel.insertSong(req.body);


        if (result.duplicate) {

            return res.status(409).json({

                message: "Lagu sudah ada di My Collection."

            });

        }


        res.json({

            message: "Lagu berhasil disimpan.",

            song: result.song

        });


    } catch (err) {

        console.error(err);

        res.status(500).json({

            message: "Database Error"

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