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
    question: "Qual a percepção presente na frase I'd rather you fixed my car?",
    answers: [
      { text: "Solicitação", correct: false },
      { text: "Arrependimento", correct: false },
      { text: "Sugestão", correct: false },
      { text: "Preferência", correct: true },
    ]
  },
  {
    question: "Na frase You think the teacher is joking? Give me a break.",
    answers: [
      { text: "Ao usar “give me a break” ou “gimme a break”, a intenção do locutor é indicar cansaço.", correct: false },
      { text: "Ao usar “give me a break” ou “gimme a break”, a intenção do locutor é indicar indignação.", correct: true },
      { text: "Ao usar “give me a break” ou “gimme a break”, a intenção do locutor é indicar aprovação.", correct: false },
      { text: "Ao usar “give me a break” ou “gimme a break”, a intenção do locutor é indicar correção.", correct: false }
    ]
  },
  {
    question: 'Na frase I could tell she hates me from the way she stared, a palavra ‘stare’ contém o sentido de:',
    answers: [
      { text: 'Aprovar / gostar de alguém ou algo', correct: false },
      { text: 'Olhar fixadamente / observar alguém ou algo', correct: true },
      { text: 'Bater em retirada / virar as costas e ir embora', correct: false },
      { text: "Desfazer de alguém ou algo / olhar com desdém", correct: false }
    ]
  },
  {
    question: 'Qual o sentido da palavra left na frase You still have a patch of hair left on your leg.',
    answers: [
      { text: "Excesso", correct: false },
      { text: "Restante", correct: true },
      { text: "Faltando", correct: false },
      { text: "Esquerda", correct: false },
    ]
  },
  {
    question: "Na frase We can hang around by the pool, 'hang around' significa:",
    answers: [
      { text: 'Nadar/ pegar uma piscina.', correct: false },
      { text: 'Bater papo / jogar conversa fora.', correct: false },
      { text: 'Passar o tempo / fica de bobeira.', correct: true },
      { text: 'Tomar sol / pegar um bronze.', correct: false }
    ]
  },
  {
    question: "Na frase Listen, mom. I'm all grown-up and (….) A palavra listen pode ser substituída sem perda da sua função enfática presente na frase por:",
    answers: [
      { text: "For God's sake.", correct: false },
      { text: "I'm telling you.", correct: false },
      { text: 'Hear me out.', correct: true },
      { text: 'Excuse me.', correct: false }
    ]
  },
  {
    question: 'Podemos dar continuidade à frase since your dad walked out com:',
    answers: [
      { text: 'Your mom could see guys like me', correct: true },
      { text: 'You will quit smoking', correct: false },
      { text: 'He kept come back', correct: false },
      { text: 'The housekeeper comes back', correct: false },
    ]
  },
  {
    question: "Na frase there's no way you can get to that level of profiency by just learning grammar and vocabulary. Qual a função de 'that'?",
    answers: [
      { text: 'Nula / poderia ser removido da frase acima sem alteração do sentido.', correct: false },
      { text: 'Relacionar / como this e that.', correct: false },
      { text: 'Indicar / dar ênfase.', correct: false },
      { text: 'Orientar / distinguir esse daquele.', correct: true },
    ]
  },
  {
    question: "Quanto a frase this ain't real, podemos tomar a seguinte decisão:",
    answers: [
      { text: "Substituir ain't por not", correct: false },
      { text: "Substituir ain't por a not.", correct: false },
      { text: "Substituir ain't por are not.", correct: false },
      { text: "Substituir ain't por is not.", correct: true },
    ]
  },
  {
    question: "Na frase I'd rather clean the house myself.",
    answers: [
      { text: 'A palavra myself indica a ajuda de alguém.', correct: false },
      { text: 'A palavra myself indica com ou sem a ajuda de alguém.', correct: false },
      { text: 'A palavra myself implica em por conta própria.', correct: true },
    ]
  }
]