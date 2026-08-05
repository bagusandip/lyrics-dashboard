const pool = require("../db");

async function getAllSongs() {
    const result = await pool.query(
        "SELECT * FROM songs ORDER BY id DESC"
    );

    return result.rows;
}

async function insertSong(song) {
    const {
        track_name,
        artist_name,
        album_name,
        duration,
        plain_lyrics,
        synced_lyrics,
    } = song;

    const result = await pool.query(
        `INSERT INTO songs
        (track_name, artist_name, album_name, duration, plain_lyrics, synced_lyrics)
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *`,
        [
            track_name,
            artist_name,
            album_name,
            duration,
            plain_lyrics,
            synced_lyrics,
        ]
    );

    return result.rows[0];
}

module.exports = {
    getAllSongs,
    insertSong,
};

async function deleteSong(id) {

    await pool.query(
        "DELETE FROM songs WHERE id = $1",
        [id]
    );

}

module.exports = {
    getAllSongs,
    insertSong,
    deleteSong
};