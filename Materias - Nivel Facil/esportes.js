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
    question: "Quantos jogadores existem em um time de beisebol?",
    answers: [
      { text: "10", correct: false },
      { text: "11", correct: false },
      { text: "9", correct: true },
      { text: "7", correct: false }
    ]
  },
  {
    question: "Quem ganhou a copa do mundo no ano de 2014?",
    answers: [
      { text: "Alemanha", correct: true },
      { text: "Brasil", correct: false },
      { text: "Argentina", correct: false },
      { text: "Itália", correct: false }
    ]
  },
  {
    question: 'Qual estilo de natação é o mais lento',
    answers: [
      { text: 'Peito', correct: true },
      { text: 'Costa', correct: false },
      { text: 'Borboleta', correct: false },
      { text: "Crawl", correct: false }
    ]
  },
  {
    question: 'Quando pontos vale um arremesso livre no basquete?',
    answers: [
      { text: "4", correct: false },    
      { text: "3", correct: false },
      { text: "2", correct: false },
      { text: "1", correct: true }
    ]
  },
  {
    question: 'Qual é a duração de uma partida de futebol?',
    answers: [
      { text: '45 minutos', correct: false },
      { text: '90 minutos', correct: true },
      { text: '80 minutos', correct: false },
      { text: '60 minutos', correct: false }
    ]
  },
  {
    question: 'Em que posição joga o goleiro de um time de futebol?',
    answers: [
      { text: 'O goleiro é o jogador que Ataca', correct: false },
      { text: 'O goleiro é o jogador que defende o gol', correct: true },
      { text: 'O goleiro é o jogador que faz o jogo', correct: false },
      { text: 'O goleiro é o jogador que da as técnicas para outros Jogadores', correct: false }
    ]
  },
  {
    question: 'Quanto tempo dura uma partida de handebol?',
    answers: [
      { text: '45 minutos', correct: false },
      { text: '90 minutos', correct: false },
      { text: '80 minutos', correct: false },
      { text: '60 minutos', correct: true }
    ]
  },
  {
    question: 'Quanto tempo dura um jogo de rugby?',
    answers: [
      { text: '45 minutos', correct: false },
      { text: '90 minutos', correct: false},
      { text: '80 minutos', correct: true },
      { text: '60 minutos', correct: false }
    ]
  },
  {
    question: 'Qual é o nome do esporte no qual você levanta peso?',
    answers: [
      { text: 'Halterofilismo', correct: true },      
      { text: 'Hipismo', correct: false },
      { text: 'Esgria', correct: false },
      { text: 'Badmintom', correct: false },
    ]
  },
  {
    question: 'Qual é a cor da última faixa que você pode conseguir nas artes marciais?',
    answers: [
      { text: 'Preta', correct: true },
      { text: 'Branca', correct: false },
      { text: 'Azul', correct: false },
      { text: 'Vermelho', correct: false },
    ]
  }
]