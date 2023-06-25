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
    question: "Qual é o maior animal terrestre vivo conhecido?",
    answers: [
      { text: "Elefante", correct: true },      
      { text: "Dinosauro", correct: false },
      { text: "Baleia", correct: false },
      { text: "Leão", correct: false }
    ]
  },
  {
    question: "Quem sofre de Aracnofobia tem medo de que?",
    answers: [
      { text: "Arraia", correct: false },
      { text: "Arara", correct: false },
      { text: "Aranha", correct: true },
      { text: "Alpaca", correct: false }
    ]
  },
  {
    question: 'Uma criatura do mar com oito pernas?',
    answers: [
      { text: 'Polvo', correct: true },
      { text: 'Água viva', correct: false },
      { text: 'Lula', correct: false },
      { text: "Estrela do mar", correct: false }
    ]
  },
  {
    question: 'Os peixes respiram por meio de qual órgão?',
    answers: [
      { text: "Da boca", correct: false },
      { text: "Das brânquias", correct: true },
      { text: "Das escamas", correct: false },
      { text: "Das barbatanas", correct: false },      
    ]
  },
  {
    question: 'Quantas patas tem uma aranha?',
    answers: [
      { text: '8', correct: true },
      { text: '6', correct: false },
      { text: '4', correct: false },
      { text: '2', correct: false }
    ]
  },
  {
    question: 'Qual o animal mais rápido do mundo?',
    answers: [
      { text: 'Besouro-tigre', correct: false },
      { text: 'Guepardo', correct: true },
      { text: 'Tigre siberiano', correct: false },
      { text: 'Avestruz', correct: false }
    ]
  },
  {
    question: 'Qual o único mamífero que pode voar?',
    answers: [
      { text: 'Galinha', correct: false },
      { text: 'Ornitorrinco', correct: false },
      { text: 'Morcego', correct: true },
      { text: 'Pato', correct: false },
    ]
  },
  {
    question: 'Qual é o animal mais alto do mundo?',
    answers: [
      { text: 'Lula colossal', correct: false },
      { text: 'Girafa', correct: true },
      { text: 'Baleia azul antártica', correct: false },
      { text: 'Elefante africano', correct: false },
    ]
  },
  {
    question: 'Qual é o tempo médio de vida de um cão?',
    answers: [
      { text: '3-5 anos', correct: false },
      { text: '10-13 anos', correct: true },
      { text: '14-20 anos', correct: false },
      { text: '20-25 anos', correct: false },
    ]
  },
  {
    question: 'Qual é o animal mais venenoso do mundo?',
    answers: [
      { text: 'Vespa-do-mar', correct: true },
      { text: 'Baiacu', correct: false },
      { text: 'Rã-dardo-venenoso', correct: false },
      { text: 'Aranha armadeira', correct: false },
    ]
  }
]