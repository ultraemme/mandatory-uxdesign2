export default function quizStatisticsTemplate(stats) {
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