const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    const mediaConstraints = {
        video:true,
        audio:false
    }
    navigator.mediaDevices.getUserMedia(mediaConstraints)
        .then(mediaStream =>{
            video.srcObject = mediaStream;
            video.play()
        })
        .catch(err => console.log("Access Denied:", err.message))
}

function paintToCanvas(){
    // const width = video.videoWidth;
    // const height = video.videoHeight;
    // canvas.width = width;
    // canvas.height = height;
    
    // console.log(width,height);
     setInterval(()=>{  //coz if we want to stop video getting drawn on canvas we can get id and at the calling statement and set 
    //                              clearInterval
        ctx.drawImage(video,60,-20,120,120)
        let pixels = ctx.getImageData(60,-20,120,120)
        // pixels = redEffect(pixels)
        // pixels = rgbSplit(pixels);
        // ctx.globalAlpha = 0.1
        pixels = greenScreen(pixels)
        ctx.putImageData(pixels,60,-20);
    },160)
}

function takePhoto() {
    snap.currenTime = 0;
    snap.play() 

    // take data out of canvas
    const data = canvas.toDataURL('image/jpeg') 
    const link = document.createElement('a')
    link.href = data;
    link.setAttribute('download','handsome')
    link.innerHTML = `<img src=${data} alt="handsome person"/>`
    strip.prepend(link)

}

function redEffect(pixels){
    
    for (let i = 0; i < pixels.data.length; i+=4) { // pixels is special kind of arr. it doesn't have map function
        pixels.data[i+0] -= 100 //[0] represents red value from 0-255
        pixels.data[i+1] -= 50 // represents green
        pixels.data[i+2] *= 0.5 // represents blue 0-255 and [3] represents alpha value 0-1
    }
    return pixels
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i-100]= pixels.data[i+0]
        pixels.data[i+50]= pixels.data[i+1] 
        pixels.data[i-100]= pixels.data[i+2] 
    }
    return pixels
}

function greenScreen(pixels) {
    const levels = {}

    document.querySelectorAll('.rgb input').forEach(level =>{
        levels[level.name] = level.value
    })
    
    for (i = 0; i < pixels.data.length; i+=4){
        red = pixels.data[i+0]
        green = pixels.data[i+1]
        blue = pixels.data[i+2]
        alpha = pixels.data[i+3]
        
        if(red >=levels.rmin && green >=levels.gmin && blue >=levels.bmin
            && red <=levels.rmax && green <=levels.gmax && blue <=levels.bmax){
                pixels.data[i+3] = 0;
            }
        
    }

    return pixels

}

// it is triggered when the browser determines that there's enough audio or video data buffered and ready to start playing. It's useful for situations where you want to ensure that the media can be played smoothly before allowing the user to interact with it.
video.addEventListener('canplay',paintToCanvas)
getVideo()