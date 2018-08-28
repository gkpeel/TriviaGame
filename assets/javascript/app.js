// ====== VARIABLES ======
var rightAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;
var timer;
var timePerQuestion = 10;
var gameOver = false;
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
var usedQuestions = [];


// ====== FUNCTIONS ======
// Creates random number
function random(int) {
    return Math.floor(Math.random()*int);
}

// Pulls object out of gameRounds arrays at random
function selectQuesiton() {
    if (gameRounds.length !== 0) {
        currentRound = gameRounds.splice(random(gameRounds.length), 1)[0];
        usedQuestions.push(currentRound);
        console.log(usedQuestions);
        return currentRound;
    } else {
        return false;
    }
}

// Creates output of the question and choices
function displayQuesiton() {
    var retval = "<h3>";
    var currentQ = selectQuesiton();
    if (currentQ === false) {
        return endGameDisplay();
    } else {
        retval += currentQ.question;
        retval += '</h3><div class="row" id="answers">'
        for (var i=0; i<currentQ.choices.length; i++) {
            retval += '<div class="col-6 guess guess-'+i+'">' + currentQ.choices[i] + '</div><div class="w-100"></div>';
        }
        return retval;
    }
}


// Game Evaluation functions
function rightAnswer() {
    rightAnswers++;
    var retval = "<h3>Right On!</h3>";
    retval += "<p>The correct answer was " + currentRound.choices[currentRound.answer] + "</p>";
    retval += '<img class="answer-image" src="assets/images/' + currentRound.answerImage + '" />';
    return retval;
}

function wrongAnswer() {
    wrongAnswers++;
    var retval = "<h3>Nope!</h3>";
    retval += "<p>The correct answer was " + currentRound.choices[currentRound.answer] + "</p>";
    retval += '<img class="answer-image" src="assets/images/' + currentRound.answerImage + '" />';
    return retval;
}

function outOfTime() {
    unanswered++;
    var retval = "<h3>You have to be quicker!</h3>";
    retval += "<p>The correct answer was " + currentRound.choices[currentRound.answer] + "</p>";
    retval += '<img class="answer-image" src="assets/images/' + currentRound.answerImage + '" />';
    return retval;
}

function endGameDisplay() {
    gameOver = true;
    stop();
    var retval = "<h3>All done, here's how you did!</h3>";
    retval += '<h4>Correct Answers: ' + rightAnswers + '</h4>';
    retval += '<h4>Incorrect Answers: ' + wrongAnswers + '</h4>';
    retval += '<h4>Unanswered: ' + unanswered + '</h4>';
    retval += '<button class="btn" id="reset">Start Over?</button>';
    return retval;
}

function gameReset() {
    gameRounds = usedQuestions;
    usedQuestions = [];
    gameOver = false;
    rightAnswers = 0;
    wrongAnswers = 0;
    unanswered = 0;
    console.log(usedQuestions);
}


// Timer functions
function countDown() {
    if (!gameOver) {
        timer = setInterval(decrement, 1000);
    }
}

function decrement() {
    timePerQuestion;
    timePerQuestion--;

    $("#timer").html(timePerQuestion);
    if (timePerQuestion === 0) {
        $("#timer").html(timePerQuestion);
        reset();
        $("#game-content").html(outOfTime());
        setTimeout(function() {
            $("#game-content").html(displayQuesiton());
            countDown();
        }, 3000);
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



// ====== EVENT LISTENERS ======
$(document).ready(function() {

    $("#start").on("click", function() {
        $("#game-content").html(displayQuesiton());
        countDown();
    });

    $(document).on("click", "#game-content .guess", function() {
        var index = $(this).index();
        reset();
        if (!gameOver) {
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
        }
    });

    $(document).on("click", "#game-content #reset", function() {
        gameReset();
        $("#game-content").html(displayQuesiton());
        $("#timer").html(timePerQuestion);
        countDown();
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