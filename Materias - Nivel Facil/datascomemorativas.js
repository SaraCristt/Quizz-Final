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
    question: "O que se comemora no dia 01/01?",
    answers: [
      { text: "Proclamação da república ", correct: false },
      { text: "Tiradentes", correct: false },
      { text: "Confraternização Universal", correct: true },
      { text: "Dia da bandeira", correct: false }
    ]
  },
  {
    question: "O que se comemora no dia 25/02?",
    answers: [
      { text: "Carnaval", correct: true },
      { text: "Natal", correct: false },
      { text: "Pascoa", correct: false },
      { text: "Dia Nacional do Sistema Braille", correct: false }
    ]
  },
  {
    question: 'O que se comemora no dia 10/04?',
    answers: [
      { text: 'Tiradentes', correct: false },
      { text: 'Dia do livro', correct: false },
      { text: 'Paixão de Cristo', correct: true },      
      { text: "Nenhuma das alternativas", correct: false }
    ]
  },
  {
    question: 'O dia do Trabalho é comemorado dia 01/05?',
    answers: [
      { text: "Verdadeiro", correct: true },
      { text: "Falso", correct: false }
    ]
  },
  {
    question: 'O dia da Independência do Brasilé comemorado dia 07/08?',
    answers: [
      { text: "Verdadeiro", correct: false },
      { text: "Falso", correct: true }
    ]
  },
  {
    question: 'O que se comemora no dia 12/10',
    answers: [
      { text: 'Proclamação da república', correct: false },
      { text: 'Independência do Brasil', correct: false },
      { text: 'Nsa. Sra. Aparecida/ Dia da criança ', correct: true },
      { text: 'Nenhuma das alternadivas', correct: false }
    ]
  },
  {
    question: 'O dia dos Finados é comemorado dia 02/11?',
    answers: [
      { text: "Verdadeiro", correct: true },
      { text: "Falso", correct: false }
    ]
  },
  {
    question: 'O dia da Proclamação da república é comemorado dia 15/11?',
    answers: [
      { text: "Verdadeiro", correct: true },
      { text: "Falso", correct: false }
    ]
  },
  {
    question: 'O dia do Nascimento de Jesus Cristo/Natal é comemorado dia 25/11?',
    answers: [
      { text: "Verdadeiro", correct: false },
      { text: "Falso", correct: true }
    ]
  },
  {
    question: 'O dia do Tiradentes é comemorado dia 21/04?',
    answers: [
      { text: "Verdadeiro", correct: true },
      { text: "Falso", correct: false }
    ]
  }
]