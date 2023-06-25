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
    question: "A capital dos Emirados Árabes Unidos é:",
    answers: [
      { text: "Dubai", correct: false },
      { text: "Doha", correct: false },
      { text: "Istambul", correct: false },
      { text: "Abu Dhabi", correct: true }
    ]
  },
  {
    question: "O que é uma bacia hidrográfica?",
    answers: [
      { text: "É tipo uma hidromassagem, mas em formato de bacia", correct: false },
      { text: "Instrumento para medir o volume de água nos rios", correct: false },
      { text: "Área ou região de drenagem de um rio principal e seus afluentes", correct: true },
      { text: "Exercício realizado por uma turma de hidroginástica, utilizando uma bacia", correct: false }
    ]
  },
  {
    question: 'O barômetro é um instrumento científico utilizado para...',
    answers: [
      { text: 'Calcular a área de uma superfície', correct: false },
      { text: 'Medir a pressão atmosférica', correct: true },
      { text: 'Determinar a temperatura em um certo ponto da Terra', correct: false },
      { text: "Identificar os acidentes geográficos de uma porção de terreno", correct: false }
    ]
  },
  {
    question: 'O que existe em comum entre o México, o Panamá e a Guatemala?',
    answers: [
      { text: "Todos estão localizados na América do Norte", correct: false },
      { text: "Todos ficam na Europa", correct: false },
      { text: "Todos estão localizados na América Central", correct: false },
      { text: "Todos eles têm capitais com o mesmo nome do país", correct: true }
    ]
  },
  {
    question: 'O que é um cartógrafo?',
    answers: [
      { text: 'Pessoa que elabora mapas ou cartas geográficas', correct: true },
      { text: 'Aparelho utilizado para confecção de mapas com precisão', correct: false },
      { text: 'Instrumento que define a razão entre o tamanho do mapa e o que se tem na realidade', correct: false },
      { text: 'Funcionário do IBGE responsável por coletar estatísticas', correct: false }
    ]
  },
  {
    question: 'O maior oceano da Terra é o...',
    answers: [
      { text: 'Oceano Pacífico', correct: true },
      { text: 'Oceano Atlântico', correct: false },
      { text: 'Oceano Índico', correct: false },
      { text: 'Oceano Glacial Antártico', correct: false }
    ]
  },
  {
    question: 'A cidade de Machu Picchu, conhecida pelas sofisticadas muralhas de pedra contínuas, fica em qual país?',
    answers: [
      { text: 'Bolívia', correct: false },
      { text: 'Venezuela', correct: false },
      { text: 'Colômbia', correct: false },
      { text: 'Peru', correct: true },
    ]
  },
  {
    question: 'Continente localizado ao sul da Europa.',
    answers: [
      { text: 'África', correct: true },
      { text: 'Ásia', correct: false },
      { text: 'América', correct: false },
    ]
  },
  {
    question: 'Que estado brasileiro que em relação a Greenwich possui no seu fuso horário menos 5 horas.',
    answers: [
      { text: 'Pará', correct: false },
      { text: 'Mato Grosso', correct: false },
      { text: 'Acre', correct: true },
    ]
  },
  {
    question: 'País localizado no extremo sul do continente africano.',
    answers: [
      { text: 'África Do Sul', correct: true },
      { text: 'Egito', correct: false },
      { text: 'Zimbábue', correct: false },
    ]
  }
]