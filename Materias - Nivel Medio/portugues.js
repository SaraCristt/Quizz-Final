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
    question: "Onde vai o acento em uma palavra proparoxítona?",
    answers: [
      { text: "Na primeira sílaba.", correct: false },
      { text: "Na última sílaba.", correct: false },
      { text: "Na antepenúltima sílaba.", correct: true },
    ]
  },
  {
    question: "Como é chamado aquele que é ou foi sete vezes campeão?",
    answers: [
      { text: "Pentacampeão", correct: false },
      { text: "Hexacampeão", correct: false },
      { text: "Heptacampeão", correct: true },
      { text: "Decacampeão", correct: false }
    ]
  },
  {
    question: 'Malemolência tem a ver com...',
    answers: [
      { text: 'Moleza', correct: true },
      { text: 'Esperteza', correct: false },
      { text: 'Inteligência', correct: false },
      { text: "Felicidade", correct: false }
    ]
  },
  {
    question: 'Empatia é…',
    answers: [
      { text: "Um tipo de hepatite", correct: false },
      { text: "Um jogo que termina empatado", correct: false },
      { text: "Ao contrário de simpatia", correct: false },
      { text: "Aptidão para se identificar com o outro", correct: true }
    ]
  },
  {
    question: 'A palavra "índole" diz respeito...',
    answers: [
      { text: 'Ao caráter de uma pessoa', correct: true },
      { text: 'Á altura de uma pessoa', correct: false },
      { text: 'Ao início de um parágrafo', correct: false },
      { text: 'Ao índice de um livro', correct: false }
    ]
  },
  {
    question: 'Xenofobia consiste em uma aversão a...',
    answers: [
      { text: 'Ratos', correct: false },
      { text: 'Avião', correct: false },
      { text: 'Estrangeiros', correct: true },
      { text: 'Locais fechados', correct: false }
    ]
  },
  {
    question: 'Conversamos s̲o̲b̲r̲e̲ ̲a̲ ̲r̲e̲u̲n̲i̲ã̲o̲. É um adjunto adverbial de:',
    answers: [
      { text: 'Causa', correct: false },
      { text: 'Assunto', correct: true },
    ]
  },
  {
    question: 'Um demagogo age de forma:',
    answers: [
      { text: 'Interesseira, ambiciosa', correct: true },
      { text: 'Honesta, correta', correct: false },
      { text: 'Lenta, devagar', correct: false },
      { text: 'Elegante, requintada', correct: false },
    ]
  },
  {
    question: 'Uma pessoa que tem lisura é aquela que...',
    answers: [
      { text: 'Trabalha em um salão de beleza', correct: false },
      { text: 'É íntegra, honesta', correct: true },
      { text: 'É teimosa, insistente', correct: false },
      { text: 'Produz cosméticos', correct: false },
    ]
  },
  {
    question: 'Na frase: "Para a realização das provas do concurso, chegamos n̲o̲ ̲ô̲n̲i̲b̲u̲s̲ ̲d̲a̲s̲ ̲7̲h̲.̲ A expressão destacada refere-se a:',
    answers: [
      { text: 'Adjunto adverbial de modo', correct: false },
      { text: 'Adjunto adverbial de meio e de tempo', correct: true },
      { text: 'Adjunto adverbial de meio', correct: false },
    ]
  }
]