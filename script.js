// quiz questions and answers
const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Trainer Marking Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Texts Market Language", correct: false },
      { text: "Hyper Tool Markup Language", correct: false },
    ],
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "JQuery", correct: false },
      { text: "CSS", correct: true },
      { text: "XML", correct: false },
    ],
  },
  {
    question: "Which is not a programming language?",
    answers: [
      { text: "Python", correct: false },
      { text: "Java", correct: false },
      { text: "Git", correct: true },
      { text: "C++", correct: false },
    ],
  },
  {
    question: 'What does "www" stand for in a website browser?',
    answers: [
      { text: "World War Web", correct: false },
      { text: "World Wide Web", correct: true },
      { text: "Western Washington World", correct: false },
      { text: "Wild Wild West", correct: false },
    ],
  },
  {
    question: "Which of the following is a database management software?",
    answers: [
      { text: "MySQL", correct: true },
      { text: "HTML", correct: false },
      { text: "JavaScript", correct: false },
      { text: "PHP", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// Initializes the quiz

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

// Displays the current question and answers
function showQuestion() {
  resetstate();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetstate() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Handles selecting an answer
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

// Displays final score and restart the quiz
function showScore() {
  resetstate();
  questionElement.innerHTML = `You Scored ${score} Out Of ${questions.length} !`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function hadleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    hadleNextButton();
  } else {
    startQuiz();
  }
});

// Start the quiz
startQuiz();
