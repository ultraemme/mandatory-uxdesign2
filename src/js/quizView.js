import quizMain from './templates/quizMainTemplate';
import quizStatistics from './templates/quizStatisticsTemplate';
import quizAbout from './templates/quizAboutTemplate';
import quizMainStarted from './templates/quizMainStartedTemplate';

export default {
  renderQuiz(title) {
    let main = document.querySelector("main");
    let headerTitle = document.querySelector(".header__title");
    main.innerHTML = quizMain();
    headerTitle.innerHTML = title;
  },
  renderQuizForm() {

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