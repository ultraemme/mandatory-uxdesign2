import quizModel from './quizModel';
import quizView from './quizView';

let obj = {"response_code":0,"results":[{"category":"Entertainment: Cartoon & Animations","type":"boolean","difficulty":"easy","question":"In the &quot;Shrek&quot; film franchise, Donkey is played by Eddie Murphy.","correct_answer":"True","incorrect_answers":["False"]},{"category":"History","type":"multiple","difficulty":"easy","question":"King Henry VIII was the second monarch of which European royal house?","correct_answer":"Tudor","incorrect_answers":["York","Stuart","Lancaster"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"medium","question":"In the movie &ldquo;The Iron Giant,&rdquo; this character is the protagonist.","correct_answer":"Hogarth Hughes","incorrect_answers":["Kent Mansley","Dean McCoppin","Annie Hughes"]},{"category":"Entertainment: Video Games","type":"boolean","difficulty":"hard","question":"TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy","correct_answer":"False","incorrect_answers":["True"]},{"category":"General Knowledge","type":"multiple","difficulty":"easy","question":"What do the letters in the GMT time zone stand for?","correct_answer":"Greenwich Mean Time","incorrect_answers":["Global Meridian Time","General Median Time","Glasgow Man Time"]},{"category":"Entertainment: Cartoon & Animations","type":"multiple","difficulty":"medium","question":"What is the cartoon character, Andy Capp, known as in Germany?","correct_answer":"Willi Wakker","incorrect_answers":["Dick Tingeler","Helmut Schmacker","Rod Tapper"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"Which game is NOT part of the Science Adventure series by 5pb. and Nitroplus?","correct_answer":"Occultic; Nine","incorrect_answers":["Steins; Gate","Robotics; Notes","Chaos; Child"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"hard","question":"Which game in the &quot;Monster Hunter&quot; series introduced the &quot;Insect Glaive&quot; weapon?","correct_answer":"Monster Hunter 4","incorrect_answers":["Monster Hunter Freedom","Monster Hunter Stories","Monster Hunter 2"]},{"category":"Vehicles","type":"boolean","difficulty":"medium","question":"The majority of Subaru vehicles are made in China.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"medium","question":"Which album by American rapper Kanye West contained songs such as &quot;Love Lockdown&quot;, &quot;Paranoid&quot; and &quot;Heartless&quot;?","correct_answer":"808s &amp; Heartbreak","incorrect_answers":["Late Registration","The Life of Pablo","Graduation"]}]}

let fade = document.querySelector(".fade-overlay");
let hamburger = document.querySelector(".header__menu");
let nav = document.querySelector("nav");
let header = document.querySelector("header");
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
    quizView.renderQuizForm("Quiz", quizModel.getStats().quizRound);
    document.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      for (let radio of e.target) { //fix
        if (radio.checked) {
          console.log(radio.nextElementSibling.innerHTML);
        }
      }
    })
    for (let question of obj.results) { //ajax request instead
      let questionNo = obj.results.indexOf(question) + 1;
      quizView.renderQuizQuestion(question.question, questionNo);
      for (let answer of quizModel.getAnswers(question)) {
        quizView.renderQuizQuestionAnswer(answer, questionNo);
      }
    }
  }
}


fade.addEventListener("click", hideNav);
fade.addEventListener("keypress", function (e) { //why does these not work on click
  if(e.code === "Space" || e.code === "Enter") {
    hideNav();
  }
})
hamburger.addEventListener("click", showNav);
hamburger.addEventListener("keypress", function (e) { //why does these not work on click
  if(e.code === "Space" || e.code === "Enter") {
    showNav();
  }
})

function showNav() {
  // header.setAttribute("aria-hidden", "true");
  // main.setAttribute("aria-hidden", "true");
  // nav.setAttribute("aria-hidden", "false");
  fade.classList.add("fade-overlay--show");
  nav.classList.add("nav--show");
}

function hideNav() {
  // header.setAttribute("aria-hidden", "false");
  // main.setAttribute("aria-hidden", "false");
  // nav.setAttribute("aria-hidden", "true");
  fade.classList.remove("fade-overlay--show");
  nav.classList.remove("nav--show");
}