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
    question: "Sobre a quantidade de água no planeta Terra, é possível concluir que a maior parte da água é encontrada?",
    answers: [
      { text: "Nas geleiras.", correct: false },
      { text: "Nos lençóis freáticos.", correct: false },
      { text: "Nos oceanos.", correct: true },
      { text: "Nos lagos e rios.", correct: false }
    ]
  },
  {
    question: "A água é uma substância encontrada em grande quantidade em nosso planeta, todavia, nem toda essa água pode ser aproveitada pelo homem. Sobre a água encontrada em nosso planeta, pode-se afirmar que:",
    answers: [
      { text: "É um recurso natural abundante essencial para a existência de vida na Terra.", correct: true },
      { text: "O desperdício da água potável não afetará a vida humana.", correct: false },
      { text: "É considerada um recurso inesgotável.", correct: false },
      { text: "Metade da superfície terrestre é coberta por água.", correct: false }
    ]
  },
  {
    question: 'A água é uma substância sem sabor, desse modo, é considerada como uma substância:',
    answers: [
      { text: 'Insípida.', correct: true },
      { text: 'Incolor.', correct: false },
      { text: 'Inodora.', correct: false },
      { text: "Transparente.", correct: false }
    ]
  },
  {
    question: 'Em um dia de muito calor, as crianças no recreio jogavam bola na quadra da escola. Um professor resolveu explicar aos estudantes por que eles transpiravam mais em dias quentes. Para tal explicação o professor usou:',
    answers: [
      { text: "A propriedade da água chamada de capilaridade.", correct: false },
      { text: "A regulação térmica.", correct: true },
      { text: "A densidade da água.", correct: false },
      { text: "A tensão superficial da água.", correct: false },
    ]
  },
  {
    question: 'Sobre o Ciclo da água, é possível defini-lo como:',
    answers: [
      { text: 'um processo de chuva no planeta, também chamado de precipitação.', correct: false },
      { text: 'um movimento contínuo que a água faz pelo meio físico e pelos seres vivos do ecossistema.', correct: true },
      { text: 'um processo em que o vapor de água é liberado pelos seres vivos.', correct: false },
      { text: 'o estado que a água pode ficar: líquido, gasoso e sólido.', correct: false }
    ]
  },
  {
    question: 'A propriedade da água responsável em garantir que um determinado inseto consiga andar sobre a água sem afundar é:',
    answers: [
      { text: 'A densidade da água.', correct: false },
      { text: 'A tensão superficial da água.', correct: true },
      { text: 'A capilaridade.', correct: false },
      { text: 'A regulação térmica.', correct: false }
    ]
  },
  {
    question: 'A água é uma substância formada por dois átomos de',
    answers: [
      { text: 'Oxigênio e um átomo de carbono.', correct: false },
      { text: 'Ferro e um átomo de oxigênio.', correct: false },
      { text: 'Carbono e um átomo de hidrogênio.', correct: false },
      { text: 'Hidrogênio e um átomo de oxigênio.', correct: true },
    ]
  },
  {
    question: 'Sobre a densidade da água, é correto afirmar que:',
    answers: [
      { text: 'A temperatura da água não altera a sua densidade.', correct: false },
      { text: 'A água mais fria é menos densa.', correct: false },
      { text: 'A água mais quente é mais densa.', correct: false },
      { text: 'A água mais quente é menos densa.', correct: true },
    ]
  },
  {
    question: 'Complete o trecho: No estado _________, as moléculas de água estão bem presas uma as outras e se movem muito pouco, elas vibram, mas sem se afastar uma das outras. Sua a forma e volume é bem definida. O estado físico da água que completa a frase é:',
    answers: [
      { text: 'Líquido', correct: false },
      { text: 'Gasoso.', correct: false },
      { text: 'Sólido ou líquido.', correct: false },
      { text: 'Sólido.', correct: true },
    ]
  },
  {
    question: 'Chamamos de mudança de estado físico da água',
    answers: [
      { text: 'a permanência dela em um estado específico.', correct: false },
      { text: 'quando os componentes da água evaporam rapidamente.', correct: false },
      { text: 'quando ocorre a localização dela, como: em oceanos, lagos e rios.', correct: false },
      { text: 'a transformação dela para os estados sólido, líquido ou gasoso.', correct: true },
    ]
  }
]