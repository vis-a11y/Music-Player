const songs = [
    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        src: "songs/song1.mp3",
        cover:"https://images.genius.com/b987a0d3e07d6f10d3c434bfb69a651f.1000x1000x1.jpg"
    },
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        src: "songs/song2.mp3",
        cover: "https://i.pinimg.com/originals/49/47/ea/4947ea4f2af69d22b21411506d2eddf8.jpg"
    },
    {
        title: "Perfect",
        artist: "Ed Sheeran",
        src: "songs/song3.mp3",
        cover: "images/cover3.jpg"
    }
];

const audio = document.getElementById("audio");
const title=document.getElementById("title")
const artist = document.getElementById("artist")
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress=document.getElementById("progress")
const volume=document.getElementById("volume")


const currentTimeEl =
document.getElementById("current-time");

const durationEl =
document.getElementById("duration");

const playlist =
document.getElementById("playlist");

const coverImage =
document.getElementById("cover-image");

let currentSong=0;
let isPlaying = false;


loadSong(currentSong);


function loadSong(index){
    const song = songs[index];
    title.textcontent=song.title;
    artist.textContent=song.artist;
    audio.src=song.src;
    coverImage.src=song.cover;
    updatePlaylist();
}

function playSong(){
    audio.play();
    isPlaying=true;
    playBtn.innerHTML="⏸";
    coverImage.classList.add("playing");
}

function pauseSong(){
    audio.pause();
    isPlaying=false;
    playBtn.innerHTML= "▶";
    coverImage.classList.remove("playing");
}

playBtn.addEventListener("click", ()=>{
    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
    
});


function nextSong(){
    currentSong++;
    if(currentSong>= songs.length){
        currentSong=0;
    }
    loadSong(currentSong);
    playSong();
}

nextBtn.addEventListener("click",nextSong);


function prevSong(){

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

    playSong();
}

prevBtn.addEventListener("click", prevSong);



audio.addEventListener("timeupdate",()=>{
    const progressPrecent=(audio.currentTime/audio.duration)*100;
    progress.value=progressPrecent||0;
    currentTimeEl.textContent=formatTime(audio.currentTime);
})


audio.addEventListener("loadedmetadata", () => {

    durationEl.textContent =
    formatTime(audio.duration);
});


progress.addEventListener("input", () => {

    audio.currentTime =
    (progress.value / 100) *
    audio.duration;
});



volume.addEventListener("input", () => {

    audio.volume = volume.value;
});

// Default Volume

audio.volume = 1;


audio.addEventListener("ended",()=>{
    nextSong();
})


function formatTime(time){

    if(isNaN(time)) return "0:00";

    const minutes =
    Math.floor(time / 60);

    const seconds =
    Math.floor(time % 60);

    return `${minutes}:${seconds
        .toString()
        .padStart(2,"0")}`;
}




songs.forEach((song,index)=>{

    const li =
    document.createElement("li");

    li.innerHTML = `
        <strong>${song.title}</strong><br>
        <small>${song.artist}</small>
    `;

    li.addEventListener("click",()=>{

        currentSong = index;
        loadSong(currentSong);

        playSong();
    });

    playlist.appendChild(li);
});



function updatePlaylist(){

    const items =
    playlist.querySelectorAll("li");

    items.forEach((item,index)=>{

        item.classList.toggle(
            "active",
            index === currentSong
        );
    });
}




document.addEventListener("keydown",(e)=>{

    if(e.code === "Space"){

        e.preventDefault();

        if(isPlaying){
            pauseSong();
        }
        else{
            playSong();
        }
    }

    if(e.code === "ArrowRight"){
        nextSong();
    }


    if(e.code === "ArrowLeft"){
        prevSong();
    }
});