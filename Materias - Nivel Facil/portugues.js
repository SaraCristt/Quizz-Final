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
    question: "Quantas sílabas tem a palavra paralelepípedo?",
    answers: [
      { text: "7", correct: true },
      { text: "6", correct: false },
      { text: "8", correct: false },
      { text: "5", correct: false }
    ]
  },
  {
    question: "Qual é o plural da palavra 'qualquer'",
    answers: [
      { text: "Quaisquer", correct: true },
      { text: "Qualquer", correct: false },
      { text: "Quaisqueres", correct: false },
      { text: "Qualqueres", correct: false }
    ]
  },
  {
    question: 'Qual é o antônimo de "antônimo"?',
    answers: [
      { text: 'Homônimos', correct: false },
      { text: 'Sinônimo', correct: true },
      { text: 'Parônimos', correct: false },
    ]
  },
  {
    question: 'A sílaba tônica é a que pronunciamos com mais intensidade?',
    answers: [
      { text: "Falso", correct:  false },
      { text: "Verdadeiro", correct: true }
    ]
  },
  {
    question: 'Quantas letras há no alfabeto?',
    answers: [
      { text: '23', correct: false },
      { text: '26', correct: true },
      { text: '27', correct: false },
      { text: '24', correct: false }
    ]
  },
  {
    question: 'Qual o nome dado à pessoa que conta uma história?',
    answers: [
      { text: 'Protagonista', correct: false },
      { text: 'Narrador', correct: true },
      { text: 'Editor', correct: false },
      { text: 'Nenhuma das alternativas', correct: false }
    ]
  },
  {
    question: 'Diga um sinônimo de alegre',
    answers: [
      { text: 'Alegria', correct: false },
      { text: 'Feliz', correct: true },
      { text: 'Felicidade', correct: false },
      { text: 'Triste', correct: false },
    ]
  },
  {
    question: 'Diabete ou diabetes?(Doença.)',
    answers: [
      { text: 'Diabete', correct: false },
      { text: 'Diabetes', correct: false },
      { text: 'As duas estão certas', correct: true },
    ]
  },
  {
    question: 'Qual dos verbos abaixo está no futuro?',
    answers: [
      { text: 'Fazer', correct: false },
      { text: 'Viajar', correct: false },
      { text: 'Venderemos', correct: true },
      { text: 'Presenciou', correct: false },
    ]
  },
  {
    question: 'O coletivo de camelos é...',
    answers: [
      { text: 'Colmeia', correct: false },
      { text: 'Alcateia', correct: false },
      { text: 'Matilha', correct: false },
      { text: 'Cáfila', correct: true },
    ]
  }
]