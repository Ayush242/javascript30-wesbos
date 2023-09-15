setInterval(setClock,1000)

const second = document.querySelector('.second-hand');
const minute = document.querySelector('.min-hand');
const hour = document.querySelector('.hour-hand');
function setClock(){

    const date = new Date();
    const secondsRatio = date.getSeconds()/60;
    const minutesRatio = ( secondsRatio + date.getMinutes())/60;
    const hoursRatio = ( minutesRatio + date.getHours())/ 12;

    setRotation(second,secondsRatio)
    setRotation(minute,minutesRatio)
    setRotation(hour,hoursRatio)
   
}

function setRotation(elem, rotRatio){
    elem.style.setProperty('--rotation',rotRatio * 360)
}

setClock() // to prevent the clock from starting at initial position