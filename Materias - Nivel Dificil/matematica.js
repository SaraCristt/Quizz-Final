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
    question: "Qual o nome do triângulo que tem três lados iguais?",
    answers: [
      { text: "Equilátero", correct: true },
      { text: "Isósceles", correct: false },
      { text: "Escaleno", correct: false },
      { text: "Retângulo", correct: false }
    ]
  },
  {
    question: "Cite o único número primo par?",
    answers: [
      { text: "2", correct: true },
      { text: "6", correct: false },
      { text: "8", correct: false },
      { text: "12", correct: false }
    ]
  },
  {
    question: 'Como também é chamado o perímetro de um círculo?',
    answers: [
      { text: 'Parte do círculo', correct: false },
      { text: 'Círculo', correct: false },
      { text: 'Circunferência', correct: true },
      { text: "Nenhuma das alternativas", correct: false }
    ]
  },
  {
    question: 'O que é Pi, um número racional ou irracional?',
    answers: [
      { text: "Racional", correct: false },
      { text: "Irracional", correct: true }
    ]
  },
  {
    question: 'Quantos segundos há em um dia?',
    answers: [
      { text: '80,000 segundos', correct: false },
      { text: '80,400 segundos', correct: true },
      { text: '86,400 segundos', correct: false },
      { text: '86,000 segundos', correct: false }
    ]
  },
  {
    question: 'Quantos graus há em um ângulo reto?',
    answers: [
      { text: '45 Graus', correct: false },
      { text: '360 Graus', correct: false },
      { text: '180 Graus', correct: false },
      { text: '90 Graus', correct: true },
    ]
  },
  {
    question: 'Pitágoras desenvolveu uma teoria sobre quais formas?',
    answers: [
      { text: 'Círculo', correct: false },
      { text: 'Triângulo', correct: true },
      { text: 'Quadrado', correct: false },
      { text: 'Retângulo', correct: false },
    ]
  },
  {
    question: 'Algarismos são símbolos utilizados para...',
    answers: [
      { text: 'Representação de números', correct: true },
      { text: 'Representar letras gregas', correct: false },
      { text: 'Representar figuras geométricas', correct: false },
      { text: 'Identificar as letras do alfabeto', correct: false },
    ]
  },
  {
    question: 'Na fração, o número que fica em baixo é chamado de...',
    answers: [
      { text: 'Quociente', correct: false },
      { text: 'Denominador', correct: true },
      { text: 'Fracionário', correct: false },
      { text: 'Numerador', correct: false },
    ]
  },
  {
    question: 'Em matemática, chamamos de "fator" um...',
    answers: [
      { text: 'Número negativo qualquer', correct: false },
      { text: 'Número inteiro maior que zero', correct: false },
      { text: 'Valor usado como denominador de uma fração', correct: false },
      { text: 'Número ou elemento submetido à operação de multiplicação', correct: true },
    ]
  }
]