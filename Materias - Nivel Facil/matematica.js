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
    question: "Como você lê as horas quando o ponteiro pequeno do relógio está no número 7 e o ponteiro grande no número 4?",
    answers: [
      { text: "Sete e vinte ou 19:20h", correct: true },
      { text: "Sete e quarenta 19:40h", correct: false },
      { text: "Quatro e trinta e cinco 16:35h", correct: false },
      { text: "Quatro e quarenta 16:40h", correct: false }
    ]
  },
  {
    question: "Qual o nome de um polígono de três lados? ",
    answers: [
      { text: "Pentágulo", correct: false },
      { text: "Losangulo", correct: false },
      { text: "Triangulo", correct: true },
      { text: "Piramide", correct: false }
    ]
  },
  {
    question: 'Quantos minutos tem uma hora?',
    answers: [
      { text: '60 minutos', correct: true },
      { text: '70 minutos', correct: false },
      { text: '50 minutos', correct: false },
      { text: "100 minutos", correct: false }
    ]
  },
  {
    question: 'Quantas horas tem um dia?',
    answers: [
      { text: "20 horas", correct: false },
      { text: "24 horas", correct: true },
      { text: "12 horas", correct: false },
      { text: "48 horas", correct: false },
    ]
  },
  {
    question: 'Quanto é 9x9?',
    answers: [
      { text: '18', correct: false },
      { text: '81', correct: true },
      { text: '99', correct: false },
      { text: '1', correct: false }
    ]
  },
  {
    question: 'Dá na mesma multiplicar 3x4 e 4x3?',
    answers: [
      { text: 'Não da errado', correct: false },
      { text: 'Sim da na mesma', correct: true },
    ]
  },
  {
    question: 'Um número que não tem um numérico próprio?',
    answers: [
      { text: 'zero', correct: true },
      { text: 'um', correct: false },
      { text: 'dois', correct: false },
      { text: 'três', correct: false },
    ]
  },
  {
    question: '48 dividido por 4 é igual a quanto?',
    answers: [
      { text: '20', correct: false },
      { text: '12', correct: true },
      { text: '16', correct: false },
      { text: 'Nenhuma das alternativas', correct: false },
    ]
  },
  {
    question: 'Qual é o valor do Pi? ',
    answers: [
      { text: '2,14', correct: false },
      { text: '3,15', correct: false },
      { text: '3,14', correct: true },
      { text: '2,15', correct: false },
    ]
  },
  {
    question: '807+542+277 é igual a que número? ',
    answers: [
      { text: '1794', correct: false },
      { text: '2000', correct: false },
      { text: '1807', correct: false },
      { text: '1626', correct: true },
    ]
  }
]