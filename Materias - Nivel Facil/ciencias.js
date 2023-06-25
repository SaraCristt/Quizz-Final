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
    question: "A medusa é:",
    answers: [
      { text: "Cobra", correct: false },
      { text: "Lontra", correct: false },
      { text: "Água-viva", correct: true },
      { text: "Anêmoa-do-mar", correct: false }
    ]
  },
  {
    question: "Como se chamam os animais que nascem da barriga da mãe? ",
    answers: [
      { text: "Vivíparos", correct: true },
      { text: "Ovovíparos", correct: false },
      { text: "Ovíparos", correct: false },
      { text: "Ovulíparos", correct: false }
    ]
  },
  {
    question: 'Como as plantas se alimentam?',
    answers: [
      { text: 'Fotossíntese', correct: true },
      { text: 'Clorofila', correct: false },
      { text: 'Gás Carbônico', correct: false },
      { text: "Nenhuma das alternativas", correct: false }
    ]
  },
  {
    question: 'Qual órgão usamos para respirar? ',
    answers: [
      { text: "Coração", correct: false },
      { text: "Pulmão", correct: false },
      { text: "Nariz", correct: false },
      { text: "Sistema respiratório", correct: true }
    ]
  },
  {
    question: 'Qual sistema do nosso corpo é usado para digerir alimentos?',
    answers: [
      { text: 'Boca', correct: false },
      { text: 'Sistema digestivo', correct: true },
      { text: 'Faringe', correct: false },
      { text: 'Garganta', correct: false }
    ]
  },
  {
    question: 'O que as plantas eliminam durante a noite?',
    answers: [
      { text: 'Gás carbônico e água', correct: false },
      { text: 'Dióxido de carbono.', correct: true },
      { text: 'Oxigênio e gás carbônico', correct: false },
      { text: 'Nenhuma das alternativas', correct: false }
    ]
  },
  {
    question: 'Como se chamam os animais que só se alimentam de plantas e vegetais?',
    answers: [
      { text: 'Vegáno', correct: false },
      { text: 'Onívoros ', correct: false },
      { text: 'Carnívoro', correct: false },
      { text: 'Herbívoros', correct: true },
    ]
  },
  {
    question: 'Como se chamam os animais que não têm esqueleto?',
    answers: [
      { text: 'Invertebrados', correct: true },
      { text: 'Vertebrados', correct: false },
      { text: 'Sem osso', correct: false },
      { text: 'Nenhuma das alternativas', correct: false },
    ]
  },
  {
    question: 'Quais são os sentidos do corpo humano? ',
    answers: [
      { text: 'Olfato, paladar, visão, tato e proprioceptivo.', correct: false },
      { text: 'Proprioceptivo, paladar, visão, tato e audição.', correct: false },
      { text: 'Olfato, paladar, visão, tato e audição.', correct: true },
      { text: 'Olfato, paladar, audição, tato e Proprioceptivo.', correct: false },
    ]
  },
  {
    question: 'Os seres humanos são:',
    answers: [
      { text: 'Onívoros', correct: true },
      { text: 'Herbívoros', correct: false },
      { text: 'Carnívoros', correct: false },
    ]
  }
]