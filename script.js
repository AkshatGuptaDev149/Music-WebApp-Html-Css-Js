console.log('welcome to our music app')

//Initialising the variables

var songIndex=0;
let MasterPlayBtn=document.getElementById('MasterPlay');
let ProgressBar=document.getElementById('ProgressBar');
let loopBtn=document.getElementById('loop');
let songItem=Array.from(document.getElementsByClassName('songItem'));
let NumberOfSongItems=songItem.length
let BottomLine=document.getElementById('songInfo');
let songs=[
    {songName:'Bleach OST Treachery',filePath:'songs/Aizen theme.mp3',coverPath:'coverImages/cover1.png'},
    {songName:'Bleach OST Number one ones else',filePath:'songs/Number one ones else.mp3',coverPath:'coverImages/cover1.png'},
    {songName:'Bleach OST Cometh of the hour B',filePath:'songs/Ichigo vs Ginjo Theme Song.mp3',coverPath:'coverImages/cover1.png'},
    {songName:'Ainsi bas la vida',filePath:'songs/Ainsi bas la vida.mp3',coverPath:'coverImages/cover3.jpg'},
    {songName:'Dragon Ball Z - Cha La Head Cha La',filePath:'songs/Dragon Ball Z - Cha La Head Cha La.mp3',coverPath:'coverImages/cover2.png'},
    {songName:'Bleach OST Cokkaku',filePath:'songs/Bleach OST chokkaku.mp3',coverPath:'coverImages/cover1.png'},
    {songName:'Bleach TYBW-Scar',filePath:'songs/Bleach TYBW scar.mp3',coverPath:'coverImages/cover4.png'},
    {songName:'Bleach TYBW-Rapport',filePath:'songs/Bleach TYBW rapport.mp3',coverPath:'coverImages/cover4.png'},
    {songName:'Jujutsu Kaisen 0 Ichizu By KingGnu',filePath:'songs/Jujutsu Kaisen 0 Ichizu By KingGnu.mp3',coverPath:'coverImages/cover5.jpg'},
    {songName:'Bleach TYBW number one',filePath:'songs/Bleach TYBW number one.mp3',coverPath:'coverImages/cover4.png'}
]
let audioElement= new Audio(songs[songIndex].filePath);

//Adding cover image sources

for(let i=0;i<NumberOfSongItems;i++){
    songItem[i].firstElementChild.setAttribute('src',songs[i].coverPath)
}

//Handle Play/pause button
function MasterBtnplay(){
    MasterPlayBtn.classList.remove('fa-circle-play');
    MasterPlayBtn.classList.add('fa-circle-pause');
    BottomLine.firstElementChild.style.opacity=1;
}

function MasterBtnpause(){
    MasterPlayBtn.classList.remove('fa-circle-pause');
    MasterPlayBtn.classList.add('fa-circle-play');
    BottomLine.firstElementChild.style.opacity=0;
}

function changePlaytoPause(){
    songItem[songIndex].lastElementChild.lastElementChild.lastElementChild.classList.remove('fa-circle-play');
    songItem[songIndex].lastElementChild.lastElementChild.lastElementChild.classList.add('fa-circle-pause');
}

function changePausetoPlay(){
    songItem[songIndex].lastElementChild.lastElementChild.lastElementChild.classList.remove('fa-circle-pause');
    songItem[songIndex].lastElementChild.lastElementChild.lastElementChild.classList.add('fa-circle-play');
}

MasterPlayBtn.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        MasterBtnplay();
        changePlaytoPause();
    }
    else{
        audioElement.pause();
        MasterBtnpause();
        changePausetoPlay();
    }
})

//Handling loop Btn(style only)
//code related to functioning of loop button is inside Handling progress bar code
loopBtn.addEventListener('click',()=>{
    if(loopBtn.dataset.state=='off'){
        loopBtn.style.color='cyan';
        loopBtn.style.backgroundColor='grey';
        loopBtn.dataset.state='on'
    }
    else{
        loopBtn.style.color='black';
        loopBtn.style.backgroundColor='white';
        loopBtn.dataset.state='off'
    }
})

