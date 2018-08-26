var rightAnswers = 0;
var wrongAnswers = 0;
var timer;
var timePerQuestion = 10;
var timerRunning = false;

function countDown() {
    timer = setInterval(decrement, 1000);
}

function decrement() {
    timerRunning = true;
    timePerQuestion--;

    $("#timer").html("<h2>" + timePerQuestion + "</h2>");

    if (timePerQuestion === 0) {

        stop();
        $("#time").html("<h2>" + timePerQuestion + "</h2>");

    }
}

function stop() {
    clearInterval(timer);
}




$(document).ready(function() {

    $("#timer").html("<h2>" + timePerQuestion + "</h2>");
    countDown();

    $("#pause").on("click", function() {
        stop();
    });
});