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
    question: "Quantos ossos tem um tubarão?",
    answers: [
      { text: "0", correct: true },
      { text: "30", correct: false },
      { text: "206", correct: false },
      { text: "504", correct: false }
    ]
  },
  {
    question: "Qual é o pássaro mais rápido do mundo?",
    answers: [
      { text: "Águia Dourada", correct: false },
      { text: "Falcão Peregrino", correct: true },
      { text: "Gyrfalcon", correct: false },
      { text: "Agulha de Garganta Branca", correct: false }
    ]
  },
  {
    question: 'As impressões digitais de qual animal se parecem exatamente com as digitais humanas?',
    answers: [
      { text: 'Leão', correct: false },
      { text: 'Gorila', correct: false },
      { text: 'Coala', correct: true },
      { text: "Macaco", correct: false }
    ]
  },
  {
    question: 'Como se chamam os animais que nascem de um ovo?',
    answers: [
      { text: "Ovíparos", correct: true },
      { text: "Vivíparos", correct: false },
      { text: "Ovovivíparos", correct: false },
    ]
  },
  {
    question: 'Como se chamam os animais que têm esqueleto articulado?',
    answers: [
      { text: 'Invertebrados', correct: false },
      { text: 'Vertebrados', correct: true },
    ]
  },
  {
    question: 'Que animal produz o som mais alto gerado por um ser vivo?',
    answers: [
      { text: 'Baleia-jubarte', correct: true },
      { text: 'Leão', correct: false },
      { text: 'Elefante', correct: false },
      { text: 'Hiena', correct: false }
    ]
  },
  {
    question: 'Qual direção as aves do norte voam durante o inverno?',
    answers: [
      { text: 'Norte', correct: false },
      { text: 'Sul', correct: true },
      { text: 'Leste', correct: false },
      { text: 'Oeste', correct: false },
    ]
  },
  {
    question: 'Que cobra e mais venenosa',
    answers: [
      { text: 'Cascavel', correct: false },
      { text: 'Coral verdadeira', correct: true },
    ]
  },
  {
    question: 'Qual raça de cão é a maior em tamanho?',
    answers: [
      { text: 'Pastor Alemão', correct: false },
      { text: 'Mastim Inglês', correct: true },
      { text: 'Teacup Chihuahua', correct: false },
      { text: 'Golden Retriever', correct: false },
    ]
  },
  {
    question: 'Onde os insetos vivem?',
    answers: [
      { text: 'Debaixo de pedras, folhas, pedaços de madeiras, etc.', correct: true },
      { text: 'Dentro de casa, em plantas, atrás da televisão, etc.', correct: false },
      { text: 'Debaixo do sofá, no banheiro, no jardim, etc.', correct: false },
      { text: 'Nenhuma dessas alternativas', correct: false },
    ]
  }
]