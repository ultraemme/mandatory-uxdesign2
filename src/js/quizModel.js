export default {
  stats: {
    "quizRound": 1,
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
  }
}