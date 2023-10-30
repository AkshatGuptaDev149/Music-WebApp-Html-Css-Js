console.log('welcome to our music app')

//Initialising the variables

var songIndex=0;
let MasterPlayBtn=document.getElementById('MasterPlay');
let ProgressBar=document.getElementById('ProgressBar');
let songItem;
let marquee=document.getElementById('marq')
let PlayGif=document.getElementById('PlayGif')
let loading=document.getElementById('loading');
let CurrentImage=document.getElementById('CurrentImage')
let loopBtn=document.getElementById('loop');
let songItemsContainer=document.getElementById('songItemsContainer');
let BottomLine=document.getElementById('songInfo');





let songs=[
    {songName:'DemonSlayerS3-Kizuna No Kiseki',filePath:'songs/DemonSlayerS3-Kizuna No Kiseki.mp3',coverPath:'coverImages/DemonSlayerS3.jpg'},
    {songName:'MushokuTenseiS2 OP Longman spiral',filePath:'songs/MushokuTenseiS2 OP Longman spiral.mp3',coverPath:'coverImages/coverM.png'},
    {songName:'MushokuTenseiS2 ED Yuiko Musubime ',filePath:'songs/MushokuTenseiS2 Ending Musubime YuikoOhara.mp3',coverPath:'coverImages/coverM.png'},
    {songName:'TheFatRat The Calling',filePath:'songs/TheFatRat The Calling.mp3',coverPath:'coverImages/default.png'},
    {songName:'Ainsi bas la vida',filePath:'songs/Ainsi bas la vida.mp3',coverPath:'coverImages/cover3.jpg'},
    {songName:'Dragon Ball Z - Cha La Head Cha La',filePath:'songs/Dragon Ball Z - Cha La Head Cha La.mp3',coverPath:'coverImages/cover2.png'},
    {songName:'Bleach OST Cokkaku',filePath:'songs/Bleach OST chokkaku.mp3',coverPath:'coverImages/cover1.png'},
    {songName:'DBS UltimateBattle OST',filePath:'songs/DBS UltimateBattle OST.mp3',coverPath:'coverImages/cover2.png'},
    {songName:'Where our Blue is-JJ Kaisen S2',filePath:'songs/Where our blue is.mp3',coverPath:'coverImages/JJ S2 Cover.jpg'},
    {songName:'Jujutsu Kaisen S2OP SpecialZ',filePath:'songs/Jujutsu Kaisen S2OP SpecialZ.mp3',coverPath:'coverImages/JJ S2 Cover2.jpg'},	
    {songName:'Bleach TYBW-Rapport',filePath:'songs/Bleach TYBW rapport.mp3',coverPath:'coverImages/cover4.png'},
    {songName:'Jujutsu Kaisen 0 Ichizu By KingGnu',filePath:'songs/Jujutsu Kaisen 0 Ichizu By KingGnu.mp3',coverPath:'coverImages/cover5.jpg'},
    {songName:'Perfect time',filePath:'songs/Perfect time.mp3',coverPath:'coverImages/default.png'},
    {songName:'Maboroshi theme song Shin On',filePath:'songs/Maboroshi theme song Shin On.mp3',coverPath:'coverImages/MaboroshiCover.jpg'},
    {songName:'Dance In The Game Classroom of the Elite Season 2 Opening',filePath:'songs/Dance In The Game Classroom of the Elite Season 2 Opening.mp3',coverPath:'coverImages/cover6.png'},
    {songName:'Bleach TYBW number one',filePath:'songs/Bleach TYBW number one.mp3',coverPath:'coverImages/cover4.png'}
]
let audioElement= new Audio(songs[songIndex].filePath);

marquee.textContent=songs[0].songName
BottomLine.lastElementChild.textContent=songs[0].songName

//Function to remove loadscreen and launch the application
function Launch(){
    loading.style.display='none'
    CurrentImage.firstElementChild.setAttribute('src',songs[songIndex].coverPath)
    CurrentImage.style.opacity=1
    marquee.style.opacity=1
    songItem=Array.from(songItemsContainer.children)
    ApplyPlayBtnFunc()
}
//This Launch function is run after all songItems will be added by the next function 


//Function for adding songItems
async function AddSongs(){
    for(let i=0;i<songs.length;i++){
            let testAudio=new Audio(songs[i].filePath)
            let promise= new Promise((resolve, reject) => { 
                testAudio.onloadedmetadata=()=>{resolve(testAudio.duration)}
             })
            let duration=await promise;
            let Minutes=Math.floor(duration/60)
            let Seconds=(Math.floor(duration)%60)
            let songDuration=Minutes +":"+ (Seconds<10? '0'+Seconds:Seconds)
            songs[i].duration=songDuration
            let Item=document.createElement('div')
            Item.classList.add('songItem')
            Item.innerHTML=`
            <img alt="1" src="${songs[i].coverPath}">
            <span>${songs[i].songName}</span>
            <span class="songlistplay"><span class="timestamp">${songs[i].duration}<i class="fa-regular fa-circle-play "></i></span></span>`
            songItemsContainer.appendChild(Item)
        }
    Launch()    
        
}
AddSongs()





//Handle Play/pause button
function MasterBtnplay(){
    MasterPlayBtn.classList.remove('fa-circle-play');
    MasterPlayBtn.classList.add('fa-circle-pause');
    BottomLine.firstElementChild.style.opacity=1;
    PlayGif.style.opacity=1;
}

