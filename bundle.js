(function () {
  'use strict';

  var quizModel = {
    stats: {
      "quizRound": 0,
      "correct": 0,
      "questionsAnswered": 0,
      "incorrect": 0,
      "answerRatio": 0
    },
    setStats(correct, incorrect) {
      this.stats.quizRound++;
      this.stats.questionsAnswered += correct + incorrect;
      this.stats.correct += correct;
      this.stats.incorrect += incorrect;
      this.stats.answerRatio =
        Math.round(this.stats.correct / (this.stats.correct + this.stats.incorrect) * 100);
    },
    getStats() {
      return this.stats;
    },
    getAnswers(obj) {
      let arr = [];
      for (let answer of obj.incorrect_answers) {
        arr.push(answer);
      }
      arr.push(obj.correct_answer);
      return this.shuffleArray(arr);
    },
    shuffleArray(arr) { //https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/
      let currentIndex = arr.length;
      let temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
      }
      return arr;
    },
    correctQuiz(userAnswers, response) {
      console.log(userAnswers, response);
      let correct = 0;
      for (let question of response) {
        if (question.correct_answer === userAnswers[response.indexOf(question)]) {
          correct++;
        }
      }
      this.setStats(correct, userAnswers.length-correct);
      return `You got ${correct} out of ${userAnswers.length-correct+correct} questions right!`
    }
  };

  function quizMainTemplate() {
    return `<button class="quiz__button quiz__start flex" aria-label="start quiz">
      <i class="material-icons quiz__start-icon" tabindex="-2">done_all</i>
      <div class="quiz__start-text" tabindex="-2">START QUIZ</div>
    </button>`
  }

  function quizStatisticsTemplate(stats) {
    return `<h2 class="stats__heading">GAMES PLAYED</h2>
          <span class="stats__stats stats--amount">${stats.quizRound}</span>
          <h2 class="stats__heading">QUESTIONS ANSWERED</h2>
          <span class="stats__stats stats--correct">${stats.questionsAnswered}</span>
          <h2 class="stats__heading">CORRECT ANSWERS</h2>
          <span class="stats__stats stats--correct">${stats.correct}</span>
          <h2 class="stats__heading">INCORRECT ANSWERS</h2>
          <span class="stats__stats stats--incorrect">${stats.incorrect}</span>
          <h2 class="stats__heading">CORRECT PERCENTAGE</h2>
          <span class="stats__stats stats--percentage">${stats.answerRatio}%</span>`
  }

  function quizAboutTemplate() {
    return `<p class="about__text">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt,
      dicta ducimus enim esse eum ex explicabo illo magni molestiae nam
      nesciunt nihil nulla officiis quos unde velit voluptatem. Expedita, similique!
    </p>
    <p class="about__text">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Ab autem deleniti dolor dolorem doloribus eaque enim hic, iusto
      labore libero maiores molestias nihil perferendis quibusdam, ratione
      repellat sapiente sed unde!
    </p>
    <p class="about__text">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolorum
      fuga neque! Accusamus aliquid amet aperiam architecto autem deleniti dolores,
      eum necessitatibus obcaecati odio perferendis quae sapiente, sequi similique
      voluptate!
    </p>`
  }

  function quizMainStartedTemplate(round) {
    return `<h2 class="quiz__header" tabindex="0">Quiz ${round}</h2>
    <form action="" tabindex="-2">
      
    </form>`
  }

  function quizQuestionTemplate(question, questionNo) {
    return `<div class="quiz__question-${questionNo}" tabindex="-2">
            <div class="quiz__question-container" tabindex="0"><strong tabindex="-2">Q${questionNo}.</strong> ${question}</div>
            <div class="quiz__answers-container" tabindex="-2"></div>
          </div>`
  }

  function quizQuestionAnswerTemplate(answer, questionNo) {
    return `<div class="quiz__answer-container" tabindex="-2">
            <input class="quiz__radio" type="radio" tabindex="0" aria-label="${answer}" name="question-${questionNo}">
            <span class="quiz__answer" tabindex="-2">${answer}</span>
          </div>`

  }

  function quizMainStartedTemplate$1() {
    return `<button type="submit" class="quiz__button quiz__submit">Done!</button>`
  }

  var quizView = {
    renderQuiz(title) {
      let main = document.querySelector("main");
      let headerTitle = document.querySelector(".header__title");
      main.innerHTML = quizMainTemplate();
      headerTitle.innerHTML = title;
    },
    renderQuizForm(title, round) {
      let main = document.querySelector("main");
      let headerTitle = document.querySelector(".header__title");
      main.innerHTML = quizMainStartedTemplate(round);
      headerTitle.innerHTML = title;
    },
    renderQuizQuestion(question, questionNo) {
      let form = document.querySelector("form");
      form.innerHTML += quizQuestionTemplate(question, questionNo);
    },
    renderQuizQuestionAnswer(answer, questionNo) {
      let questionContainer = document.querySelector(`.quiz__question-${questionNo} .quiz__answers-container`);
      questionContainer.innerHTML += quizQuestionAnswerTemplate(answer, questionNo);
    },
    renderStatistics(title, stats) {
      let main = document.querySelector("main");
      let headerTitle = document.querySelector(".header__title");
      main.innerHTML = quizStatisticsTemplate(stats);
      headerTitle.innerHTML = title;
    },
    renderAbout(title) {
      let main = document.querySelector("main");
      let headerTitle = document.querySelector(".header__title");
      main.innerHTML = quizAboutTemplate();
      headerTitle.innerHTML = title;
    },
    renderModal(string) {
      let scoreContainer = document.querySelector(".modal__score");
      scoreContainer.innerHTML = string;
    },
    renderQuizSubmitButton() {
      let form = document.querySelector("form");
      form.innerHTML += quizMainStartedTemplate$1();
    }
  };

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
    document.querySelector(".quiz__submit").classList.add("quiz__submit--disabled");
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
        document.querySelector("form").addEventListener("submit", submitEvent);
        for (let question of data) {
          let questionNo = data.indexOf(question) + 1;
          quizView.renderQuizQuestion(question.question, questionNo);
          for (let answer of quizModel.getAnswers(question)) {
            quizView.renderQuizQuestionAnswer(answer, questionNo);
          }
        }
        quizView.renderQuizSubmitButton();
      });
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

}());
