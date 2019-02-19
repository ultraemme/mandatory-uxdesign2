export default {
  stats: {
    "quizRound": 0,
    "correct": 0,
    "incorrect": 0
  },
  setStats(correct, incorrect) {
    this.stats.quizRound++;
    this.stats.correct += correct;
    this.stats.incorrect += incorrect;
    this.stats.answerRatio =
      Math.round(this.stats.correct / (this.stats.correct + this.stats.incorrect) * 100);
  },
  getStats() {
    return this.stats;
  }
}