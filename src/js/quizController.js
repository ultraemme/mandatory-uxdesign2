import quizModel from './quizModel';
import quizView from './quizView';

let fade = document.querySelector(".fade-overlay");
let hamburger = document.querySelector(".header__menu");
let nav = document.querySelector("nav");
let main = document.querySelector("main");

init();

function init() {
  let aElements = nav.querySelectorAll("a");
  aElements[0].addEventListener("click", quizScreen);
  aElements[1].addEventListener("click", statisticsScreen);
  aElements[2].addEventListener("click", aboutScreen);
  quizScreen();

  function quizScreen() {
    quizView.renderQuiz("Quiz");
    let startQuiz = main.querySelector(".quiz-start__button");
    startQuiz.addEventListener("click", quizStart);
    hideNav();
  }
  function statisticsScreen(e) {
    quizModel.setStats(1,1);
    quizModel.setStats(2,2);
    quizModel.setStats(5,5);
    quizModel.setStats(99, 37); //ony call when actually updating stats
    quizView.renderStatistics(e.target.innerHTML, quizModel.getStats());
    hideNav();
  }
  function aboutScreen(e) {
    quizView.renderAbout(e.target.innerHTML);
    hideNav();
  }
  function quizStart() {
    //ajax request
    //default temnplate 1 time, send in model.getStats quizRound
    //for each question, call question template
  }
}


fade.addEventListener("click", hideNav);
hamburger.addEventListener("click", showNav);

function showNav() {
  fade.classList.add("fade-overlay--show");
  nav.classList.add("nav--show");
}

function hideNav() {
  fade.classList.remove("fade-overlay--show");
  nav.classList.remove("nav--show");
}