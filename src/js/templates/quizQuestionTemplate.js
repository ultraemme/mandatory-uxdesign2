export default function quizQuestionTemplate(question, questionNo) {
  return `<div class="quiz__question-${questionNo}">
            <span class="quiz__question-container">Q${questionNo}. ${question}</span>
            <div class="quiz__answers-container"></div>
          </div>`
}