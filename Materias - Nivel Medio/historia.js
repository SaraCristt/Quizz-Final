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
    question: "Entre os princípios do movimento Iluminista estão:",
    answers: [
      { text: "A liberdade de expressão e o mercantilismo.", correct: false },
      { text: "A servidão e a fé religiosa.", correct: false },
      { text: "A manutenção da Igreja Católica e seus métodos.", correct: false },
      { text: "A liberdade religiosa e o uso da razão.", correct: true },
    ]
  },
  {
    question: "O que foi o Iluminismo?",
    answers: [
      { text: "Movimento social contrário à industrialização no final século XIX na Europa.", correct: false },
      { text: "Movimento intelectual que surgiu durante o século XVIII na Europa.", correct: true },
      { text: "Movimentos socialistas que surgiram no século XIX na Europa.", correct: false },
      { text: "Movimento operário no século XIX na Europa.", correct: false }
    ]
  },
  {
    question: 'Nome de nossa terra atribuído por algumas tribos indígenas, no período anterior à chegada dos portugueses ao Brasil:',
    answers: [
      { text: 'Terra dos Papagaios', correct: false },
      { text: 'Terra do Pau Brasil', correct: false },
      { text: 'Pindorama', correct: true },
      { text: "Terra de Santa Cruz", correct: false }
    ]
  },
  {
    question: 'Quem decretou o Bloqueio Continental, impedindo o acesso a portos, em 21 de novembro de 1806?',
    answers: [
      { text: "D. João VI", correct: false },
      { text: "Napoleão Bonaparte", correct: true },
      { text: "D. Pedro I", correct: false },
      { text: "Alexandre I da Rússia", correct: false },
    ]
  },
  {
    question: 'O feudalismo foi um sistema econômico, social e político na:',
    answers: [
      { text: 'Pré-História', correct: false },
      { text: 'Idade Moderna', correct: false },
      { text: 'Idade Antiga', correct: false },
      { text: 'Idade Média', correct: true },
    ]
  },
  {
    question: 'São eventos que marcam o Período Regencial no Brasil (1831 – 1840):',
    answers: [
      { text: 'Regência Trina Provisória, Regência Trina Permanente, Regência Una de Feijó e Regência Una de Araújo Lima.', correct: true },
      { text: 'Foi instituído o Parlamentarismo no Brasil.', correct: false },
      { text: 'Início do Ciclo da Borracha no Brasil.', correct: false },
      { text: 'D. Pedro I é proclamado imperador do Brasil.', correct: false }
    ]
  },
  {
    question: 'Quem foi o principal líder da Guerra dos Canudos?',
    answers: [
      { text: 'Tiradentes', correct: false },
      { text: 'Antonio de Souza Neto', correct: false },
      { text: 'Lucas de Oliveira', correct: false },
      { text: 'Antônio Conselheiro', correct: true },
    ]
  },
  {
    question: 'Роr quе о hоmеm dеіхоu dе ѕеr nômаdе е vіrоu ѕеdеntárіо?',
    answers: [
      { text: 'Роrquе еlе еѕtаvа саnѕаdо dе саçаr е соmеçоu а ѕоbrеvіvеr ареnаѕ dа аgrісulturа.', correct: false },
      { text: 'Роrquе аѕ mulhеrеѕ fоrаm саçаr nо lugаr dоѕ hоmеnѕ, роіѕ hаvіа umа trоса.', correct: false },
      { text: 'Роrquе еlе рrосurоu саçаr ареnаѕ реrtо dаѕ саvеrnаѕ.', correct: false },
      { text: 'Роrquе о сlіmа dо lосаl соmеçоu а mudаr, соm іѕѕо fоrmаrаm dеѕеrtоѕ, е аѕѕіm а саçа dіmіnuіu.', correct: true },
    ]
  },
  {
    question: 'Quаіѕ аrmаѕ еrаm utіlіzаdаѕ nо реríоdо раlеоlítісо?',
    answers: [
      { text: 'Аrmаѕ dе fоgо', correct: false },
      { text: 'Масhаdоѕ е fасõеѕ', correct: false },
      { text: 'Аrmаѕ fеіtаѕ dе реdrа lаѕсаdа е аrсо е flесhа', correct: true },
      { text: 'Аrmаѕ fеіtаѕ dе реdrа роlіdа, оѕѕоѕ е mаdеіrа', correct: false },
    ]
  },
  {
    question: 'Nо Реríоdо Nеоlítісо, ѕurgіu а аgrісulturа. Quаіѕ аlіmеntоѕ еrаm mаіѕ сultіvаdоѕ?',
    answers: [
      { text: 'Тrіgо, сеntеіо е сеvаdа.', correct: true },
      { text: 'Тоmаtеѕ, сеbоlаѕ е bаtаtаѕ.', correct: false },
      { text: 'Маndіосаѕ, mіlhоѕ е fеіјõеѕ.', correct: false },
      { text: 'А аgrісulturа dеіхоu dе ѕеr útіl, е еlеѕ rеtоrnаrаm а trаzеr а саçа соmо únіса fоntе dе аlіmеntоѕ.', correct: false },
    ]
  }
]