const pool = require("../db");


// =========================
// GET ALL SONGS
// =========================

async function getAllSongs() {

    const result = await pool.query(
        "SELECT * FROM songs ORDER BY id DESC"
    );

    return result.rows;

}


// =========================
// GET SONGS PAGINATION
// =========================

async function getSongsPaginated(page, limit) {

    const offset = (page - 1) * limit;


    // Ambil data sesuai halaman

    const result = await pool.query(
        `
        SELECT *
        FROM songs
        ORDER BY id DESC
        LIMIT $1
        OFFSET $2
        `,
        [limit, offset]
    );


    // Hitung jumlah seluruh lagu

    const countResult = await pool.query(
        "SELECT COUNT(*) FROM songs"
    );


    const total = parseInt(countResult.rows[0].count);

    const totalPages = Math.ceil(total / limit);


    return {

        data: result.rows,

        page: page,

        limit: limit,

        total: total,

        totalPages: totalPages

    };

}


// =========================
// INSERT SONG
// =========================

async function insertSong(song) {

    const {
        track_name,
        artist_name,
        album_name,
        duration,
        plain_lyrics,
        synced_lyrics,
    } = song;


    // Cek apakah lagu sudah ada

    const existingSong = await pool.query(
        `
        SELECT id
        FROM songs
        WHERE LOWER(track_name) = LOWER($1)
        AND LOWER(artist_name) = LOWER($2)
        `,
        [
            track_name,
            artist_name
        ]
    );


    if (existingSong.rows.length > 0) {

        return {
            duplicate: true,
            song: existingSong.rows[0]
        };

    }


    // Kalau belum ada, simpan

    const result = await pool.query(
        `
        INSERT INTO songs
        (
            track_name,
            artist_name,
            album_name,
            duration,
            plain_lyrics,
            synced_lyrics
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *
        `,
        [
            track_name,
            artist_name,
            album_name,
            duration,
            plain_lyrics,
            synced_lyrics,
        ]
    );


    return {
        duplicate: false,
        song: result.rows[0]
    };

}


// =========================
// DELETE SONG
// =========================

async function deleteSong(id) {

    await pool.query(
        "DELETE FROM songs WHERE id = $1",
        [id]
    );

}


// =========================
// EXPORT
// =========================

module.exports = {

    getAllSongs,

    getSongsPaginated,

    insertSong,

    deleteSong

};