//Handling ProgressBar
audioElement.addEventListener('timeupdate',()=>{
    //Update Seekbar
    let progress=parseInt((audioElement.currentTime/audioElement.duration)*100)
    ProgressBar.value=progress;
    if(progress==100){
        if(loopBtn.dataset.state=='off'){ //checking loop button on or off 
            changePausetoPlay();
            if(songIndex==(songItem.length-1)){
                songIndex=0
                audioElement.src=songs[songIndex].filePath     
                BottomLine.lastElementChild.textContent=songs[songIndex].songName
                audioElement.play();
                changePlaytoPause();
            }
            else if(songIndex<songItem.length){
                songIndex+=1
                audioElement.src=songs[songIndex].filePath     
                BottomLine.lastElementChild.textContent=songs[songIndex].songName
                audioElement.play();
                changePlaytoPause();
            }
        }
        else{
            ProgressBar.value=0;
            audioElement.play();
        }    
    }
})

ProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=((ProgressBar.value*audioElement.duration)/100);
})


//Applying playbutton functions
songItem.forEach((element)=>{
    element.children[2].firstElementChild.firstElementChild.addEventListener('click',(e)=>{
        if(audioElement.paused){
            if(songIndex!=(songItem.indexOf(e.currentTarget.parentElement.parentElement.parentElement))){
                changePausetoPlay();
                e.currentTarget.classList.remove('fa-circle-play');
                e.currentTarget.classList.add('fa-circle-pause');
                songIndex=songItem.indexOf(e.currentTarget.parentElement.parentElement.parentElement);
                audioElement.src=songs[songIndex].filePath     
                BottomLine.lastElementChild.textContent=songs[songIndex].songName
                audioElement.play();
            }
            else{
                e.currentTarget.classList.remove('fa-circle-play');
                e.currentTarget.classList.add('fa-circle-pause');
                audioElement.play();
            }
            MasterBtnplay();
        }
        else{
            if(songIndex!=(songItem.indexOf(e.currentTarget.parentElement.parentElement.parentElement))){
                changePausetoPlay();
                e.currentTarget.classList.remove('fa-circle-play');
                e.currentTarget.classList.add('fa-circle-pause');
                MasterBtnplay();
                songIndex=songItem.indexOf(e.currentTarget.parentElement.parentElement.parentElement);
                audioElement.src=songs[songIndex].filePath     
                BottomLine.lastElementChild.textContent=songs[songIndex].songName
                audioElement.play();
            }
            else{
                e.currentTarget.classList.remove('fa-circle-pause');
                e.currentTarget.classList.add('fa-circle-play');
                MasterBtnpause();
                audioElement.pause();
            }
        }
    })
})

//Applying Backward and forward Btn Functions

MasterPlayBtn.previousElementSibling.addEventListener('click',()=>{
    changePausetoPlay();   
    if(songIndex<=0 && !(audioElement.paused)){
        songIndex=(songItem.length)-1
        audioElement.src=songs[songIndex].filePath     
        BottomLine.lastElementChild.textContent=songs[songIndex].songName
        audioElement.play();
        changePlaytoPause();
    }
    else if(songIndex<=0 && audioElement.paused){
        songIndex=(songItem.length)-1
        audioElement.src=songs[songIndex].filePath     
        BottomLine.lastElementChild.textContent=songs[songIndex].songName
    }
    else if(songIndex>0 && !(audioElement.paused)){
        songIndex-=1
        audioElement.src=songs[songIndex].filePath     
        BottomLine.lastElementChild.textContent=songs[songIndex].songName
        audioElement.play();
        changePlaytoPause();
    }    
    else if(songIndex>0 && audioElement.paused){
        songIndex-=1
        audioElement.src=songs[songIndex].filePath     
        BottomLine.lastElementChild.textContent=songs[songIndex].songName
    }
})

MasterPlayBtn.nextElementSibling.addEventListener('click',()=>{
    changePausetoPlay();   
    if(songIndex==(songItem.length-1) && !(audioElement.paused)){
        songIndex=0
        audioElement.src=songs[songIndex].filePath     
        BottomLine.lastElementChild.textContent=songs[songIndex].songName
        audioElement.play();
        changePlaytoPause();
    }
    else if(songIndex==(songItem.length-1) && (audioElement.paused)){
        songIndex=0
        audioElement.src=songs[songIndex].filePath     
        BottomLine.lastElementChild.textContent=songs[songIndex].songName
    }
    else if(songIndex<songItem.length && !(audioElement.paused)){
        songIndex+=1
        audioElement.src=songs[songIndex].filePath     
        BottomLine.lastElementChild.textContent=songs[songIndex].songName
        audioElement.play();
        changePlaytoPause();
    }    
    else if(songIndex<songItem.length && audioElement.paused){
        songIndex+=1
        audioElement.src=songs[songIndex].filePath     
        BottomLine.lastElementChild.textContent=songs[songIndex].songName
    }
})