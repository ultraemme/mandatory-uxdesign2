export default function quizQuestionTemplate(question, questionNo) {
  return `<div class="quiz__question-${questionNo}">
            <div class="quiz__question-container" tabindex="0"><strong>Q${questionNo}.</strong> ${question}</div>
            <div class="quiz__answers-container"></div>
          </div>`
}