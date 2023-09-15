const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

function togglePlay(e){
    
    // if(video.paused){
    //     video.play();
    // } else{
    //     video.pause();
    // }

    const method = video.paused ? 'play': 'pause'
    video[method]() // since method is getting string value
}

function updateButton(){
    const icon = this.paused? '►': '❚ ❚'
    toggle.textContent = icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate(){
    video[this.name] = this.value
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) *100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
    const scrubTime = (e.offsetX /progress.offsetWidth ) * video.duration;
    video.currentTime = scrubTime;  
}


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress); // you can use progress or timeupdate
document.addEventListener('keydown',(e)=>{
    if(e.code==='Space'){       //or   if(e.key===' ')
        const method = video.paused ? 'play': 'pause'
        video[method]()
    }
})

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip) )
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))

progress.addEventListener('click', scrub) 
//"Scrubbing" is a term used in video playback that refers to the ability to quickly navigate through a video by dragging a slider 
// or timeline bar back and forth.

let mouseDown = false;
progress.addEventListener('mousedown', ()=> mouseDown = true) 
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e) ) 
progress.addEventListener('mouseup', () => mouseDown = false ) 

fullscreen.addEventListener('click', function () {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        }
})
