var starButton = document.querySelector (".start");
var timerEl = document.querySelector(".time");
var questionBox = document.querySelector(".question-box")

var questionIndex = 0;

function startQuiz() {
    startTimer()
    showQuestions()
}

function startTimer() {
    var timeLeft = 90;
  
    var timeInterval = setInterval(function () {
      if (timeLeft > 1) {
        timerEl.textContent = 'Time Left:' + timeLeft;
        timeLeft--;
      } else if (timeLeft === 1) {
        timerEl.textContent = 'Time Left:' + timeLeft;
        timeLeft--;
      }
    }, 1000);
}

var questions = [
    { question: "Which of the following is part of a URL?", options: ["HTML", "editor", "domain", "host"], correct: "domain" },
    { question: "What is the correct file for a web page?", options: [".doc", ".ppt", ".txt", ".html"], correct: ".html" },
    { question: "How do you write a comment?", options: ["//", "**", "..", "cd"], correct: "//"},
    { question: "Block of code designed to perform a particular task or set of tasks", options: ["Array", "Variable", "Function"], correct: "Function" },
    { question: "Do you enjoy Javascript?", options: ["YES!🤩", "NO! 🥲"], correct: "NO! 🥲" },
];

function showQuestions() {
    if (questions.length > 0) {
        var currentQuestion = questions[0]; 
        var content = '<h3>' + currentQuestion.question + '</h3>';

        for (var i = 0; i < currentQuestion.options.length; i++) {
            var option = currentQuestion.options[i];
            content += '<button class="option-button" onclick="selectOption(\'' + option + '\')">' + option + '</button>';
        }

        content += '<div id="feedback"></div>';

        questionBox.innerHTML = content;
    } else {
        questionBox.innerHTML = '<h1>Quiz Completed!</h1>';
    }
}

function selectOption(selectedOption) {
    var currentQuestion = questions[0];
    if (selectedOption === currentQuestion.correct) {
        console.log("Correct Answer");
    } else {
        console.log("Incorrect Answer");
    }
    questions.shift(); 
    showQuestions(); 
}


starButton.addEventListener ("click", startQuiz);