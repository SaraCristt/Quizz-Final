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
    question: "Qual dessas cobras não é venenosa?",
    answers: [
      { text: "Suciri", correct: true },
      { text: "Jararaca", correct: false },
      { text: "Rei marrom", correct: false },
      { text: "Cascavel", correct: false }
    ]
  },
  {
    question: "Qual é o maior animal terrestre?",
    answers: [
      { text: "Elefante indiano", correct: false },
      { text: "Elefante africano", correct: true },
      { text: "Rinoceronte branco", correct: false },
      { text: "Leão africano", correct: false }
    ]
  },
  {
    question: 'Qual o maior felino?',
    answers: [
      { text: 'Tigre siberiano', correct: true },
      { text: 'Cão selvagem', correct: false },
      { text: 'Gato da pérsia', correct: false },
      { text: "Leopardo", correct: false }
    ]
  },
  {
    question: 'Qual a maior raça de cachorro?',
    answers: [
      { text: "Pastor alemão", correct: false },
      { text: "Buldogue gigante da África", correct: false },
      { text: "Mastiff", correct: false },
      { text: "Kangal", correct: true }
    ]
  },
  {
    question: 'Qual o animal que mais mata humanos no mundo?',
    answers: [
      { text: 'Cobra', correct: false },
      { text: 'Mosquito', correct: true },
      { text: 'Tigre', correct: false },
      { text: 'Hipopótamo', correct: false }
    ]
  },
  {
    question: 'Qual animal simboliza o imposto de renda?',
    answers: [
      { text: 'Leão', correct: true },
      { text: 'Tartaruga', correct: false },
      { text: 'Rinoceronte', correct: false },
      { text: 'Tubarão', correct: false }
    ]
  },
  {
    question: 'Animais onívoros comem o quê?',
    answers: [
      { text: 'Tudo', correct: true },
      { text: 'Carne', correct: false },
      { text: 'Plantas', correct: false },
      { text: 'Frutas', correct: false },
    ]
  },
  {
    question: 'Ursos são excelentes caçadores que caçam veados, alces, peixes, corvos, etc.',
    answers: [
      { text: 'Verdadeiro', correct: true },
      { text: 'Falso', correct: false },
    ]
  },
  {
    question: 'Qual desses felinos não habita na Savana?',
    answers: [
      { text: 'Leoapardo', correct: false },
      { text: 'Guepardo', correct: false },
      { text: 'Onça', correct: true },
      { text: 'Leão', correct: false },
    ]
  },
  {
    question: 'Em quais grupos são classificados os insetos?',
    answers: [
      { text: 'Inseto, aracnídeos, moluscos.', correct: true },
      { text: 'Inseto, aracnídeos, lesmas.', correct: false },
      { text: 'Inseto, lesmas, camaleões.', correct: false },
    ]
  }
]