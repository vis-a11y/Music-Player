const songs = [
    {
        title: "Kachaudi Gali",
        artist: "Rekha Bhardwaj, Utpal Udit",
        src: "songs/Kachaudi_Gali_Coke_Studio_Bharat.mp3",
        cover: "https://www.musiculture.in/wp-content/uploads/2023/02/Coke-Studio-806x800.jpeg"
    },
    {
        title: " mat kar maya ko ahankar ",
        artist: "Kabir Cafe",
        src: "songs/song2.mp3",
        cover: "https://images.genius.com/c9089267cb91d72df34768e3e9e57ac6.1000x1000x1.jpg"
    },
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTimeEl =
document.getElementById("current-time");

const durationEl =
document.getElementById("duration");

const playlist =
document.getElementById("playlist");

const coverImage =
document.getElementById("cover-image");

let currentSong = 0;
let isPlaying = false;

/* 
   INITIAL LOAD
 */

loadSong(currentSong);

/* 
   LOAD SONG
 */

function loadSong(index){

    const song = songs[index];

    title.textContent = song.title;
    artist.textContent = song.artist;

    audio.src = song.src;
    audio.load();

    coverImage.src = song.cover;

    updatePlaylist();
}

/* 
   PLAY SONG
 */

function playSong(){

    audio.play()
    .catch(err => console.log(err));

    isPlaying = true;

    playBtn.innerHTML = "⏸";

    coverImage.classList.add("playing");
}

/* 
   PAUSE SONG
 */

function pauseSong(){
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = "▶";
    coverImage.classList.remove("playing");
}

/* 
   PLAY / PAUSE
 */

playBtn.addEventListener("click", () => {

    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }

});

/* 
   NEXT SONG
 */

function nextSong(){
    currentSong =
    (currentSong + 1) % songs.length;
    loadSong(currentSong);
    playSong();
}

nextBtn.addEventListener(
    "click",
    nextSong
);

/* 
   PREVIOUS SONG
 */

function prevSong(){

    currentSong =
    (currentSong - 1 + songs.length)
    % songs.length;
    loadSong(currentSong);
    playSong();
}

prevBtn.addEventListener(
    "click",
    prevSong
);

/* 
   PROGRESS BAR UPDATE
 */

audio.addEventListener(
    "timeupdate",
    () => {

        if(audio.duration){
            const progressPercent =
            (audio.currentTime /
            audio.duration) * 100;
            progress.value =
            progressPercent;
        }
        currentTimeEl.textContent =
        formatTime(audio.currentTime);
    }
);

/* 
   DURATION
 */

audio.addEventListener(
    "loadedmetadata",
    () => {
        durationEl.textContent =
        formatTime(audio.duration);
    }
);

/* 
   SEEK SONG
 */

progress.addEventListener(
    "input",
    () => {
        if(audio.duration){
            audio.currentTime =
            (progress.value / 100)
            * audio.duration;
        }
    }
);

/* 
   VOLUME
 */

audio.volume = 1;
volume.addEventListener(
    "input",
    () => {
        const value =
        parseFloat(volume.value);
        audio.volume = value;
        const percent =
        value * 100;
        volume.style.background =
        `linear-gradient(
            to right,
            #1db954 0%,
            #1db954 ${percent}%,
            rgba(255,255,255,.2) ${percent}%,
            rgba(255,255,255,.2) 100%
        )`;
    }
);

/* Initial Volume Fill */

volume.dispatchEvent(
    new Event("input")
);

/* 
   AUTO NEXT SONG
 */

audio.addEventListener(
    "ended",
    () => {

        nextSong();
    }
);

/* 
   FORMAT TIME
 */

function formatTime(time){

    if(isNaN(time))
    return "0:00";
    const minutes =
    Math.floor(time / 60);
    const seconds =
    Math.floor(time % 60);
    return `${minutes}:${seconds
        .toString()
        .padStart(2,"0")}`;
}

/* =
   PLAYLIST
 */

songs.forEach(
    (song,index) => {
        const li =
        document.createElement("li");
        li.innerHTML = `
            <strong>${song.title}</strong>
            <br>
            <small>${song.artist}</small>
        `;
        li.addEventListener(
            "click",
            () => {
                currentSong = index;
                loadSong(currentSong);
                playSong();
            }
        );

        playlist.appendChild(li);
    }
);

/* 
   ACTIVE SONG
 */

function updatePlaylist(){

    const items =
    playlist.querySelectorAll("li");

    items.forEach(
        (item,index) => {

            item.classList.toggle(
                "active",
                index === currentSong
            );
        }
    );
}

/* 
   KEYBOARD SHORTCUTS
 */

document.addEventListener(
    "keydown",
    (e) => {

        if(
            e.target.tagName ===
            "INPUT"
        ) return;

        if(e.code === "Space"){

            e.preventDefault();

            if(isPlaying){
                pauseSong();
            }
            else{
                playSong();
            }
        }

        if(
            e.code === "ArrowRight"
        ){
            nextSong();
        }

        if(
            e.code === "ArrowLeft"
        ){
            prevSong();
        }
    }
);