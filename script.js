console.log("Welcome to Spotify");
let songIndex=0;
let audioElement = new Audio ('absongs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "If We Have Each Other", filePath:"abSongs/1.mp3", coverPath: "songcover/1.jpg"},
    {songName: "Water Fountain", filePath:"abSongs/2", coverPath: "songcover/2.jpg"},
    {songName: "Let Me Down Slowly", filePath:"abSongs/3.mp3", coverPath: "songcover/3.jpg"},
    {songName: "Mind Is A Prison", filePath:"abSongs/4.mp3", coverPath: "songcover/4.jpg"},
    {songName: "Demons", filePath:"abSongs/5.mp3", coverPath: "songcover/5.jpg"},
    {songName: "Must Have Been The Wind", filePath:"abSongs/6.mp3", coverPath: "songcover/6.jpg"}
]

songItems.forEach((element,i)=>{
    
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//audioElement.play();
//muted="muted";

//Handle play-pause click
masterPlay.addEventListener('click',()=>{
    if (audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `abSongs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=5){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    makeAllPlays();
    
    audioElement.src = `abSongs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('prev').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 5;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `abSongs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})