function MasterBtnpause(){
    MasterPlayBtn.classList.remove('fa-circle-pause');
    MasterPlayBtn.classList.add('fa-circle-play');
    BottomLine.firstElementChild.style.opacity=0;
    PlayGif.style.opacity=0;
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
                CurrentImage.firstElementChild.setAttribute('src',songs[songIndex].coverPath)
                audioElement.src=songs[songIndex].filePath     
                BottomLine.lastElementChild.textContent=songs[songIndex].songName
                marquee.textContent=songs[songIndex].songName
                audioElement.play();
                changePlaytoPause();
            }
            else if(songIndex<songItem.length){
                songIndex+=1
                CurrentImage.firstElementChild.setAttribute('src',songs[songIndex].coverPath)
                audioElement.src=songs[songIndex].filePath     
                BottomLine.lastElementChild.textContent=songs[songIndex].songName
                marquee.textContent=songs[songIndex].songName
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
function ApplyPlayBtnFunc(){
    songItem.forEach((element)=>{
    element.children[2].firstElementChild.firstElementChild.addEventListener('click',(e)=>{
        if(audioElement.paused){
            if(songIndex!=(songItem.indexOf(e.currentTarget.parentElement.parentElement.parentElement))){
                changePausetoPlay();
                e.currentTarget.classList.remove('fa-circle-play');
                e.currentTarget.classList.add('fa-circle-pause');
                songIndex=songItem.indexOf(e.currentTarget.parentElement.parentElement.parentElement);
                CurrentImage.firstElementChild.setAttribute('src',songs[songIndex].coverPath)
                audioElement.src=songs[songIndex].filePath     
                BottomLine.lastElementChild.textContent=songs[songIndex].songName
                marquee.textContent=songs[songIndex].songName
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
                CurrentImage.firstElementChild.setAttribute('src',songs[songIndex].coverPath)
                audioElement.src=songs[songIndex].filePath     
                BottomLine.lastElementChild.textContent=songs[songIndex].songName
                marquee.textContent=songs[songIndex].songName
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
}


//Applying Backward and forward Btn Functions

MasterPlayBtn.previousElementSibling.addEventListener('click',()=>{
    changePausetoPlay();   
    if(songIndex<=0 && !(audioElement.paused)){
        songIndex=(songItem.length)-1
        CurrentImage.firstElementChild.setAttribute('src',songs[songIndex].coverPath)
        audioElement.src=songs[songIndex].filePath     
        BottomLine.lastElementChild.textContent=songs[songIndex].songName
        marquee.textContent=songs[songIndex].songName
        audioElement.play();
        changePlaytoPause();
    }
    else if(songIndex<=0 && audioElement.paused){
        songIndex=(songItem.length)-1
        CurrentImage.firstElementChild.setAttribute('src',songs[songIndex].coverPath)
        audioElement.src=songs[songIndex].filePath     
        BottomLine.lastElementChild.textContent=songs[songIndex].songName
        marquee.textContent=songs[songIndex].songName
    }
    else if(songIndex>0 && !(audioElement.paused)){
        songIndex-=1
        CurrentImage.firstElementChild.setAttribute('src',songs[songIndex].coverPath)
        audioElement.src=songs[songIndex].filePath     
        BottomLine.lastElementChild.textContent=songs[songIndex].songName
        marquee.textContent=songs[songIndex].songName
        audioElement.play();
        changePlaytoPause();
    }    
    else if(songIndex>0 && audioElement.paused){
        songIndex-=1
        CurrentImage.firstElementChild.setAttribute('src',songs[songIndex].coverPath)
        audioElement.src=songs[songIndex].filePath     
        BottomLine.lastElementChild.textContent=songs[songIndex].songName
        marquee.textContent=songs[songIndex].songName
    }
})

MasterPlayBtn.nextElementSibling.addEventListener('click',()=>{
    changePausetoPlay();   
    if(songIndex==(songItem.length-1) && !(audioElement.paused)){
        songIndex=0
        CurrentImage.firstElementChild.setAttribute('src',songs[songIndex].coverPath)
        audioElement.src=songs[songIndex].filePath     
        BottomLine.lastElementChild.textContent=songs[songIndex].songName
        marquee.textContent=songs[songIndex].songName
        audioElement.play();
        changePlaytoPause();
    }
    else if(songIndex==(songItem.length-1) && (audioElement.paused)){
        songIndex=0
        CurrentImage.firstElementChild.setAttribute('src',songs[songIndex].coverPath)
        audioElement.src=songs[songIndex].filePath     
        BottomLine.lastElementChild.textContent=songs[songIndex].songName
        marquee.textContent=songs[songIndex].songName
    }
    else if(songIndex<songItem.length && !(audioElement.paused)){
        songIndex+=1
        CurrentImage.firstElementChild.setAttribute('src',songs[songIndex].coverPath)
        audioElement.src=songs[songIndex].filePath     
        BottomLine.lastElementChild.textContent=songs[songIndex].songName
        marquee.textContent=songs[songIndex].songName
        audioElement.play();
        changePlaytoPause();
    }    
    else if(songIndex<songItem.length && audioElement.paused){
        songIndex+=1
        CurrentImage.firstElementChild.setAttribute('src',songs[songIndex].coverPath)
        audioElement.src=songs[songIndex].filePath     
        BottomLine.lastElementChild.textContent=songs[songIndex].songName
        marquee.textContent=songs[songIndex].songName
    }
})


