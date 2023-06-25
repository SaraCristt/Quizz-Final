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
    question: "O dia Internacional da Mulher é comemorado em:",
    answers: [
      { text: "28/03", correct: false },
      { text: "08/03", correct: true },
      { text: "15/03", correct: false },
      { text: "10/03", correct: false }
    ]
  },
  {
    question: "Qual é o dia Mundial de Consientização do Autismo?",
    answers: [
      { text: "02/05", correct: false },
      { text: "02/02", correct: false },
      { text: "02/04", correct: true },
      { text: "20/05", correct: false }
    ]
  },
  {
    question: 'Dia 08 de abril é o dia Nacional do Sistema Braille.',
    answers: [
      { text: 'Verdadeiro', correct: true },
      { text: "Falso", correct: false }
    ]
  },
  {
    question: '21 de abril é o dia de Tiradentes.',
    answers: [
      { text: "Verdadeiro", correct: true },
      { text: "Falso", correct: false }
    ]
  },
  {
    question: 'Dia 18  de abri é comemorado:',
    answers: [
      { text: 'O dia do Índio', correct: false },
      { text: 'O dia Nacional do Livro Infantil - nacimento de Monteiro Lobato', correct: true },
      { text: 'O dia de Tiradentes', correct: false },
      { text: 'Nenhuma das alternativas', correct: false }
    ]
  },
  {
    question: 'О dіа dо Меіо Аmbіеntе é соmеmоrаdо еm.',
    answers: [
      { text: '07/04', correct: false },
      { text: '05/05', correct: false },
      { text: '05/06', correct: true },
      { text: '15/06', correct: false }
    ]
  },
  {
    question: 'Nо dіа 1º dе mаіо é fеrіаdо реlо dіа dо:',
    answers: [
      { text: 'Тіrаdеntеѕ', correct: false },
      { text: 'Índіо', correct: false },
      { text: 'Lіvrо', correct: false },
      { text: 'Тrаbаlhо', correct: true },
    ]
  },
  {
    question: 'О dіа dа Рrосlаmаçãо dа Іndереndênсіа dо Вrаѕіl é...',
    answers: [
      { text: '07/09', correct: true },
      { text: '17/09', correct: false },
      { text: '07/12', correct: false },
      { text: '07/08', correct: false },
    ]
  },
  {
    question: 'О dіа 20 dе nоvеmbrо é о dіа dа:',
    answers: [
      { text: 'Рrеѕеrvаçãо dа Nаturеzа', correct: false },
      { text: 'Соnѕсіênсіа Nеgrа', correct: true },
      { text: 'Рrосlаmаçãо dа Rерúblіса', correct: false },
      { text: 'Ваndеіrа', correct: false },
    ]
  },
  {
    question: 'О dіа Nасіоnаl dа Реѕѕоа соm Dеfісіênсіа Vіѕuаl é соmеmоrаdо еm 13 dе dеzеmbrо.',
    answers: [
      { text: 'Verdadeiro', correct: true },
      { text: "Falso", correct: false }
    ]
  }
]