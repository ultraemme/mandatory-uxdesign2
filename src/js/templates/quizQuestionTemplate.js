export default function quizQuestionTemplate(question, questionNo) {
  return `<div class="quiz__question-${questionNo}" tabindex="-2">
            <div class="quiz__question-container" tabindex="0"><strong tabindex="-2">Q${questionNo}.</strong> ${question}</div>
            <div class="quiz__answers-container" tabindex="-2"></div>
          </div>`
}