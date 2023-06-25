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
    question: 'Em que dia é comemorado o dia das mães?',
    answers: [
      { text: "09/05", correct: true },
      { text: "08/06", correct: false },
      { text: "09/04", correct: false },
      { text: "09/01", correct: false }
    ]
  },
  {
    question: "O que se comemora no dia 21 de Abril?",
    answers: [
      { text: "Páscoa", correct: false },
      { text: "Natal", correct: false },
      { text: "Tiradentes", correct: true },
      { text: "Confraternização Universal", correct: false }
    ]
  },
  {
    question: 'O que comemoramos no dia 15/11?',
    answers: [
      { text: 'Dia das Crianças.', correct: false },
      { text: 'Proclamação da Repulblica.', correct: true },
      { text: 'Dia dos Pais.', correct: false },
      { text: "Independência do Brasil.", correct: false }
    ]
  },
  {
    question: 'Em que data é comemorado o dia da Paixão?',
    answers: [
      { text: "04/04", correct: false },
      { text: "21/04", correct: false },
      { text: "13/04", correct: false },
      { text: "02/04", correct: true },
    ]
  },
  {
    question: 'Quаіѕ аѕ trêѕ соmеmоrаçõеѕ dе аbrіl?',
    answers: [
      { text: 'Nаtаl, Тrаbаlhо е Соrрuѕ Сhrіѕtі.', correct: false },
      { text: 'Саrnаvаl, Соnfrаtеrnіzаçãо Unіvеrѕаl е Fіnаdоѕ', correct: false },
      { text: 'Раіхãо, Тіrаdеntеѕ е Рáѕсоа.', correct: true },
      { text: 'Сrіаnçаѕ, Іndереdênсіа е Тrаbаlhо.', correct: false }
    ]
  },
  {
    question: 'О dіа 02 dе аbrіl é о dіа Іntеrnасіоnаl dо lіvrо іnfаntіl, е é dеdісаdо а quаl dоѕ еѕсrіtоrеѕ аbаіхо?',
    answers: [
      { text: 'Реdrо Ваndеіrа', correct: false },
      { text: 'Маrіо Quіntаnа', correct: false },
      { text: 'Ruth Rосhа', correct: false },
      { text: 'Наnѕ Сhrіѕtіаn Аndеrѕеn', correct: true },
    ]
  },
  {
    question: 'O que se comemora no dia 12 de junho?',
    answers: [
      { text: 'finados', correct: false },
      { text: 'Dia das maes', correct: false },
      { text: 'Dia dos Namorados', correct: true },
      { text: 'Dia da bandeira.', correct: false },
    ]
  },
  {
    question: 'Que data se comemora o dia do indio?',
    answers: [
      { text: '19/04', correct: true },
      { text: '20/05', correct: false },
      { text: '31/02', correct: false },
      { text: '25/06', correct: false },
    ]
  },
  {
    question: 'Em que mês se comemora o natal?',
    answers: [
      { text: 'Março', correct: false },
      { text: 'Abril', correct: false },
      { text: 'Novembro', correct: false },
      { text: 'Desembro', correct: true },
    ]
  },
  {
    question: 'Dia Das Bandeiras é comemorado dia?',
    answers: [
      { text: '9 de fevereiro', correct: false },
      { text: '23 de janeiro', correct: false },
      { text: '19 de novembro', correct: false },
      { text: '30 de maio', correct: true },
    ]
  }
]