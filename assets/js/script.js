const startButton = document.getElementById("startbtn")
let restartButton=document.getElementById("restartbtn")
let welcomeEl = document.getElementById("welcome")
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
let highScore = document.getElementById('highscoretable')

// starts the game: hides the start button, loads a question, and starts the timer
function startGame(){
    localStorage.getItem("Player1")
    startButton.classList.add('hide')
    welcomeEl.classList.add('hide')
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
        
        if (timeLeft <= 0) {
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
    scoreBoard()
}
// collect user initials and binds it to score
function scoreBoard(){
  scoreCard.classList.remove("hide")
  scoreSave.addEventListener('click', savePlayerscore)
  showScoreEl.textContent = `Well done! You got ${score}  point(s)!`
      }
    
function savePlayerscore(){
console.log(inputInitial.value)
   let playerDetails = {
      userName: inputInitial.value,
      playerScore:  score,
    }
    scoreList.push(playerDetails);
    localStorage.setItem("Player1", JSON.stringify(scoreList));
    generateTableHead(table, data);
    generateTable(table, scoreList)  
  }

// Makes highscore table
function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

let table = document.querySelector("table");
let data = Object.keys(scoreList[0]);



//shows question and answer buttons
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
            setTimeout(nextQuestion, 1000)
          });
          answerEl.classList.add('answerbutton')
          answerButtonElement.appendChild(answerEl);
                  }
      } else {
        timesUp();
      }
    }


function nextQuestion(){
showQuestion()
}

//sets it to equate the answer selected with the correct answer and return correct or incorrect while removing 10s for wrng answers
function selectAnswer(answer, questionIndex) {
    let resultEl = document.getElementById("result");
    resultEl.classList.remove("incorrectresult", "correctresult");
    if (questions[questionIndex].correctAnswer === answer) {
      resultEl.style.display="block";
      resultEl.textContent = `Correct`;
      resultEl.classList.add("correctresult")
      score++;
      //displays correct or incorrect notification for 1 second
    } else {
      resultEl.style.display="block";
      resultEl.textContent = `Incorrect  -10s`;
      resultEl.classList.add("incorrectresult");
      timeLeft -= 10;
    }
    let time = 1;
        let startTimer = setInterval(function() {
        time--;
        if (time <= 0){
            resultEl.style.display="none";
            clearInterval(startTimer);
        }
        
    }, 1000);

  }



// Question and answer array(s)
const questions = [
    {
      question: "What does Javascript add to a web page?",
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
      question: "What does HTML stand for?",
      correctAnswer: "Hyper Text Markup Language",
      answers: ["Hyper Text Markup Language", "Hot Tamales", "Hyperlink To Mail", "Hi Tech Mail Language"],
    },
    {
        question: "When in doubt, you should look in the...",
        correctAnswer: "DevTools",
        answers: ["Cupboard", "Mirror", "Future", "DevTools"],
      },
      {
        question: "JQuery, Bootstrap, and Moments are examples of....",
        correctAnswer: "3rd Part APIs",
        answers: ["Social Media Platforms", "3rd Part APIs", "Word Salads", "Local Storages"],
      },
      {
        question: "Which property allows you to identify each element by a unique name?",
        correctAnswer: "ID",
        answers: ["ID", "Variable", "Form", "Pointer"],
      }
  ];

restartButton.classList.add('hide')
startButton.addEventListener("click", startGame);
