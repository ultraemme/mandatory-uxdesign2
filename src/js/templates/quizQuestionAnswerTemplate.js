export default function quizQuestionAnswerTemplate(answer, questionNo) {
  return `<div class="quiz__answer-container">
            <input class="quiz__radio" type="radio" tabindex="0" aria-label="${answer}" name="question-${questionNo}">
            <span class="quiz__answer">${answer}</span>
          </div>`

}