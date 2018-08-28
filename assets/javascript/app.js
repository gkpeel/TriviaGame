var rightAnswers = 0;
var wrongAnswers = 0;
var timer;
var timePerQuestion = 10;
var timerRunning = false;
var currentRound;

var gameRounds = [
    {
        question: "What year was the Declaration of Inpendence signed?",
        choices: ["2001", "1776", "1777", "1781"],
        answer: 1,
        answerImage: "hamilton.jpeg"
    },
    {
        question: "Who was the first President of the United States?",
        choices: ["Thomas Jefferson", "Alexander Hamilton", "James Madison", "George Washington"],
        answer: 3,
        answerImage: "hamilton.jpeg"
    },
    {
        question: "Where was Alexander Hamilton born?",
        choices: ["Trinidad and Tobago", "St. Kitts", "Trenton", "Philadelphia"],
        answer: 1,
        answerImage: "hamilton.jpeg"
    },
]

// Creates random number
function random(int) {
    return Math.floor(Math.random()*int);
}

// Pulls random object out of gameRounds arrays
function selectQuesiton() {
    currentRound = gameRounds.splice(random(gameRounds.length), 1)[0];
    return currentRound;
}

// Creates output of the question and choices
function displayQuesiton() {
    var retval = "<h3>";
    var currentQ = selectQuesiton();
    retval += currentQ.question;
    retval += '</h3><div class="row" id="answers">'
    for (var i=0; i<currentQ.choices.length; i++) {
        retval += '<div class="col-6 guess guess-'+i+'">' + currentQ.choices[i] + '</div><div class="w-100"></div>';
    }
    return retval;
}

function rightAnswer() {
    rightAnswers++;
    retval = "<h3>Right On!</h3>";
    retval += "<p>The correct answer was " + currentRound.choices[currentRound.answer] + "</p>";
    retval += '<img class="answer-image" src="assets/images/' + currentRound.answerImage + '" />';
    return retval;
}

function wrongAnswer() {
    wrongAnswers++;
    retval = "<h3>Nope!</h3>";
    retval += "<p>The correct answer was " + currentRound.choices[currentRound.answer] + "</p>";
    retval += '<img class="answer-image" src="assets/images/' + currentRound.answerImage + '" />';
    return retval;
}


// Timer functions
function countDown() {
    timerRunning = true;
    timer = setInterval(decrement, 1000);
}

function decrement() {
    timePerQuestion;
    timePerQuestion--;

    $("#timer").html(timePerQuestion);
    if (timePerQuestion === 0) {
        stop();
        $("#timer").html(timePerQuestion);
        $("#game-content").html(wrongAnswer());
    }
}

function stop() {
    clearInterval(timer);
}

function reset() {
    stop();
    timePerQuestion = 10;
    $("#timer").html(timePerQuestion);
}

$("#timer").html(timePerQuestion);

$(document).ready(function() {

    $("#start").on("click", function() {
        $("#game-content").html(displayQuesiton());
        countDown();
    });

    $(document).on("click", "#game-content .guess", function() {
        var index = $(this).index();
        reset();
        if(index/2===currentRound.answer) {
            $("#game-content").html(rightAnswer());
            setTimeout(function() {
                $("#game-content").html(displayQuesiton());
                countDown();
            }, 3000);
        } else {
            $("#game-content").html(wrongAnswer());
            setTimeout(function() {
                $("#game-content").html(displayQuesiton());
                countDown();
            }, 3000);
        }
    });

    $("#pause").on("click", function() {
        stop();
    });
});





// TODO: 
// check guess against answer, 
// display if answer 
// right or wrong, 
// load next question



    // var triviaGame = {
    //     gameLibrary: [
    //         {
    //             question: "What year was the Declaration of Inpendence signed?",
    //             choices: ["2001", "1776", "1777", "1781"],
    //             answer: "1776"
    //         },
    //         {
    //             question: "Who was the first President of the United States?",
    //             choices: ["Thomas Jefferson", "Alexander Hamilton", "James Madison", "George Washington"],
    //             answer: "George Washington"
    //         },
    //         {
    //             question: "Where was Alexander Hamilton born?",
    //             choices: ["Trinidad and Tobago", "St. Kitts", "Trenton", "Philadelphia"],
    //             answer: "St. Kitts"
    //         }
    //     ],
    //     generateQuestion: function () {
    //         return this.gameLibrary.pop(random(gameRounds.length));
    //     },
    //     displayQuesiton: function() {
    //         var retval = "<h3>";
    //         var currentQ = this.generateQuestion;
    //         console.log(currentQ);
    //         retval += currentQ.question;
    //         retval += '</h3><div class="row">'
    //         for (var i=0; i<currentQ.choices.length; i++) {
    //             retval += '<div class="col-6 guess guess-'+i+'">' + currentQ.choices[i] + '</div><div class="w-100"></div>';
    //         }
    //         return retval;
    //     }
    // }