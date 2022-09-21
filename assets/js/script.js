const startButton = document.getElementById("startbtn")
let restartButton=document.getElementById("restartbtn")
let timer = document.getElementById("timer")
let quizBox = document.getElementById("questioncontainer")
let questionElement = document.getElementById('question')
let answerButtonElement = document.getElementById("answerbuttons")
let currentQuestion = 0
let score = 0
let timeLeft = 60
let resultEl = document.getElementById("result")
let scoreCard = document.getElementById("scorecard")
let scoreSave = document.getElementById("scoresavebutton")
let inputInitial = document.getElementById("inputName")
let showScoreEl = document.getElementById("details")
let scoreList = []
// if there is a stored list it gets the items 
if (localStorage.getItem("Player1") !== null){
  scoreList=JSON.parse(localStorage.getItem("Player1"))
}

// starts the game: hides the start button, loads a question, and starts the timer
function startGame(){
    localStorage.getItem("Player1")
    startButton.classList.add('hide')
    quizBox.classList.remove('hide')
    nextQuestion()
    startTimer()
    }


    // sets timer and calls time up messsage function when time has elapsed
function startTimer(){
    timer.textContent = "60 seconds remaining"
    let timerApp = setInterval(function(){
        timeLeft--;
        timer.textContent = `${timeLeft}  seconds remaining`;
        
        if (timeLeft === 0) {
        timesUp()
        }
    },1000)
    }


    // clears board and begins hi-score collection when time is up
function timesUp(){
    quizBox.innerText = "Game Over! \n Thanks for Playing!"
    quizBox.classList.add('over')
    timer.textContent = ""
    resultEl.classList.add("hide")
    timer.classList.add('hide')
    console.log(score)
    scoreBoard()
}
// collect user initials and binds it to score
function scoreBoard(){
  scoreCard.classList.remove("hide")
  scoreSave.addEventListener('click', savePlayerscore)
  showScoreEl.textContent = "Your Score is " + score
      }
    
function savePlayerscore(){
console.log(inputInitial.value)
   let playerDetails = {
      userName: inputInitial.value,
      playerScore:  score,
    }
    scoreList.push(playerDetails)
    localStorage.setItem("Player1", JSON.stringify(scoreList))
    restartButton.classList.remove('hide')
    restartButton.addEventListener("click", startGame);
  }

function showQuestion(question){
    if (currentQuestion < questions.length) {
        let questionObject = questions[currentQuestion];
        questionElement.textContent = questionObject.question;
    
        answerButtonElement.innerHTML = "";
        for (let i = 0; i < questionObject.answers.length; i++) {
          let answerEl = document.createElement("li");
          answerEl.textContent = questionObject.answers[i];
          answerEl.addEventListener("click", () => {
            selectAnswer(questionObject.answers[i], currentQuestion);
            currentQuestion++;
            nextQuestion();
          });
          answerEl.classList.add('answerbutton')
          answerButtonElement.appendChild(answerEl);
                  }
      } else {
        timesUp()
      }
    }


function nextQuestion(){
showQuestion()
}

//sets it to equate the answer selected with the correct answer and return correct or incorrect while removing 10s for wrng answers
function selectAnswer(answer, questionIndex) {
    let resultEl = document.getElementById("result");
    resultEl.classList.remove("incorrectresult", "correctresult")
    if (questions[questionIndex].correctAnswer === answer) {
      resultEl.textContent = `Correct`;
      resultEl.classList.add("correctresult")
      score++;
    } else {
      resultEl.textContent = `Incorrect  -10s`;
      resultEl.classList.add("incorrectresult");
      timeLeft -= 10;
    }
  }



// Question and answer array(s)
const questions = [
    {
      question: "Javascript adds what to a web page?",
      correctAnswer: "Interactivity",
      answers: ["Caffeine", "Interactivity", "Aesthetics", "Structure"],
    },
    {
      question: "Which data type has values of True and False?",
      correctAnswer: "Boolean",
      answers: ["Number", "String", "Boolean", "Undefined"],
    },
    {
      question: "API is short for...",
      correctAnswer: "Application Programming Interface",
      answers: ["A pie", "Application Programming Interface", "App Parsing Interaction", "Arrays, Programs, and Internet"],
    },
    {
      question: "A for loop is an example of...",
      correctAnswer: "Iteration",
      answers: ["Iteration", "Cereal", "Highway detail", "Array"],
    },
    {
        question: "When in doubt, you should look in the...",
        correctAnswer: "DevTools",
        answers: ["Cupboard", "Mirror", "Future", "DevTools"],
      }
  ];

restartButton.classList.add('hide')
startButton.addEventListener("click", startGame);

