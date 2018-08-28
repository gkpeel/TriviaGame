// ====== VARIABLES ======
var gameOver = false;


// ====== OBJECTS ======

var triviaGame = {
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
        if (this.gameRounds.length !== 0) {
            console.log("made it here");
            this.currentRound = this.gameRounds.splice(random(this.gameRounds.length), 1)[0];
            this.usedQuestions.push(this.currentRound);
            console.log(this.currentRound);
            console.log(this.usedQuestions);
        } else {
            this.currentRound = false;
        }
    },
    // Creates output of the question and choices
    displayQuesiton: function() {
        var retval = "<h3>";
        this.currentRound = this.gameRounds.splice(random(this.gameRounds.length), 1)[0];
        this.usedQuestions.push(this.currentRound);
        console.log(this.currentRound);
        if (this.currentRound === false) {
            return this.endGameDisplay();
        } else {
            retval += this.currentRound.question;
            retval += '</h3><div class="row" id="answers">'
            for (var i=0; i<this.currentRound.choices.length; i++) {
                retval += '<div class="col-6 guess guess-'+i+'">' + this.currentRound.choices[i] + '</div><div class="w-100"></div>';
            }
            return retval;
        }
    },
    // Game Evaluation functions
    rightAnswer: function() {
        this.rightAnswers++;
        var retval = "<h3>Right On!</h3>";
        retval += "<p>The correct answer was " + this.currentRound.choices[this.currentRound.answer] + "</p>";
        retval += '<img class="answer-image" src="assets/images/' + this.currentRound.answerImage + '" />';
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
    // timer: undefined,
    timePerQuestion: 10,
    countDown: function() {
        if (!gameOver) {
            setInterval(this.decrement, 1000);
        }
    },
    decrement: function() {
        this.timePerQuestion--;
        console.log(this.timePerQuestion);
        $("#timer").html(this.timePerQuestion);
        if (this.timePerQuestion === 0) {
            $("#timer").html(this.timePerQuestion);
            this.reset();
            $("#game-content").html(triviaGame.outOfTime());
            setTimeout(function() {
                $("#game-content").html(displayQuesiton());
                countDown();
            }, 3000);
        }
    },
    stop: function() {
        clearInterval(this.countDown);
    },
    reset: function() {
        this.stop();
        this.timePerQuestion = 10;
        $("#timer").html(this.timePerQuestion);
    }
}


// ====== FUNCTIONS ======
// Creates random number
function random(int) {
    return Math.floor(Math.random()*int);
}


$("#timer").html(clock.timePerQuestion);

// ====== EVENT LISTENERS ======
$(document).ready(function() {

    $("#start").on("click", function() {
        $("#game-content").html(triviaGame.displayQuesiton());
        clock.countDown();
    });

    $(document).on("click", "#game-content .guess", function() {
        var index = $(this).index();
        clock.reset();
        if (!gameOver) {
            if(index/2===triviaGame.currentRound.answer) {
                $("#game-content").html(triviaGame.rightAnswer());
                setTimeout(function() {
                    $("#game-content").html(triviaGame.displayQuesiton());
                    clock.countDown();
                }, 3000);
            } else {
                $("#game-content").html(triviaGame.wrongAnswer());
                setTimeout(function() {
                    $("#game-content").html(triviaGame.displayQuesiton());
                    clock.countDown();
                }, 3000);
            }
        }
    });

    $(document).on("click", "#game-content #reset", function() {
        trivia.gameReset();
        $("#game-content").html(triviaGame.displayQuesiton());
        $("#timer").html(clock.timePerQuestion);
        clock.countDown();
    });

    $("#pause").on("click", function() {
        clock.stop();
    });


});