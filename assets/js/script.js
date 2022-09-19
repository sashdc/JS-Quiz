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
    }

function showQuestion(question){
    questionElement.innerText = questions[0].question;
    // questions.answers.array.forEach(answer => {
    //     let button = document.createElement('button')
    //     button.innerText = answer.text
    //     button.classList.add('button')
    //     if (answer.correct) {
    //         button.dataset.correct = answer.correct
    //     }
        
        
        
    // });
    
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