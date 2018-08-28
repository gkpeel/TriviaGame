// ====== VARIABLES ======
var timer;
var currentRound;


// ====== OBJECTS ======

var triviaGame = {
    gameOver: false,
    rightAnswer: 0,
    wrongAnswers: 0,
    unanswered: 0,
    currentRound: undefined,
    gameRounds: [
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
    ],
    usedQuestions: [],
    // Pulls object out of gameRounds arrays at random
    selectQuesiton: function() {
        if (triviaGame.gameRounds.length !== 0) {
            this.currentRound = triviaGame.gameRounds.splice(random(triviaGame.gameRounds.length), 1)[0];
            triviaGame.usedQuestions.push(triviaGame.currentRound);
            console.log(triviaGame.currentRound);
            console.log(this.usedQuestions);
        } else {
            this.currentRound = false;
        }
    },
    // Creates output of the question and choices
    displayQuesiton: function() {
        var retval = "<h3>";
        this.selectQuesiton;
        console.log(currentRound);
        if (this.currentRound === false) {
            return this.endGameDisplay();
        } else {
            retval += triviaGame.currentRound.question;
            retval += '</h3><div class="row" id="answers">'
            for (var i=0; i<currentQ.choices.length; i++) {
                retval += '<div class="col-6 guess guess-'+i+'">' + currentQ.choices[i] + '</div><div class="w-100"></div>';
            }
            return retval;
        }
    },
    // Game Evaluation functions
    rightAnswer: function() {
        rightAnswers++;
        var retval = "<h3>Right On!</h3>";
        retval += "<p>The correct answer was " + currentRound.choices[currentRound.answer] + "</p>";
        retval += '<img class="answer-image" src="assets/images/' + currentRound.answerImage + '" />';
        return retval;
    },
    wrongAnswer: function() {
        wrongAnswers++;
        var retval = "<h3>Nope!</h3>";
        retval += "<p>The correct answer was " + currentRound.choices[currentRound.answer] + "</p>";
        retval += '<img class="answer-image" src="assets/images/' + currentRound.answerImage + '" />';
        return retval;
    },
    outOfTime: function() {
        unanswered++;
        var retval = "<h3>You have to be quicker!</h3>";
        retval += "<p>The correct answer was " + currentRound.choices[currentRound.answer] + "</p>";
        retval += '<img class="answer-image" src="assets/images/' + currentRound.answerImage + '" />';
        return retval;
    },
    endGameDisplay: function() {
        gameOver = true;
        stop();
        var retval = "<h3>All done, here's how you did!</h3>";
        retval += '<h4>Correct Answers: ' + rightAnswers + '</h4>';
        retval += '<h4>Incorrect Answers: ' + wrongAnswers + '</h4>';
        retval += '<h4>Unanswered: ' + unanswered + '</h4>';
        retval += '<button class="btn" id="reset">Start Over?</button>';
        return retval;
    },
    gameReset: function() {
        gameRounds = usedQuestions;
        usedQuestions = [];
        gameOver = false;
        rightAnswers = 0;
        wrongAnswers = 0;
        unanswered = 0;
        console.log(usedQuestions);
    }
}

var clock = {
    timePerQuestion: 10,
    countDown: function() {
        if (!gameOver) {
            timer = setInterval(decrement, 1000);
        }
    },
    decrement: function() {
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
    },
    stop: function() {
        clearInterval(timer);
    },
    reset: function() {
        stop();
        timePerQuestion = 10;
        $("#timer").html(timePerQuestion);
    }
}


// ====== FUNCTIONS ======
// Creates random number
function random(int) {
    return Math.floor(Math.random()*int);
}


$("#timer").html(clock.timePerQuestion);

console.log(triviaGame.gameRounds);
// ====== EVENT LISTENERS ======
$(document).ready(function() {

    $("#start").on("click", function() {
        $("#game-content").html(triviaGame.displayQuesiton);
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