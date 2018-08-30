// ====== VARIABLES ======
var gameOver = false;

// ====== FUNCTIONS ======
function random(int) {
    return Math.floor(Math.random()*int);
}

function giphyRandom(searchTerm) {
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=RMDw4LWL789qavS8mg50wHl0MzLoDlRC&limit=1";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var gif = response.data[0].images.original.url;
        $(".right-answer").after('<img src="'+gif+'" class="answer-gif">');
    });
}

function giphyDisplay(gifID) {
    var queryURL = "http://api.giphy.com/v1/gifs/" + "3o7rbT3ECCXdEGE8fu" + "&api_key=RMDw4LWL789qavS8mg50wHl0MzLoDlRC";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var gif = response.data[0].images.original.url;
        $(".right-answer").after('<img src="'+gif+'" class="answer-gif">');
    });
}

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
            gifID: "",
            theme: "stan+lee",
        },
        {
            question: "What is Abominations Real Name?",
            choices: ["Brock Rumlow", "Thunderbolt Ross", "Georges Batroc", "Emil Blonsky"],
            answer: 3,
            gifID: "",
            theme: "marvel+abomination+emil+blonsky"
        },
        {
            question: "The very first Marvel movie that Kevin Feige worked on was:",
            choices: ["Spider-Man", "X-Men", "Blade", "Daredevil"],
            answer: 1,
            gifID: "",
            theme: "x+men+movie+2000"
        },
        {
            question: "On the Netflix show Daredevil, Kingpin is played by:?",
            choices: ["Vicent D'Onofrio", "Michael Clark Duncan", "John Goodman", "Wayne Knight"],
            answer: 0,
            gifID: "kUQHJmZWav90Q",
            theme: "kingpin+netflix"
        },
        {
            question: "In Marvel's Ultimate Iron Man what color is Tony Stark's skin?",
            choices: ["White", "Black", "Blue", "Green"],
            answer: 2,
            gifID: "",
            theme: "iron+man"
        },
        {
            question: "What is Taskmaster's Super Power?",
            choices: ["Enhanced Organization", "Super Speed", "Fusion Blasts", "Photographic Reflexes"],
            answer: 3,
            gifID: "",
            theme: "taskmaster+marvel"
        },
        {
            question: "What are Wolverine's bones encased in?",
            choices: ["Vibranium", "Unobtanium", "Carbonadium", "Adamantium"],
            answer: 3,
            gifID: "bmYyewjxo55oA",
            theme: "adamantium"
        },
        {
            question: "Cain Marko is better known as:",
            choices: ["Sabretooth", "Juggernaut", "Domino", "Omega Red"],
            answer: 1,
            gifID: "",
            theme: "juggernaut+x-men"
        },
        {
            question: "Skrulls have the ability to shapeshift.",
            choices: ["True", "False"],
            answer: 0,
            gifID: "",
            theme: "skrulls+marvel"
        },
        {
            question: "On what planet did hulk become a gladiator?",
            choices: ["Sakaar", "Asgard", "Klandathu", "Xandar"],
            answer: 0,
            gifID: "",
            theme: "sakaar+planet+hulk"
        },
        {
            question: "Who is Thor's brother?",
            choices: ["Loki", "Heimdel", "Skurge", "Beta Ray Bill"],
            answer: 0,
            gifID: "",
            theme: "loki+tom+hiddleson"
        },
        {
            question: "Aunt May is related to:",
            choices: ["Scott Summers", "Charles Xavier", "James Howlett", "Peter Parker"],
            answer: 3,
            gifID: "",
            theme: "aunt+may+spiderman"
        },
        {
            question: "Foggy Nelson works with:",
            choices: ["Steve Rogers", "Matt Murdoch", "Scott Summers", "Frank Castle"],
            answer: 1,
            gifID: "",
            theme: "foggy+nelson+dardevil+netflix"
        },
        {
            question: "What team of teenage superheroes sparked the first Civil War?",
            choices: ["New Warriors", "The Runaways", "Blaster's League", "Young Avengers"],
            answer: 0,
            gifID: "",
            theme: "marvel+civil+war+new+warriors"
        },

    ],
    usedQuestions: [],

    // Creates output of the question and choices
    displayQuesiton: function() {
        $("#pause").toggleClass("vis-hidden");
        $("#progress").toggleClass("vis-hidden");
        var retval = '<h3 class="text-center mb-4">';
        if (this.usedQuestions.length === 10) {
            return this.endGameDisplay();
        } else {
            this.currentRound = this.gameRounds.splice(random(this.gameRounds.length), 1)[0];
            this.usedQuestions.push(this.currentRound);
            retval += this.currentRound.question;
            retval += '</h3><div class="row" id="answers">'
            for (var i=0; i<this.currentRound.choices.length; i++) {
                retval += '<div class="col-sm-6 guess-container"><div class="guess">' + this.currentRound.choices[i] + '</div></div>';
            }
            $("#progress").html("Question " + this.usedQuestions.length + " of 10");
            return retval;
        }
    },

    selectAnswer: function(index) {
        if (!gameOver) {
            console.log(index + " " + this.currentRound.answer);
            if(index === this.currentRound.answer) {
                $("#game-content").html(this.evaluate("correct"));
                setTimeout(function() {
                    $("#game-content").html(triviaGame.displayQuesiton());
                    clock.countDown();
                }, 3000);
            } else {
                $("#game-content").html(this.evaluate("incorrect"));
                setTimeout(function() {
                    $("#game-content").html(triviaGame.displayQuesiton());
                    clock.countDown();
                }, 3000);
            }
        }
    },

    // Game Evaluation functions
    evaluate: function(outcome) {
        var retval = "";
        $("#pause").toggleClass("vis-hidden");
        $("#progress").toggleClass("vis-hidden");
        if (outcome === "correct") {
            this.rightAnswers++;
            retval += '<h3 class="result">Right On!</h3>';
        }
        if (outcome === "incorrect") {
            this.wrongAnswers++;
            retval += '<h3 class="result">Nope!</h3>';
        }
        if (outcome === "unanswered") {
            this.unanswered++;
            retval += '<h3 class="result">You have to be quicker!</h3>';
        }
        retval += '<h5 class="right-answer">The correct answer was ' + this.currentRound.choices[this.currentRound.answer] + '</h5>';
        if (this.currentRound.gifID === "") {
            giphyRandom(this.currentRound.theme);
        } else {
            giphyDisplay(this.currentRound.gifID);
        }
        return retval;
    },

    endGameDisplay: function() {
        $("#pause").toggleClass("vis-hidden");
        $("#progress").toggleClass("vis-hidden");
        gameOver = true;
        clock.stop();
        var retval = "<h3>All done, here's how you did!</h3>";
        retval += '<h4>Correct Answers: ' + this.rightAnswers + '</h4>';
        retval += '<h4>Incorrect Answers: ' + this.wrongAnswers + '</h4>';
        retval += '<h4>Unanswered: ' + this.unanswered + '</h4>';
        retval += '<button class="btn btn-lg" id="reset">Start Over?</button>';
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
            $("#game-content").html(triviaGame.evaluate("unanswered"));
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

$("#timer").html(clock.timePerQuestion);

// ====== EVENT LISTENERS ======
$(document).ready(function() {

    $("#start").on("click", function() {
        $(this).addClass("d-none");
        $("#pause").removeClass("d-none");
        $(".main-body").addClass("game-running");
        $("#game-content").css('min-height', '235px');
        $("#game-content").html(triviaGame.displayQuesiton());
        clock.countDown();
    });

    $(document).on("click", "#answers .guess-container", function() {
        var index = $(this).index();
        clock.reset();
        triviaGame.selectAnswer(index);
    });

    $(document).on("click", "#game-content #reset", function() {
        gameOver = false;
        triviaGame.gameReset();
        clock.countDown();
        $("#game-content").html(triviaGame.displayQuesiton());
        $("#timer").html(clock.timePerQuestion);
    });

    $("#pause").on("click", function() {
        $("#game-content").toggleClass("blur", 200);
        if (clock.clockRunning === true) {
            clock.stop();
            $(document).off("click", "#answers .guess-container");
            $(this).text("Resume");
        } else {
            clock.resume();
            $(document).on("click", "#answers .guess-container", function() {
                var index = $(this).index();
                triviaGame.selectAnswer(index);
            });
            $(this).text("Pause");
        }
    });

});