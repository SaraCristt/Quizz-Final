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
    question: "O nome do símbolo * é:",
    answers: [
      { text: "Asterix", correct: false },
      { text: "Obelix", correct: false },
      { text: "Asterisco", correct: true },
      { text: "Asterístico", correct: false }
    ]
  },
  {
    question: "O que é um hiato?",
    answers: [
      { text: "Duas vogais contíguas que pertencem a sílabas diferentes", correct: true },
      { text: "Duas consoantes iguais na mesma palavra", correct: false },
      { text: "Embarcação utilizada para lazer no mar", correct: false },
      { text: "Um pássaro da África", correct: false }
    ]
  },
  {
    question: 'Gíria é...',
    answers: [
      { text: 'Lingua especial de um grupo social ou etário', correct: true },
      { text: 'duas vogais contíguas que pertencem a sílabas diferentes', correct: false },
      { text: 'Duas consoantes iguais na mesma palavra', correct: false },
      { text: "Fêmea do sapo", correct: false }
    ]
  },
  {
    question: 'Algo frágil, delicado e sensível pode ser chamado de:',
    answers: [
      { text: "Engenho", correct: false },
      { text: "Melindre", correct: true },
      { text: "Regalo", correct: false },
      { text: "Mazela", correct: false },
    ]
  },
  {
    question: 'Quais as palavras abaixo estão relacionadas com o substantivo "antro"?',
    answers: [
      { text: 'Animal, vegetal', correct: false },
      { text: 'Gruta, caverna', correct: true },
      { text: 'Esportes, movimento', correct: false },
      { text: 'Amizade, carinho', correct: false }
    ]
  },
  {
    question: 'Um sujeito malcriado, desrespeitoso no que diz ou nas atitudes que toma, é chamado de:',
    answers: [
      { text: 'Sagaz', correct: false },
      { text: 'Insolente', correct: true },
      { text: 'Erudito', correct: false },
      { text: 'Venerado', correct: false }
    ]
  },
  {
    question: 'Qual é o feminino de cavaleiro?',
    answers: [
      { text: 'Égua', correct: false },
      { text: 'Cavala', correct: false },
      { text: 'Amazona', correct: true },
      { text: 'Nenhuma dessas alternativas', correct: false },
    ]
  },
  {
    question: 'Qual é a parte da gramática que estuda a interpretação do significado de uma palavra, de uma frase ou de uma expressão em um determinado contexto?',
    answers: [
      { text: 'Interjeição', correct: false },
      { text: 'Romântica', correct: false },
      { text: 'Preposição', correct: false },
      { text: 'Semântica', correct: true },
    ]
  },
  {
    question: 'Na oração: " PEDRO TRABALHAVA EM GOIÂNIA". O adjunto adverbial é:',
    answers: [
      { text: 'Pedro', correct: false },
      { text: 'Trabalhava', correct: false },
      { text: 'Em Goiânia', correct: true },
    ]
  },
  {
    question: '"Pedro e João ________ entraram em casa perceberam que as coisas não iam bem, pois sua irmã caçula escolhera um ________ momento para comunicar aos pais que iria viajar nas férias.',
    answers: [
      { text: 'mau, mau', correct: false },
      { text: 'mau, mal', correct: false },
      { text: 'mal, mal', correct: false },
      { text: 'mal, mau', correct: true },
    ]
  }
]