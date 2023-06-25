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
    question: "Norte, sul, leste e?",
    answers: [
      { text: "Nordeste", correct: false },
      { text: "Suldeste", correct: false },
      { text: "Oeste", correct: true },
      { text: "Nenhuma das anteriores", correct: false }
    ]
  },
  {
    question: "Qual é o maior oceano do mundo?",
    answers: [
      { text: "Oceano Atlânticos", correct: false },
      { text: "Oceano Índico", correct: false },
      { text: "Oceano Pacífico", correct: true },
      { text: "Oceano Glacial Ártico", correct: false }
    ]
  },
  {
    question: 'Quais são as estações do ano? ',
    answers: [
      { text: 'Primavera, Verão, outono e inverno.', correct: true },
      { text: 'Primavera, verão e inverno.', correct: false },
      { text: 'Outono, Verão, Inverno.', correct: false },
      { text: "Primavera, Verão e Outono", correct: false }
    ]
  },
  {
    question: ' Qual o nome do conjunto de montanhas que forma uma unidade?',
    answers: [
      { text: "Montanhas", correct: false },      
      { text: "Hidrosfera", correct: false },
      { text: "Subterras", correct: false },
      { text: "Cordilheira.", correct: true },
    ]
  },
  {
    question: 'Onde nasce o Sol?',
    answers: [
      { text: 'Nasce pelo Norte.', correct: false },
      { text: 'Nasce pelo Sul.', correct: false },
      { text: 'Nasce pelo leste.', correct: true },
      { text: 'Nasce pelo Oeste.', correct: false }
    ]
  },
  {
    question: 'Em que continente está o Brasil?',
    answers: [
      { text: 'Europa', correct: false },
      { text: 'América do Sul', correct: true },
      { text: 'Asia', correct: false },
      { text: 'Oceania', correct: false }
    ]
  },
  {
    question: 'Qual o maior país do mundo? ',
    answers: [
      { text: 'Russia', correct: true },
      { text: 'Brasil', correct: false },
      { text: 'Itália', correct: false },
      { text: 'Alemanha', correct: false },
    ]
  },
  {
    question: 'Em quanto tempo a Terra dá uma volta ao redor do Sol?',
    answers: [
      { text: '8 horas', correct: false },
      { text: '1 dia', correct: false },
      { text: '10 meses', correct: false },
      { text: '1 ano', correct: true },
    ]
  },
  {
    question: 'Qual país tem a maior população do mundo?',
    answers: [
      { text: 'Estados Unidos', correct: false },
      { text: 'Vietnã', correct: false },
      { text: 'China', correct: true },
      { text: 'Brasil', correct: false },
    ]
  },
  {
    question: 'Quantas grandes ilhas compõem o Havaí?',
    answers: [
      { text: '8', correct: true },
      { text: '5', correct: false },
      { text: '10', correct: false },
      { text: '3', correct: false },
    ]
  }
]