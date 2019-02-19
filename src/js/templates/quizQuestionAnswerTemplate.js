export default function quizQuestionAnswerTemplate(answer, questionNo) {
  return `<div class="quiz__answer-container">
            <input type="radio" name="question-${questionNo}" class="quiz__radiobtn">
            <span class="quiz__question-answer">${answer}</span>
          </div>`

}