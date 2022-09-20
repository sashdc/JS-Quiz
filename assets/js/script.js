const startButton = document.getElementById("startbtn")
let timer = document.getElementById("timer")
let quizBox = document.getElementById("questioncontainer")
let questionElement = document.getElementById('question')
let answerButtonElement = document.getElementById("answerbuttons")


startButton.addEventListener("click", startGame);

function startGame(){
    startButton.classList.add('hide')
    quizBox.classList.remove('hide')
    nextQuestion()
    startTimer()
    }

    // sets timer and calls time up messsage function when time has elapsed
function startTimer(){
    let timeLeft=60;
    timer.textContent = "60 seconds remaining"
    let timerApp = setInterval(function(){
        timeLeft--;
        timer.textContent = `${timeLeft}  seconds remaining`;
        
        if (timeLeft === 0) {
        clearInterval(timerApp);
        timesUp()
        }
    },1000)
    }

    // clears board and begins hi-score collection when time is up
function timesUp(){
    quizBox.innerText = "Game Over"
    timer.textContent = ""
    scoreBoard()
}

function showQuestion(question){
    questionElement.innerText = questions[0].question;
    // answerButtonElement.innerText = questions.answers;
    
}


function nextQuestion(){
showQuestion()
}

function selectAnswer(){

}


let questions = [
    {
        question: "who are you?",
        answers:[
            {text: "Me", correct: true},
            {text: "You", correct: false}
        ]
    }
      ]
