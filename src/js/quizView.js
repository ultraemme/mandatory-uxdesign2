import quizMain from './templates/quizMainTemplate';
import quizStatistics from './templates/quizStatisticsTemplate';
import quizAbout from './templates/quizAboutTemplate';
import quizMainStarted from './templates/quizMainStartedTemplate';
import quizQuestion from'./templates/quizQuestionTemplate';
import quizQuestionAnswer from'./templates/quizQuestionAnswerTemplate';

export default {
  renderQuiz(title) {
    let main = document.querySelector("main");
    let headerTitle = document.querySelector(".header__title");
    main.innerHTML = quizMain();
    headerTitle.innerHTML = title;
  },
  renderQuizForm(title, round) {
    let main = document.querySelector("main");
    let headerTitle = document.querySelector(".header__title");
    main.innerHTML = quizMainStarted(round);
    headerTitle.innerHTML = title;
  },
  renderQuizQuestion(question, questionNo) {
    let form = document.querySelector("form");
    form.innerHTML += quizQuestion(question, questionNo);
  },
  renderQuizQuestionAnswer(answer, questionNo) {
    let questionContainer = document.querySelector(`.quiz__question-${questionNo} .quiz__answers-container`);
    questionContainer.innerHTML += quizQuestionAnswer(answer, questionNo);
  },
  renderStatistics(title, stats) {
    let main = document.querySelector("main");
    let headerTitle = document.querySelector(".header__title");
    main.innerHTML = quizStatistics(stats);
    headerTitle.innerHTML = title;
  },
  renderAbout(title) {
    let main = document.querySelector("main");
    let headerTitle = document.querySelector(".header__title");
    main.innerHTML = quizAbout();
    headerTitle.innerHTML = title;
  }
}