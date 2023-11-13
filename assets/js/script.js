var startButton = document.querySelector(".start");
var timerEl = document.querySelector(".time");
var questionBox = document.querySelector(".question-box");
var scoresDiv = document.querySelector(".scores");
var highScoreScreen = document.getElementById("highScoreScreen");
var backToQuizButton = document.getElementById("backToQuiz");
var clearScoresButton = document.getElementById("clearScores");


var timeLeft = 75;
var timeInterval;
var finalScore = 0;
var quizEnded = false;
var scoreSubmissionDiv;

//starting quiz equation 
function startQuiz() {
    timeLeft = 75;
    finalScore = 0;
    quizEnded = false;
    startButton.style.display = 'none';
    questionBox.style.display = 'block';
    startTimer();
    showQuestions();
}

//This equation starts timer and also provides the messages "Time left" and text "out of time" when it reaches 0

function startTimer() {
    timerEl.textContent = "Time Left: " + timeLeft;
    timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            timerEl.textContent = "Time Left: " + timeLeft;
        } else {
            timerEl.textContent = "OUT OF TIME!🫠";
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
}


//My questions which will be asked with options and answer provided 
var questions = [
    { question: "Which of the following is part of a URL?", options: ["HTML", "editor", "domain", "host"], correct: "domain" },
    { question: "What is the correct file for a web page?", options: [".doc", ".ppt", ".txt", ".html"], correct: ".html" },
    { question: "How do you write a comment in your code?", options: ["//", "**", "..", "cd"], correct: "//"},
    { question: "Block of code designed to perform a particular task or set of tasks", options: ["Array", "Variable", "Function"], correct: "Function" },
    { question: "Do you enjoy Javascript?", options: ["YES!🤩", "NO! 🥲"], correct: "NO! 🥲" },
];


//This makes the questions show up along with their options
function showQuestions() {
    if (questions.length > 0 && timeLeft > 0) {
        var currentQuestion = questions[0];
        var content = "<h2>" + currentQuestion.question + "</h2>";

        currentQuestion.options.forEach(function(option) {
            content += "<button class='option-button' onclick='selectOption(\"" + option + "\")'>" + option + "</button>";
        }); //creates button for the options and also a class for me to reference in the css

        content += "<div id='feedbackText'></div>";
        questionBox.innerHTML = content;
    } else {
        endQuiz();
    }
}


//This allows the selected option to either spit out correct or incorrect once a "option" has been selected
function selectOption(selectedOption) {
    var currentQuestion = questions[0];
    var feedbackElement = document.getElementById('feedbackText');

    if (selectedOption === currentQuestion.correct) {
        feedbackElement.textContent = "Correct Answer";
        finalScore++;
    } else {
        feedbackElement.textContent = "Incorrect Answer";
        timeLeft -= 15; //if answer is incorrect time subtracts 15 seconds
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        timerEl.textContent = "Time Left: " + timeLeft; //this shows the Time left on right hand side 
    }
    
    //this allows to show incorrect or correct but automatically move on to next question based on interval selected
    //without this for some reason the text doesn't load at all times allowing user to know if they chose correctly
    setTimeout(function() {
        questions.shift();
        showQuestions();
    }, 1000);
}

function endQuiz() { //this ends the quiz and removes the quiz so the next text shows up
    if (!quizEnded) {
        clearInterval(timeInterval);
        questionBox.style.display = "none";
        createScoreSection();
        quizEnded = true; 
    }
}

//this function calls to show the last section for scores
function createScoreSection() { 
    if (!scoreSubmissionDiv) {
        scoreSubmissionDiv = document.createElement('div');
        scoreSubmissionDiv.id = 'scoreSubmission';

        var allDoneHeading = document.createElement('h1');
        allDoneHeading.textContent = "ALL DONE! ✨";
        scoreSubmissionDiv.appendChild(allDoneHeading);

        var scoreHeading = document.createElement('h4');
        scoreHeading.textContent = "Your Score: ";
        scoreSubmissionDiv.appendChild(scoreHeading);

        var scoreSpan = document.createElement('span');
        scoreSpan.id = 'finalScore';
        scoreSpan.textContent = finalScore;
        scoreHeading.appendChild(scoreSpan);

        //this section is for the user information they have to be in this order as they will generate as follows
        var nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = 'userName';
        nameInput.placeholder = "Enter your initials";
        scoreSubmissionDiv.appendChild(nameInput);

        var submitButton = document.createElement('button');
        submitButton.id = 'submitButton';
        submitButton.textContent = "Submit Score";
        submitButton.addEventListener('click', saveHighScore);
        scoreSubmissionDiv.appendChild(submitButton);

        document.body.appendChild(scoreSubmissionDiv);
    } else {
        var scoreSpan = document.getElementById('finalScore');
    }
}

//this saves the users information 
function saveHighScore(){ 
    var userName = document.getElementById('userName').value;
    var score = finalScore;

    var highscores = localStorage.getItem('highscores');
    highscores = highscores ? JSON.parse(highscores) : [];

    //this adds to the highscores array 
    highscores.push({ name: userName, score: score });
    localStorage.setItem('highscores', JSON.stringify(highscores));

    showHighScores();
}

//this function allows scores that are saved to be shown on the left hand side.
function showHighScores() {
    var highscores = localStorage.getItem('highscores'); //retrieves from local storage the highscores

    if (highscores) {
        highscores = JSON.parse(highscores);
    } else {
        highscores = [];
    }

    var highscoresList = document.getElementById("highScoresList");
    highscoresList.innerHTML = ''; 

    highscores.forEach(function(score) {
        var scoreP = document.createElement('p'); //creates p tags for the names entered
        scoreP.textContent = score.name + ": " + score.score;
        highscoresList.appendChild(scoreP);
    });

    highScoreScreen.style.display = 'block';
    
    //Hides the score submission section that was created
    if (scoreSubmissionDiv) {
        scoreSubmissionDiv.style.display = 'none';
    }
}

backToQuizButton.addEventListener('click', function() {
    highScoreScreen.style.display = 'none';
    startButton.style.display = 'block';
    
    if (scoreSubmissionDiv) {
        scoreSubmissionDiv.style.display = 'block'; 
    }
});

clearScoresButton.addEventListener('click', function() {
    localStorage.setItem('highscores', JSON.stringify([])); // Clear scores
    showHighScores(); // Update the displayed list
});

startButton.addEventListener("click", startQuiz); //begins the entire equation once its "clicked"
