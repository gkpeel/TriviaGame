var rightAnswers = 0;
var wrongAnswers = 0;

function goodbye() {
    console.log("end");
}

console.log("start");

setTimeout(goodbye, 3000);

function countdown() {
    seconds = 5;
    console.log(seconds);
    seconds--;
}

var timer = setInterval(countdown, 1000);


$(document).ready(function() {

    timer;

    $("#pause").on("click", function() {
        clearInterval(timer);
    });

});