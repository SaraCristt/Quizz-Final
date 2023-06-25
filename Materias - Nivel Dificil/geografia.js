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
    question: "Qual o nome da representação plana da Terra?",
    answers: [
      { text: "Mapa", correct: false },
      { text: "Mapa-múndi", correct: true },
      { text: "Planeta", correct: false },
      { text: "Nenhuma das alternativas", correct: false }
    ]
  },
  {
    question: "Onde estão localizados os Picos da Europa?",
    answers: [
      { text: "Nas montanhas de Oslo.", correct: false },
      { text: "Nas montanhas de Edimburgo.", correct: false },
      { text: "Nas montanhas do Estocolmo.", correct: false },
      { text: "Nas montanhas da Cantábria.", correct: true },
    ]
  },
  {
    question: 'Quais são os oceanos da terra?',
    answers: [
      { text: 'Pacífico, Atlântico, Índico e Glacial Antártico.', correct: false },
      { text: 'Pacífico, Atlântico, Índico e Glacial Ártico.', correct: false },
      { text: "Pacífico, Atlântico e Índico.", correct: false },
      { text: 'Pacífico, Atlântico, Índico, Glacial Ártico e Glacial Antártico.', correct: true },
    ]
  },
  {
    question: 'Como se chamam as metades da Terra?',
    answers: [
      { text: "Hemisfério norte e hemisfério sul.", correct: true },
      { text: "Hemisfério leste e hemisfério oeste.", correct: false },
      { text: "Hemisfério norte, hemisfério sul, hemisfério leste e hemisfério oeste.", correct: false },
      { text: "Nenhuma das alternativas", correct: false },

    ]
  },
  {
    question: 'Como se chama a linha imaginária que divide a Terra ao meio?',
    answers: [
      { text: 'Equador', correct: true },
      { text: 'Trópico de Capricórnio', correct: false },
      { text: 'Círculo Polar Ártico', correct: false },
      { text: 'Trópico de Câncer', correct: false }
    ]
  },
  {
    question: 'Em que continente está a Espanha?',
    answers: [
      { text: 'America', correct: false },
      { text: 'Europa', correct: true },
      { text: 'Asia', correct: false },
      { text: 'Oceania', correct: false }
    ]
  },
  {
    question: 'Como se chama a camada mais quente da Terra?',
    answers: [
      { text: 'Crosta', correct: false },
      { text: 'Manto', correct: false },
      { text: 'Núcleo Interno', correct: true },
      { text: 'Núcleo Externo', correct: false },
    ]
  },
  {
    question: 'Onde está localizado o maior vulcão da Terra?',
    answers: [
      { text: 'Havaí', correct: true },
      { text: 'Washington', correct: false },
      { text: 'Oregon', correct: false },
      { text: 'Alaska', correct: false },
    ]
  },
  {
    question: 'Quais são os dois países que fazem fronteira diretamente ao norte da Hungria?',
    answers: [
      { text: 'Sérvia e Romênia', correct: false },
      { text: 'Eslovênia e Croácia', correct: false },
      { text: 'Romênia e Croácia', correct: false },
      { text: 'Eslováquia e Ucrânia', correct: true },
    ]
  },
  {
    question: '.Qual país abriga o Monte Everest?',
    answers: [
      { text: 'Paquistão', correct: false },
      { text: 'Vietnã', correct: false },
      { text: 'Nepal', correct: true },
      { text: 'Camboja', correct: false },
    ]
  }
]