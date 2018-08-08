function addBoardEnemies() {
  var levelEnemies = levelDetails[gameLevel].enemies;
  if (levelDetails[gameLevel].enemies) {
    for (numEnemies = 0; numEnemies < levelEnemies.length; numEnemies++) {
      addEnemy(
        levelEnemies[numEnemies][0],
        levelEnemies[numEnemies][1],
        levelEnemies[numEnemies][2]
      );
    }
  }
}

function addEnemy(enemyIndex, x, y) {
  var newDiv = document.createElement("div");
  boardEnemy.push({
    class: enemy[enemyIndex].name,
    xLoc: x,
    yLoc: y,
    xMove: enemy[enemyIndex].xMove,
    yMove: enemy[enemyIndex].yMove
  });

  newDiv.classList.add(enemy[enemyIndex].name);
  newDiv.classList.add("enemy");
  newDiv.style.position = "absolute";
  newDiv.style.left = x + "px";
  newDiv.style.top = y + "px";
  document.querySelector(".level-container").appendChild(newDiv);
}

function enemySetMovement() {
  enemyMovement = setInterval(function() {
    moveEnemy();
  }, 500);
}

function moveEnemy() {
  if (boardEnemy.length > 0) {
    for (loopEnemies = 0; loopEnemies < boardEnemy.length; loopEnemies++) {
      getXlocation =
        boardEnemy[loopEnemies].xLoc + boardEnemy[loopEnemies].xMove;
      getYlocation =
        boardEnemy[loopEnemies].yLoc + boardEnemy[loopEnemies].yMove;
      if (validateEnemyMove(loopEnemies, getXlocation, getYlocation)) {
        if (document.querySelectorAll(".enemy")[loopEnemies]) {
          document.querySelectorAll(".enemy")[loopEnemies].style.top =
            getYlocation + "px";
          document.querySelectorAll(".enemy")[loopEnemies].style.left =
            getXlocation + "px";
          boardEnemy[loopEnemies].xLoc = getXlocation;
          boardEnemy[loopEnemies].yLoc = getYlocation;
        }
      }
    }
  }
}

//Validate if the enemy can move. If not, reverse direction by multiplying the xMove *-1
function validateEnemyMove(loopEnemies, getXlocation, getYlocation) {
  var newY = getYlocation / 40;
  var newX = getXlocation / 40;
  var gridItem = levelGrid[gameLevel][newY].slice(newX, newX + 1);
  if (gridItem !== "_") {
    boardEnemy[loopEnemies].xMove = boardEnemy[loopEnemies].xMove * -1;
    return false;
  } else {
    return true;
  }
}
