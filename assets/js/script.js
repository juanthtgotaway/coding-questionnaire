var starButton = document.querySelector (".start");
var timerEl = document.querySelector(".time");

function startQuiz() {
    startTimer()
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

starButton.addEventListener ("click", startQuiz);