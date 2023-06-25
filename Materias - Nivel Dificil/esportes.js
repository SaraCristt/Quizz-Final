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
    question: "Quanto tempo dura a prorrogação em um jogo de futebol?",
    answers: [
      { text: "30 minutos", correct: true },
      { text: "45 minutos", correct: false },
      { text: "60 minutos", correct: false },
      { text: "15 minutos", correct: false }
    ]
  },
  {
    question: "Quantos jogadores um time de futebol tem em jogo?",
    answers: [
      { text: "22", correct: false },
      { text: "16", correct: false },
      { text: "11", correct: true },
      { text: "7", correct: false }
    ]
  },
  {
    question: 'Quem ganhou a Copa do Mundo de 2010?',
    answers: [
      { text: 'Dinamarca', correct: false },
      { text: 'Portugual', correct: false },
      { text: "Alemanha", correct: false },
      { text: 'Espanha', correct: true },
    ]
  },
  {
    question: 'Quem é considerado o melhor jogador de basquete de todos os tempos?',
    answers: [
      { text: "Bill Russell", correct: false },
      { text: "Micheal Jordan", correct: true },
      { text: "Oscar Robertson", correct: false },
      { text: "Larry Bird", correct: false },
    ]
  },
  {
    question: 'Qual é o nome da área que é dadaa tacada no golfe?',
    answers: [
      { text: 'Rough', correct: false },
      { text: 'Fairway', correct: false },
      { text: 'O verde', correct: false },
      { text: 'Tee', correct: true },
    ]
  },
  {
    question: 'Qual é o nome do estilo de atletismo em que os corredores carregam um bastão?',
    answers: [
      { text: 'Lançamento de dardo', correct: false },
      { text: 'Salto com vara.', correct: false },
      { text: 'Corridas de revezamento.', correct: true },
      { text: 'Corridas com barreiras', correct: false }
    ]
  },
  {
    question: 'Os exercícios aeróbicos são mais recomendados para manter a forma?',
    answers: [
      { text: 'Verdadeiro', correct: true },
      { text: 'Falso', correct: false },
    ]
  },
  {
    question: 'As três áreas nas quais a yoga atua é o corpo, mente e respiração.',
    answers: [
      { text: 'Verdadeiro', correct: true },
      { text: 'Falso', correct: false },
    ]
  },
  {
    question: 'Quando foi realizada a primeira Copa do Mundo de futebol?',
    answers: [
      { text: 'Em 30 de julho de 1954, no Uruguai.', correct: false },
      { text: 'Em 17 de julho de 1940, no Uruguai.', correct: false },
      { text: 'Em 26 de julho de 1930, no Uruguai.', correct: false },
      { text: 'Em 13 de julho de 1930, no Uruguai.', correct: true },
    ]
  },
  {
    question: 'Qual desses times nunca foi campeão da NBA?',
    answers: [
      { text: 'Toronto Raptors', correct: false },
      { text: 'Portland Trail Blazers', correct: false },
      { text: 'Phoenix Suns', correct: true },
      { text: 'Cleveland Cavaliers', correct: false },
    ]
  }
]