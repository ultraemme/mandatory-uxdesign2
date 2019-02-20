import quizModel from './quizModel';
import quizView from './quizView';

let data;
let fade = document.querySelector(".fade-overlay__nav");
let nav = document.querySelector("nav");

init();

function init() {
  let aElements = nav.querySelectorAll("a");
  aElements[0].addEventListener("click", quizScreen);
  aElements[1].addEventListener("click", statisticsScreen);
  aElements[2].addEventListener("click", aboutScreen);

  let modalBtnContinue = document.querySelector(".modal__button--continue");
  modalBtnContinue.addEventListener("click", modalContinue)
  let modalBtnRestart = document.querySelector(".modal__button--restart");
  modalBtnRestart.addEventListener("click", modalRestart)

  document.querySelector(".header__menu--button").addEventListener("click", showNav);
  fade.addEventListener("click", hideNav);
  fade.addEventListener("keypress", function (e) { //make button
    if(e.code === "Space" || e.code === "Enter") {
      hideNav();
    }
  })
  quizScreen();
}

function quizScreen() {
  quizView.renderQuiz("Quiz");
  let startQuiz = document.querySelector(".quiz-start__button");
  startQuiz.addEventListener("click", quizStart);
  hideNav();
}

function statisticsScreen(e) {
  quizView.renderStatistics(e.target.innerHTML, quizModel.getStats());
  hideNav();
}

function aboutScreen(e) {
  quizView.renderAbout(e.target.innerHTML);
  hideNav();
}

function modalContinue() {
  document.querySelector(".modal").classList.remove("modal--show");
  document.querySelector(".fade-overlay__modal").classList.remove("fade-overlay__modal--show");
  document.querySelector("form").removeEventListener("submit", submitEvent);
  document.querySelector("form").addEventListener("submit", function(e) { //prevent default after continuing
    e.preventDefault();
  });
}

function modalRestart() {
  modalContinue();
  quizScreen();
}

function quizStart() {
  axios.get('https://opentdb.com/api.php?amount=10')
    .then(function(response) {
      data = response.data.results;
      console.log(response.data.results);
      quizView.renderQuizForm("Quiz", quizModel.getStats().quizRound + 1);
      document.querySelector("form").addEventListener("submit", submitEvent)
      for (let question of data) {
        let questionNo = data.indexOf(question) + 1;
        quizView.renderQuizQuestion(question.question, questionNo);
        for (let answer of quizModel.getAnswers(question)) {
          quizView.renderQuizQuestionAnswer(answer, questionNo);
        }
      }
      quizView.renderQuizSubmitButton();
    })
}

function submitEvent(e) {
  e.preventDefault();
  let userAnswers = [];
  for (let radio of e.target) {
    if (radio.checked) {
      userAnswers.push(radio.nextElementSibling.innerHTML);
    }
  }
  if (userAnswers.length === data.length) {
    quizView.renderModal(quizModel.correctQuiz(userAnswers, data));
    document.querySelector(".modal").classList.add("modal--show");
    document.querySelector(".fade-overlay__modal").classList.add("fade-overlay__modal--show");
  } else {
    console.log("Please answer all questions!"); //modal
  }
}

function showNav() {
  fade.classList.add("fade-overlay__nav--show");
  nav.classList.add("nav--show");
  document.body.style.overflow = "hidden"; //avoid scrolling if quiz is running
}

function hideNav() {
  fade.classList.remove("fade-overlay__nav--show");
  nav.classList.remove("nav--show");
  document.body.style.overflow = "visible";
}