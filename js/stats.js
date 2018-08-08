function updateScore(score) {
  var scoreAdd = score;
  if (scoreAdd === 0) return;
  var currentScore = document.querySelector("#score").innerHTML;
  var scoreLength = currentScore.toString().length;
  var updatedScore = calculateScore(currentScore, scoreAdd, scoreLength);
  document.querySelector("#score").innerHTML = updatedScore;
}

function calculateScore(currentScore, scoreAdd, scoreLength) {
  var newScore = parseInt(currentScore) + parseInt(scoreAdd);
  // Parse Score to get preceding zeros
  var updatedScore =
    "00000000000".slice(0, scoreLength - newScore.toString().length) + newScore;
  return updatedScore;
}

function updateCoin(coin) {
  var coinAdd = coin;
  if (coinAdd === 0) return;
  var currentCoin = document.querySelector("#coin").innerHTML;
  var coinLength = currentCoin.toString().length;
  var updatedCoin = calculateScore(currentCoin, coinAdd, coinLength);
  document.querySelector("#coin").innerHTML = updatedCoin;
}

function beginLevelTimer() {
  clearInterval(levelTimer)
  document.querySelector("#timer").innerHTML =390
  levelTimer = setInterval(() => {
    if (parseInt(document.querySelector("#timer").innerHTML) >0)
    updateTimer();
  }, 1000);
}

function updateTimer() {
  var currentTimer = document.querySelector("#timer").innerHTML;
  var updatedTimer = currentTimer - 1;
  document.querySelector("#timer").innerHTML = updatedTimer;
}

function addTimerPoints() {
  var currentTimer = document.querySelector("#timer").innerHTML;
  for (index = 0; index < parseInt(currentTimer); index++) {
    setTimeout(() => {
      if (document.querySelector("#timer").innerHTML > 0) {
        updateTimer();
        updateScore(10);
      }
    }, index * 10);
  }


}


