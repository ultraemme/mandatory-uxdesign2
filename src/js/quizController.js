import quizModel from './quizModel';
import quizView from './quizView';

let data;
let fade = document.querySelector(".fade-overlay__nav");
let nav = document.querySelector("nav");
let menu = document.querySelector(".header__menu-button");
let main = document.querySelector("main");
let modal = document.querySelector(".modal");

init();

function init() {
  let navBtns = nav.querySelectorAll(".nav__navigation-button");
  navBtns[0].addEventListener("click", quizScreen);
  navBtns[1].addEventListener("click", statisticsScreen);
  navBtns[2].addEventListener("click", aboutScreen);

  let modalBtnContinue = document.querySelector(".modal__continue");
  let modalBtnRestart = document.querySelector(".modal__restart");
  modalBtnContinue.addEventListener("click", modalContinue);
  modalBtnRestart.addEventListener("click", modalRestart);

  let navExit = document.querySelector(".nav__aria--exit");
  navExit.addEventListener("click", hideNav);

  menu.addEventListener("click", showNav);
  fade.addEventListener("click", hideNav);

  quizScreen();
}

function quizScreen() {
  quizView.renderQuiz("Quiz");
  let startQuiz = document.querySelector(".quiz__start");
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
  menu.tabIndex = 0;
  removeTabIndex(modal);
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
    menu.tabIndex = -1;
    quizView.renderModal(quizModel.correctQuiz(userAnswers, data));
    document.querySelector(".modal").classList.add("modal--show");
    document.querySelector(".fade-overlay__modal").classList.add("fade-overlay__modal--show");
    addTabIndex(modal);
    removeTabIndex(main);
  } else {
    console.log("Please answer all questions!"); //add a modal
  }
}

function showNav() {
  fade.classList.add("fade-overlay__nav--show");
  menu.tabIndex = -1;
  nav.classList.add("nav--show");
  document.body.style.overflow = "hidden"; //avoid scrolling if quiz is running
  addTabIndex(nav);
  removeTabIndex(main);
}

function hideNav() {
  fade.classList.remove("fade-overlay__nav--show");
  menu.tabIndex = 0;
  nav.classList.remove("nav--show");
  document.body.style.overflow = "visible";
  removeTabIndex(nav);
  addTabIndex(main);
}

function removeTabIndex(element) {
  if (element.tabIndex === 0) {
    element.tabIndex = -1;
  }
  if (element.children) {
    for (let child of element.children) {
      removeTabIndex(child);
    }
  }
}

function addTabIndex(element) {
  if (element.tabIndex === -1) {
    element.tabIndex = 0;
  }
  if (element.children) {
    for (let child of element.children) {
      addTabIndex(child);
    }
  }
}