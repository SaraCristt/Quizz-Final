const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: 'O animal que late é o "dog"?',
    answers: [
      { text: "Falso", correct: false },
      { text: "Verdade", correct: true },
    ]
  },
  {
    question: 'Como se escreve "maça" em inglês?',
    answers: [
      { text: "Apple", correct: true },
      { text: "Melon", correct: false },
      { text: "Strawberry", correct: false },
      { text: "Orange", correct: false }
    ]
  },
  {
    question: ' A cor "azul" se escreve:',
    answers: [
      { text: 'White', correct: false },
      { text: 'Red', correct: false },
      { text: 'Blue', correct: true },
      { text: "Yellow", correct: false }
    ]
  },
  {
    question: 'Qual animal que gosta de banana?',
    answers: [
      { text: "Butterfly", correct: false },
      { text: "Monkey", correct: true },
      { text: "Dog", correct: false },
      { text: "Cat", correct: false },
    ]
  },
  {
    question: 'Ao acordar dizemos…',
    answers: [
      { text: 'Good Afternoon', correct: false },
      { text: 'Good Morning', correct: true },
      { text: 'Good Nigth', correct: false },
      { text: 'Good Evening', correct: false }
    ]
  },
  {
    question: 'Qual a cor do sol?',
    answers: [
      { text: 'Red', correct: false },
      { text: 'Green', correct: false },
      { text: 'Purple', correct: false },
      { text: 'Yellow', correct: true },
    ]
  },
  {
    question: 'Vive na selva',
    answers: [
      { text: 'Cat', correct: false },
      { text: 'Dog', correct: false },
      { text: 'Fish', correct: false },
      { text: 'Lion', correct: true },
    ]
  },
  {
    question: 'Quanto é 1+1?',
    answers: [
      { text: 'Five', correct: false },
      { text: 'Two', correct: true },
      { text: 'One', correct: false },
      { text: 'Six', correct: false },
    ]
  },
  {
    question: 'Ao ganhar um presente, dizemos?',
    answers: [
      { text: 'Thank You', correct: true },
      { text: "I'm Sorry", correct: false },
      { text: 'Come in', correct: false },
      { text: 'Stand up', correct: false },
    ]
  },
  {
    question: 'Ao nos despedirmos, falamos o quê?',
    answers: [
      { text: 'Hello', correct: false },
      { text: 'My name is', correct: false },
      { text: 'Thank You', correct: false },
      { text: 'Bye Bye', correct: true },
    ]
  }
]