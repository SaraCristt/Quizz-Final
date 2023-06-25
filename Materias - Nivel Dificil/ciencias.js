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
    question: "Qual é o maior órgão interno do corpo humano?",
    answers: [
      { text: "Baço", correct: false },
      { text: "Coração", correct: false },
      { text: "Estômago", correct: false },
      { text: "Fígado", correct: true },
    ]
  },
  {
    question: "Quantos dentes tem um ser humano adulto?",
    answers: [
      { text: "32", correct: true },
      { text: "36", correct: false },
      { text: "30", correct: false },
      { text: "37", correct: false }
    ]
  },
  {
    question: 'Onde estão os ossos do escafóide?',
    answers: [
      { text: 'Pescoço', correct: false },
      { text: 'Punho', correct: true },
      { text: 'Tornozelo', correct: false },
      { text: "Dedos", correct: false }
    ]
  },
  {
    question: 'Qual é o processo de divisão celular chamado para formar duas células filhas?',
    answers: [
      { text: "Descondensação", correct: false },
      { text: "Duplicação", correct: false },
      { text: "Mitose", correct: true },
      { text: "Nenhuma das alternativas", correct: false }
    ]
  },
  {
    question: ' Quantos elementos tem a tabela periódica?',
    answers: [
      { text: '118', correct: true },
      { text: '117', correct: false },
      { text: '107', correct: false },
      { text: '108', correct: false }
    ]
  },
  {
    question: 'Como são conhecidas as células que têm um núcleo celular diferenciado?',
    answers: [
      { text: 'Células procariontes', correct: false },
      { text: 'Células eucarióticas', correct: true },
    ]
  },
  {
    question: 'O que significa DNA?',
    answers: [
      { text: 'Ácido acético', correct: false },
      { text: 'Ácido fluorídrico', correct: false },
      { text: 'Ácido ribonucleico', correct: false },
      { text: 'Ácido desoxirribonucleico', correct: true },
    ]
  },
  {
    question: 'Qual é o elemento mais abundante na Terra?',
    answers: [
      { text: 'Hidrogénio', correct: true },
      { text: 'Água', correct: false },
      { text: 'Carbono', correct: false },
      { text: 'Gases', correct: false },
    ]
  },
  {
    question: 'A que reino de seres vivos pertencem as leveduras?',
    answers: [
      { text: 'Reino Monera', correct: false },
      { text: 'Reino Animal, Animalia ou Metazoa', correct: false },
      { text: 'Reino Fungi', correct: true },
      { text: 'Reino Protista ou Proctista', correct: false },
    ]
  },
  {
    question: 'De que são feitos os vírus?',
    answers: [
      { text: 'Só de material genético', correct: false },
      { text: 'Só de proteínas', correct: false },
      { text: 'Material genético e proteínas', correct: true },
      { text: 'Nenhuma dessas alternativas', correct: false },
    ]
  }
]