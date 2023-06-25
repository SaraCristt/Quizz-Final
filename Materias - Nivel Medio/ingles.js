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
    question: "They walked the ____________ park together.",
    answers: [
      { text: "whole", correct: true },
      { text: "hole", correct: false }
    ]
  },
  {
    question: "He dropped a __________ of paper on the floor.",
    answers: [
      { text: "piece", correct: true },
      { text: "peace", correct: false },
    ]
  },
  {
    question: 'They make a great couple; their personalities are a great _______________ to one another.',
    answers: [
      { text: 'complement', correct: true },
      { text: 'compliment', correct: false },
    ]
  },
  {
    question: 'I caught a big fish yesterday with my _________ hands.',
    answers: [
      { text: "bear", correct: false },
      { text: "bare", correct: true }
    ]
  },
  {
    question: 'Will that be a __________ hope?',
    answers: [
      { text: 'vein', correct: false },
      { text: 'vain', correct: true },
    ]
  },
  {
    question: 'There is a __________ in her hair.',
    answers: [
      { text: 'not', correct: false },
      { text: 'knot', correct: true },
    ]
  },
  {
    question: 'Jogging is good for my _________.',
    answers: [
      { text: 'sole', correct: false },
      { text: 'soul', correct: true },
    ]
  },
  {
    question: 'My cat was crazily chasing his _________ while I was reading a fairy _________ to my children.',
    answers: [
      { text: 'tale / tail', correct: false },
      { text: 'tail / tale', correct: true },
    ]
  },
  {
    question: 'There is no __________ way to ________ a great novel.',
    answers: [
      { text: 'right / write', correct: true },
      { text: 'write / right', correct: false },
    ]
  },
  {
    question: 'A complete ____________ document was published in Stockholm.',
    answers: [
      { text: 'Finish', correct: false },
      { text: 'Finnish', correct: true },
    ]
  }
]