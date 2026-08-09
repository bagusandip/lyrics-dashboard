let currentPage = 1;
const songsPerPage = 10;

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
            result.innerHTML = `
<p class="text-center text-slate-500 dark:text-slate-400 py-5">
    Lagu tidak ditemukan.
</p>
`;
            return;
        }

        const song = songs[0];
selectedSong = song;

result.innerHTML = `
<div class="border border-slate-300 dark:border-slate-700 rounded-xl p-6">

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
if (response.status === 409) {

    Swal.fire({
        icon: "info",
        title: "Lagu Sudah Ada",
        text: result.message,
        confirmButtonText: "OK"
    });

    return;
}


if (!response.ok) {

    Swal.fire({
        icon: "error",
        title: "Gagal",
        text: result.message || "Gagal menyimpan lagu."
    });

    return;
}


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

    const response = await fetch(
        `/songs?page=${currentPage}&limit=${songsPerPage}`
    );

    const result = await response.json();

    const songs = result.data;

    const songList = document.getElementById("songList");

    songList.innerHTML = "";


    if (songs.length === 0) {

        songList.innerHTML = `
            <div class="text-center text-slate-400 dark:text-slate-500 py-10">
                Belum ada lagu disimpan.
            </div>
        `;

        return;
    }


    songs.forEach(song => {

        songList.innerHTML += `

        <div class="border border-slate-300 dark:border-slate-700
                    rounded-xl p-5 mb-4
                    hover:shadow-xl
                    transition-all duration-300">

            <div class="flex items-center justify-between gap-4">

                <div class="flex items-center gap-4 flex-1">

                    <div class="text-4xl">
                        🎵
                    </div>

                    <div>

                        <h3 class="font-bold text-xl
                                   text-slate-800 dark:text-white">

                            ${song.track_name}

                        </h3>

                        <p class="text-slate-600 dark:text-slate-300 mt-1">

                            ${song.artist_name}

                        </p>

                        <p class="text-sm text-slate-400 dark:text-slate-500 mt-2">

                            ${song.album_name || "Unknown"}

                        </p>

                    </div>

                </div>


                <div class="flex items-center gap-3">

                    <button
                        class="expand-btn
                               text-slate-500
                               dark:text-slate-400
                               hover:text-blue-500
                               text-2xl
                               transition"
                        data-id="${song.id}">

                        ▼

                    </button>


                    <button
                        class="delete-btn
                               bg-red-500
                               hover:bg-red-600
                               text-white
                               w-10
                               h-10
                               rounded-lg
                               transition"
                        data-id="${song.id}">

                        🗑

                    </button>

                </div>

            </div>


            <div
                id="lyrics-${song.id}"
                class="hidden mt-5 pt-5
                       border-t
                       border-slate-300
                       dark:border-slate-700">

                <h4 class="font-semibold
                           text-slate-800
                           dark:text-white
                           mb-4">

                    🎵 Lyrics

                </h4>

                <div class="max-h-96
                            overflow-y-auto
                            whitespace-pre-line
                            leading-7
                            text-slate-600
                            dark:text-slate-300
                            bg-slate-50
                            dark:bg-slate-900
                            rounded-lg
                            p-5">

                    ${song.plain_lyrics || "Lirik tidak tersedia."}

                </div>

            </div>

        </div>

        `;

    });


    // DELETE

    document.querySelectorAll(".delete-btn").forEach(button => {

        button.addEventListener("click", () => {

            deleteSong(button.dataset.id);

        });

    });


    // EXPAND LYRICS

    document.querySelectorAll(".expand-btn").forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.id;

            const lyrics =
                document.getElementById(`lyrics-${id}`);

            lyrics.classList.toggle("hidden");


            if (lyrics.classList.contains("hidden")) {

                button.innerHTML = "▼";

            } else {

                button.innerHTML = "▲";

            }

        });

    });
    renderPagination(
    result.totalPages,
    result.total
);

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

function renderPagination(totalPages, total) {

    const pagination = document.getElementById("pagination");

    if (totalPages <= 1) {

        pagination.innerHTML = `
            <p class="text-center text-sm text-slate-400 dark:text-slate-500">
                ${total} song${total !== 1 ? "s" : ""}
            </p>
        `;

        return;
    }


    let buttons = "";


    // Previous

    buttons += `
        <button
            id="prevPage"
            class="px-4 py-2 rounded-lg
                   bg-slate-200 dark:bg-slate-700
                   text-slate-700 dark:text-white
                   hover:bg-slate-300 dark:hover:bg-slate-600
                   disabled:opacity-40
                   disabled:cursor-not-allowed"
            ${currentPage === 1 ? "disabled" : ""}>

            ← Previous

        </button>
    `;


    // Nomor halaman

    for (let i = 1; i <= totalPages; i++) {

        buttons += `
            <button
                class="page-btn px-4 py-2 rounded-lg
                       ${i === currentPage
                            ? "bg-blue-600 text-white"
                            : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600"
                       }"
                data-page="${i}">

                ${i}

            </button>
        `;

    }


    // Next

    buttons += `
        <button
            id="nextPage"
            class="px-4 py-2 rounded-lg
                   bg-slate-200 dark:bg-slate-700
                   text-slate-700 dark:text-white
                   hover:bg-slate-300 dark:hover:bg-slate-600
                   disabled:opacity-40
                   disabled:cursor-not-allowed"
            ${currentPage === totalPages ? "disabled" : ""}>

            Next →

        </button>
    `;


    pagination.innerHTML = `

        <div class="text-center text-sm
                    text-slate-400 dark:text-slate-500 mb-4">

            Showing page ${currentPage} of ${totalPages}
            · ${total} songs

        </div>

        <div class="flex justify-center items-center gap-2 flex-wrap">

            ${buttons}

        </div>

    `;


    // Previous

    document
        .getElementById("prevPage")
        .addEventListener("click", () => {

            if (currentPage > 1) {

                currentPage--;

                loadSongs();

            }

        });


    // Next

    document
        .getElementById("nextPage")
        .addEventListener("click", () => {

            if (currentPage < totalPages) {

                currentPage++;

                loadSongs();

            }

        });


    // Page number

    document.querySelectorAll(".page-btn").forEach(button => {

        button.addEventListener("click", () => {

            currentPage = parseInt(button.dataset.page);

            loadSongs();

        });

    });

}

// Saat tombol diklik
themeToggle.addEventListener("click", () => {

    console.log("Button clicked");

    document.documentElement.classList.toggle("dark");

    console.log(document.documentElement.className);

    if (document.documentElement.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");
        themeToggle.innerHTML = "☀️ Light Mode";

    } else {

        localStorage.setItem("theme", "light");
        themeToggle.innerHTML = "🌙 Dark Mode";

    }

});

loadSongs();