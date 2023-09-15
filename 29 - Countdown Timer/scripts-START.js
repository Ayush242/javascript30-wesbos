const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')

let countdown;
function timer(seconds){
    clearInterval(countdown)

    // setInterval(()=>{
    //     console.log(seconds--);
    // },1000)
    // the reason we are not doing above logic is because some browsers cause interval to stop working after you switch your tab focus or in others when you scroll away from interval it will pause intervals to improve performance just like animated GIFs,
    const now = Date.now()
    const then = now + seconds*1000; 
    displayTimeLeft(seconds);
    //here it is not a problem coz even when you scroll away and come back we will have the correct time coz even if come back after some time it will begin from there 

    displayEndTime(then)

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now())/1000) // convert milli to sec
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds/60);
    const remainderSeconds = seconds%60;
    const display = `${minutes}:${remainderSeconds<10? '0':''}${remainderSeconds}`
    timerDisplay.textContent = display
    document.title = display
}

function displayEndTime(timestamp){
    const end = new Date(timestamp)
    const hour = end.getHours()
    const minutes = end.getMinutes()
    //if you want to adjust it to 12hr format from 24hr
    endTime.textContent = `Be back at ${hour > 12 ? hour - 12: hour == 0? 12: hour}:${minutes < 10?'0':''}${minutes}`
}

function startTimer(){
    timer(this.dataset.time)
}

buttons.forEach(button => button.addEventListener('click', startTimer))

document.customForm.addEventListener('submit',function (e){
    e.preventDefault()
    const minutes = this.minutes.value
    timer(minutes*60)
    this.reset()
})