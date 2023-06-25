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
    question: "Em que ano Colombo invadiu a América?",
    answers: [
      { text: "Em 1400", correct: false },
      { text: "Em 1592", correct: false },
      { text: "Em 1492", correct: true },
      { text: "Em 1500", correct: false }
    ]
  },
  {
    question: "De qual ano é a Constituição Brasileira?",
    answers: [
      { text: "De 1988", correct: true },
      { text: "De 1900", correct: false },
      { text: "De 1976", correct: false },
      { text: "De 1954", correct: false }
    ]
  },
  {
    question: 'Durante qual evento, a Coréia foi separada em 2 nações?',
    answers: [
      { text: 'Unificação do Egito.', correct: false },
      { text: 'Primeira Guerra Mundial', correct: false },
      { text: 'Segunda Guerra Mundial', correct: true },
      { text: "Primeira Guerra Sino-Japonesa", correct: false }
    ]
  },
  {
    question: 'Onde a Peste Negra trouxe o maior impacto de serviço?',
    answers: [
      { text: 'America', correct: false },
      { text: 'Europa', correct: true },
      { text: 'Asia', correct: false },
      { text: 'Oceania', correct: false }
    ]
  },
  {
    question: 'Qual país é membro dos Aliados na Segunda Guerra Mundial',
    answers: [
      { text: 'Sérvia, Rússia, França, Bélgica, Grã-Bretanha, Japão, Itália, Romênia, EUA, Brasil e etc.', correct: false },
      { text: 'Alemanha, Áustria-Hungria, Turquia e Bulgária', correct: false },
      { text: 'Alemanha, Áustria-Hungria e Itália', correct: false },
      { text: 'Grã-Bretanha, França, Rússia, China e EUA.', correct: true },
    ]
  },
  {
    question: 'Quando começou e terminou a Segunda Guerra Mundial?',
    answers: [
      { text: 'Começou em 1930 e terminou em 1937', correct: false },
      { text: 'Começou em 1939 e terminou em 1945', correct: true },
      { text: 'Começou em 1922 e terminou em 1928', correct: false },
      { text: 'Começou em 1959 e terminou em 1965', correct: false }
    ]
  },
  {
    question: 'Quando a Guerra Fria aconteceu? ',
    answers: [
      { text: '1947-1948', correct: true },
      { text: '1950-1951', correct: false },
      { text: '1972-1973', correct: false },
      { text: '1987-1988', correct: false },
    ]
  },
  {
    question: 'O Egito é chamado de Dádiva do Nilo?',
    answers: [
      { text: 'Verdadeiro', correct: true },
      { text: 'Falso', correct: false },
    ]
  },
  {
    question: 'Heródoto é conhecido como o “Pai da história”.',
    answers: [
      { text: 'Verdadeiro', correct: true },
      { text: 'Falso', correct: false },
    ]
  },
  {
    question: 'Em que anos se iniciaram e terminaram a Primeira Guerra Mundial?',
    answers: [
      { text: '1914-1918', correct: true },
      { text: '1913-1922', correct: false },
      { text: '1939-1945', correct: false },
      { text: '1952-1965', correct: false },
    ]
  }
]