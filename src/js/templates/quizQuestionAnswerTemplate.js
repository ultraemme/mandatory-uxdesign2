export default function quizQuestionAnswerTemplate(answer, questionNo) {
  return `<div class="quiz__answer-container" tabindex="-2">
            <input class="quiz__radio" type="radio" tabindex="0" aria-label="${answer}" name="question-${questionNo}">
            <span class="quiz__answer" tabindex="-2">${answer}</span>
          </div>`

}