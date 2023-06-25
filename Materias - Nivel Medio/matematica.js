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
    question: "Dividindo-se uma unidade em 10 partes iguais, cada uma dessas partes é chamada de...",
    answers: [
      { text: "Decímetro", correct: false },
      { text: "Centímetro", correct: false },
      { text: "Denominador", correct: false },
      { text: "Décimo", correct: true },
    ]
  },
  {
    question: " Em matemática, 'faces' são:",
    answers: [
      { text: "Os polígonos que delimitam um sólido", correct: true },
      { text: "Todos os números maiores que 1000", correct: false },
      { text: "Todos os números que possuem raiz quadrada inteira", correct: false },
      { text: "Quaisquer objetos em formato de cone", correct: false }
    ]
  },
  {
    question: 'Uma figura plana é aquela que possui...',
    answers: [
      { text: 'Duas dimensões', correct: true },
      { text: 'Três lados', correct: false },
      { text: 'Quatro lados', correct: false },
      { text: "Três dimensões", correct: false }
    ]
  },
  {
    question: 'Qual dos conceitos abaixo diz respeito a juro?',
    answers: [
      { text: "Valor mensal gasto por uma empresa", correct: false },
      { text: "Renda ou rendimento de capital investido", correct: true },
      { text: "Porcentagem do salário de um funcionário", correct: false },
      { text: "Compra à vista no cartão de débito", correct: false },
    ]
  },
  {
    question: 'Qual dos objetos abaixo geralmente não possui formato cilíndrico?',
    answers: [
      { text: 'Lata de extrato de tomate', correct: false },
      { text: 'Lata de sardinha', correct: true },
      { text: 'Lata de ervilha', correct: false },
      { text: 'Lata de refrigerante', correct: false }
    ]
  },
  {
    question: 'Qual dos objetos abaixo não possui forma esférica?',
    answers: [
      { text: 'Bola de tênis', correct: false },
      { text: 'Bola de ping pong', correct: false },
      { text: 'Bola de futebol americano', correct: true },
      { text: 'Bola de futebol', correct: false }
    ]
  },
  {
    question: 'O que é uma equação?',
    answers: [
      { text: 'São duas figuras de mesmo tamanho', correct: false },
      { text: 'Igualdade envolvendo apenas números', correct: false },
      { text: 'Qualquer expressão onde exista o sinal de igual', correct: false },
      { text: 'Igualdade envolvendo uma ou mais incógnitas', correct: true },
    ]
  },
  {
    question: 'Quantos quartos de quilo existe em um quilo?',
    answers: [
      { text: '1', correct: false },
      { text: '2', correct: false },
      { text: '3', correct: false },
      { text: '4', correct: true },
    ]
  },
  {
    question: 'Em um projeto para a construção de um cinema, os arquitetos estão avaliando a relação entre a quantidade de fileiras e a quantidade de cadeiras em cada fileira. O projeto inicial prevê uma sala para 304 pessoas. No caso de utilizarem 19 fileiras, o número de cadeiras por fileira será',
    answers: [
      { text: '16', correct: true },
      { text: '15', correct: false },
      { text: '14', correct: false },
      { text: '13', correct: false },
    ]
  },
  {
    question: 'O nome do resultado de uma multiplicação é produto?',
    answers: [
      { text: 'Verdadeiro', correct: true },
      { text: 'Falso', correct: false },
    ]
  }
]