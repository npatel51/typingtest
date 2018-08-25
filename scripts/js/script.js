const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
var timer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
    if( time <= 9)
     return  "0"+time;
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer(){
    let currentTime = leadingZero(timer[0])+":"+leadingZero(timer[1])+":"+leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    //hour
    timer[0] = Math.floor(timer[3]/3600)%24;
    //minute 
    timer[1] = Math.floor(timer[3]/60)%60;
    //second
    timer[2] = timer[3]%60;
  
}

// Match the text entered with the provided text on the page:
function spellcheck(){
    let textEntered = testArea.value;
    //change the color of border to green if text matches exactly 
    if( originText === textEntered){
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
    }else if(originText.startsWith(textEntered)){ // color it blue if the text matches up to the current state
        testWrapper.style.borderColor = "#65CCf3";
    }else{                                       // color it orange if the text mismatch with orignal text at
        testWrapper.style.borderColor ="#E95D0F";   
    }
}

// Start the timer:
function start(){
    let textEnterLength = testArea.value.length;
    if( textEnterLength === 0 && !timerRunning ){
        timerRunning = true;
        interval = setInterval(runTimer,1000);
    }
}

// Reset everything:
function reset(){
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    timerRunning = false;
    timer = [0,0,0,0];
    testWrapper.style.borderColor = "grey";
}


// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",start,false);
testArea.addEventListener("keyup",spellcheck,false);
resetButton.addEventListener("click",reset,false);