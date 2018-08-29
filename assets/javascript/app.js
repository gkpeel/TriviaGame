// ====== VARIABLES ======
var gameOver = false;

// ====== OBJECTS ======

var triviaGame = {
    rightAnswers: 0,
    wrongAnswers: 0,
    unanswered: 0,
    currentRound: undefined,
    gameRounds: [
        {
            question: "How old is Stan Lee?",
            choices: ["89", "95", "92", "98"],
            answer: 1,
            answerImage: "hamilton.jpeg"
        },
        {
            question: "What is Abominations Real Name?",
            choices: ["Brock Rumlow", "Thunderbolt Ross", "Georges Batroc", "Emil Blonsky"],
            answer: 3,
            answerImage: "hamilton.jpeg"
        },
        {
            question: "The very first Marvel movie that Kevin Feige worked on was:",
            choices: ["Spider-Man", "X-Men", "Blade", "Daredevil"],
            answer: 1,
            answerImage: "hamilton.jpeg"
        },
        {
            question: "On the Netflix show Daredevil, Kingpin is played by:?",
            choices: ["Vicent D'Onofrio", "Michael Clark Duncan", "John Goodman", "Wayne Knight"],
            answer: 0,
            answerImage: "hamilton.jpeg"
        },
        {
            question: "?",
            choices: ["2001", "1776", "1777", "1781"],
            answer: 1,
            answerImage: "hamilton.jpeg"
        },
        {
            question: "What year was the Declaration of Inpendence signed?",
            choices: ["2001", "1776", "1777", "1781"],
            answer: 1,
            answerImage: "hamilton.jpeg"
        },
        {
            question: "What year was the Declaration of Inpendence signed?",
            choices: ["2001", "1776", "1777", "1781"],
            answer: 1,
            answerImage: "hamilton.jpeg"
        },
        {
            question: "What year was the Declaration of Inpendence signed?",
            choices: ["2001", "1776", "1777", "1781"],
            answer: 1,
            answerImage: "hamilton.jpeg"
        },
        {
            question: "What year was the Declaration of Inpendence signed?",
            choices: ["2001", "1776", "1777", "1781"],
            answer: 1,
            answerImage: "hamilton.jpeg"
        },
        {
            question: "What year was the Declaration of Inpendence signed?",
            choices: ["2001", "1776", "1777", "1781"],
            answer: 1,
            answerImage: "hamilton.jpeg"
        },
        {
            question: "What year was the Declaration of Inpendence signed?",
            choices: ["2001", "1776", "1777", "1781"],
            answer: 1,
            answerImage: "hamilton.jpeg"
        },
        {
            question: "What year was the Declaration of Inpendence signed?",
            choices: ["2001", "1776", "1777", "1781"],
            answer: 1,
            answerImage: "hamilton.jpeg"
        },
        {
            question: "What year was the Declaration of Inpendence signed?",
            choices: ["2001", "1776", "1777", "1781"],
            answer: 1,
            answerImage: "hamilton.jpeg"
        },
        {
            question: "What year was the Declaration of Inpendence signed?",
            choices: ["2001", "1776", "1777", "1781"],
            answer: 1,
            answerImage: "hamilton.jpeg"
        },

    ],
    usedQuestions: [],
    // Creates output of the question and choices
    displayQuesiton: function() {
        $("#pause").toggleClass("d-none");
        var retval = "<h3>";
        if (this.usedQuestions.length === 10) {
            return this.endGameDisplay();
        } else {
            this.currentRound = this.gameRounds.splice(random(this.gameRounds.length), 1)[0];
            this.usedQuestions.push(this.currentRound);
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
        $("#pause").toggleClass("d-none");
        this.rightAnswers++;
        var retval = "<h3>Right On!</h3>";
        retval += "<p>The correct answer was " + this.currentRound.choices[this.currentRound.answer] + "</p>";
        retval += '<img class="answer-image" src="assets/images/' + this.currentRound.answerImage + '" />';
        return retval;
    },
    wrongAnswer: function() {
        $("#pause").toggleClass("d-none");
        this.wrongAnswers++;
        var retval = "<h3>Nope!</h3>";
        retval += "<p>The correct answer was " + this.currentRound.choices[this.currentRound.answer] + "</p>";
        retval += '<img class="answer-image" src="assets/images/' + this.currentRound.answerImage + '" />';
        return retval;
    },
    outOfTime: function() {
        $("#pause").toggleClass("d-none");
        this.unanswered++;
        var retval = "<h3>You have to be quicker!</h3>";
        retval += "<p>The correct answer was " + this.currentRound.choices[this.currentRound.answer] + "</p>";
        retval += '<img class="answer-image" src="assets/images/' + this.currentRound.answerImage + '" />';
        return retval;
    },
    endGameDisplay: function() {
        $("#pause").toggleClass("d-none");
        gameOver = true;
        clock.stop();
        var retval = "<h3>All done, here's how you did!</h3>";
        retval += '<h4>Correct Answers: ' + this.rightAnswers + '</h4>';
        retval += '<h4>Incorrect Answers: ' + this.wrongAnswers + '</h4>';
        retval += '<h4>Unanswered: ' + this.unanswered + '</h4>';
        retval += '<button class="btn" id="reset">Start Over?</button>';
        return retval;
    },
    gameReset: function() {
        this.gameRounds = this.usedQuestions;
        this.usedQuestions = [];
        this.gameOver = false;
        this.rightAnswers = 0;
        this.wrongAnswers = 0;
        this.unanswered = 0;
    }
}

var clock = {
    // timer: undefined,
    timePerQuestion: 10,
    clockRunning: false,
    countDown: function() {
        if (!gameOver && !this.clockRunning) {
            timer = setInterval(this.decrement.bind(this), 1000);
            this.clockRunning = true;
        }
    },
    decrement: function() {
        this.timePerQuestion--;
        $("#timer").html(this.timePerQuestion);
        if (this.timePerQuestion === 0) {
            $("#timer").html(this.timePerQuestion);
            this.reset();
            $("#game-content").html(triviaGame.outOfTime());
            setTimeout(function() {
                $("#game-content").html(triviaGame.displayQuesiton());
                clock.countDown();
            }, 3000);
        }
    },
    stop: function() {
        clearInterval(timer);
        this.clockRunning = false;
    },
    resume: function() {
        this.countDown()
        this.clockRunning = true;
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
            console.log("rightAnswers: " + triviaGame.rightAnswers);
            console.log("wrongAnswers: " + triviaGame.wrongAnswers);
            console.log("unanswered: " + triviaGame.unanswered);
        }
    });

    $(document).on("click", "#game-content #reset", function() {
        gameOver = false;
        triviaGame.gameReset();
        clock.countDown();
        $("#game-content").html(triviaGame.displayQuesiton());
        $("#timer").html(clock.timePerQuestion);
        console.log(clock);
    });

    // $("#pause").toggle(function() {
    //     clock.stop();
    // }, function() {
    //     clock.resume();
    // });

    $("#pause").on("click", function() {
        $("#game-content").toggleClass("blur", 200);
        if (clock.clockRunning === true) {
            clock.stop();
            $(this).text("Resume");
        } else {
            clock.resume();
            $(this).text("Pause");
        }
    });

});