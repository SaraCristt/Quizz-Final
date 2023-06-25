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
    question: "Quem explorou o Novo Mundo?",
    answers: [
      { text: "Heródoto", correct: false },
      { text: "Pedro Álvares Cabral", correct: false },
      { text: "Karl Marx", correct: false },
      { text: "Cristóvão Colombo", correct: true },
    ]
  },
  {
    question: "Onde está localizada a Babilônia?",
    answers: [
      { text: "Nepal", correct: false },
      { text: "Angola", correct: false },
      { text: "Iraque", correct: true },
      { text: "Paquistão", correct: false }
    ]
  },
  {
    question: 'Quem foi o primeiro homem a pisar na lua?',
    answers: [
      { text: 'Neil Armstrong', correct: true },
      { text: ' Edwin “Buzz” Aldrin', correct: false },
      { text: 'Charles “Pete” Conrad', correct: false },
      { text: "Alan Bean", correct: false }
    ]
  },
  {
    question: 'Em que oceano o Titanic afundou?',
    answers: [
      { text: "Oceano Pacífico", correct: false },
      { text: "Oceano Índico", correct: false },
      { text: "Oceano Atlânticos", correct: true },
      { text: "Oceano Glacial Ártico", correct: false }
    ]
  },
  {
    question: 'Quando o muro de Berlim foi removido?',
    answers: [
      { text: '1980', correct: false },
      { text: '1989', correct: true },
      { text: '1985', correct: false },
      { text: '1990', correct: false }
    ]
  },
  {
    question: 'Napoleão é conhecido como o Homem de Sangue e Ferro',
    answers: [
      { text: 'Falso', correct: true },
      { text: 'Verdadeiro', correct: false },
    ]
  },
  {
    question: 'A televisão foi inventada em 1972.',
    answers: [
      { text: 'Falso', correct: false },
      { text: 'Verdadeiro', correct: true },
    ]
  },
  {
    question: 'A palavra egípcia “faraó” significa literalmente “grande casa”.',
    answers: [
      { text: 'Falso', correct: false },
      { text: 'Verdadeiro', correct: true },
    ]
  },
  {
    question: 'As pirâmides de Gizé são a mais antiga das maravilhas e a única das sete substancialmente existentes hoje. ',
    answers: [
      { text: 'Falso', correct: false },
      { text: 'Verdadeiro', correct: true },
    ]
  },
  {
    question: 'A Dinastia Shang é a primeira história registrada da China. ',
    answers: [
      { text: 'Falso', correct: false },
      { text: 'Verdadeiro', correct: true },
    ]
  }
]