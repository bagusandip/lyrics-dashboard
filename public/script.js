let selectedSong = null;
const btnSearch = document.getElementById("searchBtn");

btnSearch.addEventListener("click", searchSong);

async function searchSong() {

    const track = document.getElementById("track").value.trim();
    const artist = document.getElementById("artist").value.trim();

    if (!track || !artist) {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Track dan Artist harus diisi."
        });
        return;
    }

    const result = document.getElementById("result");

    btnSearch.disabled = true;
    btnSearch.innerHTML = "Searching...";

    result.innerHTML = `
    <div class="flex justify-center py-10">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
    </div>
    `;

    try {

        const response = await fetch(
            `/songs/search?track=${encodeURIComponent(track)}&artist=${encodeURIComponent(artist)}`
        );

        const songs = await response.json();

        if (songs.length === 0) {
            result.innerHTML = "<p>Lagu tidak ditemukan.</p>";
            return;
        }

        const song = songs[0];
selectedSong = song;

result.innerHTML = `
<div class="border rounded-xl p-6">

    <h2 class="text-2xl font-bold text-slate-800 dark:text-white">
        ${song.trackName}
    </h2>

    <p class="text-gray-600 dark:text-gray-300 mt-2">
        ${song.artistName}
    </p>

    <p class="text-gray-400 dark:text-gray-500">
        ${song.albumName}
    </p>

    <button
        id="saveBtn"
        class="mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg">

        💾 Simpan ke Database

    </button>

</div>
`;

document
    .getElementById("saveBtn")
    .addEventListener("click", saveSong);

    } catch (err) {

        console.error(err);

        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Gagal mengambil data lagu."
        });

    } finally {

        btnSearch.disabled = false;
        btnSearch.innerHTML = "🔍 Cari Lagu";

    }

}

async function saveSong() {

    if (!selectedSong) return;

    const response = await fetch("/songs", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            track_name: selectedSong.trackName,
            artist_name: selectedSong.artistName,
            album_name: selectedSong.albumName,
            duration: selectedSong.duration,

            plain_lyrics: selectedSong.plainLyrics,

            synced_lyrics: selectedSong.syncedLyrics

        })

    });

    const result = await response.json();

    Swal.fire({
    icon: "success",
    title: "Berhasil",
    text: result.message,
    timer: 1500,
    showConfirmButton: false
});
    loadSongs();

}

async function loadSongs() {

    const response = await fetch("/songs");

    const songs = await response.json();

    const songList = document.getElementById("songList");

    // Kosongkan isi sebelumnya
    songList.innerHTML = "";

    songs.forEach(song => {

        songList.innerHTML += `
<div class="border rounded-xl p-5 mb-4 hover:shadow-lg transition">

    <div class="flex justify-between items-start">

        <div>

            <h3 class="font-bold text-lg">
                ${song.track_name}
            </h3>

            <p class="text-gray-600 dark:text-gray-300">
                ${song.artist_name}
            </p>

            <p class="text-sm text-gray-400 dark:text-gray-500 mt-2">
                ${song.album_name}
            </p>

        </div>

        <button
    class="delete-btn bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
    data-id="${song.id}">
    🗑
</button>

    </div>

</div>
`;

    });
    document.querySelectorAll(".delete-btn").forEach(button => {

    button.addEventListener("click", () => {

        deleteSong(button.dataset.id);

    });

});

}

async function deleteSong(id) {

    const confirmDelete = await Swal.fire({
        title: "Hapus lagu?",
        text: "Data yang dihapus tidak dapat dikembalikan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal"
    });

    if (!confirmDelete.isConfirmed) return;

    const response = await fetch(`/songs/${id}`, {
        method: "DELETE"
    });

    const result = await response.json();

    Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: result.message,
        timer: 1500,
        showConfirmButton: false
    });

    loadSongs();
}

const themeToggle = document.getElementById("themeToggle");

// Saat halaman dibuka
if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
    themeToggle.innerHTML = "☀️ Light Mode";
}

// Saat tombol diklik
themeToggle.addEventListener("click", () => {

    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");
        themeToggle.innerHTML = "☀️ Light Mode";

    } else {

        localStorage.setItem("theme", "light");
        themeToggle.innerHTML = "🌙 Dark Mode";

    }

});

loadSongs();