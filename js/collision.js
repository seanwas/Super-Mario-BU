function detectCollisions() {
  collision = setInterval(() => {
    //Number of Enemies currently on the board (Player X,Y is the tile location)
    var enemyLength = document.querySelectorAll(".enemy").length;
    var playerX = playerLocationX / 40;
    var playerY = playerLocationY / 40;
    LoopEnemies();
  });
}

function LoopEnemies() {
  //Get the X,Y Location of each enemy (enemy X,Y is the tile location)
  for (loopEnemies = 0; loopEnemies < enemyLength; loopEnemies++) {
    if (boardEnemy[loopEnemies]) {
      var enemyX = boardEnemy[loopEnemies].xLoc / 40;
      var enemyY = boardEnemy[loopEnemies].yLoc / 40;

      //If player is higher than enemy, then they win the collision
      if (enemyX === playerX && enemyY === playerY + 1) {
        playerWinsCollision(loopEnemies, enemyX, enemyY);
        return;

        //If player is equal with the enemy, then they win the collision
      } else if (enemyX === playerX && enemyY === playerY) {
        playerLosesCollission(loopEnemies);
      }
    }
  }
}


// Player is higher than the collided element and wins the collision
function playerWinsCollision(loopEnemies, enemyX, enemyY) {
  removeEnemyBoard(findLocationOnBoard(enemyX, enemyY));
  playSound(hit);
  playerJumpUp(player, 0, -40, 2);
  boardEnemy.splice(loopEnemies, 1);
}

// player colided with an enemy and died
function playerLosesCollission() {
  boardEnemy = [];
  document.querySelector(".mario").classList.add("mariodead");
  levelLose();
  playerJumpUp(player, 0, -40, 2);
}







function removeEnemyBoard(index) {
  var levelContainer = document.querySelectorAll(".level-container")[0];
  var childElement = document.querySelectorAll(".enemy")[index];
  levelContainer.removeChild(childElement);
}

function findLocationOnBoard(newX, newY) {
  var enemyContainer = document
    .querySelectorAll(".level-container")[0]
    .querySelectorAll(".enemy");

  for (index = 0; index < enemyContainer.length; index++) {
    var containerY = enemyContainer[index].style.top;
    var parsedContainerY = parseInt(containerY.slice(0, containerY.length - 2));
    if (parsedContainerY / 40 === newY) {
      var containerX = enemyContainer[index].style.left;
      var parsedContainerX = parseInt(
        containerX.slice(0, containerX.length - 2)
      );
      if (parsedContainerX === newX * 40) {
        return index;
      }
    }
  }
}

//find out if the collided item needs a transition
function checkUpCollision(player) {
  var newY = playerLocationY / 40;
  var newX = playerLocationX / 40;
  var gridItem = levelGrid[gameLevel][newY - 1].slice(newX, newX + 1);
  if (gridItem === "_" || gridItem === "i") return;
  var itemArrayIndex = findInItemsArray(gridItem, newX, newY);
  transitionItem(itemArrayIndex, gridItem, newX, newY - 1);
  updateSound(
    itemsArray[itemArrayIndex].sound,
    itemsArray[itemArrayIndex].soundDelay
  );
  updateScore(itemsArray[itemArrayIndex].score);
  updateCoin(itemsArray[itemArrayIndex].coin);
}

function findInItemsArray(gridItem, newX, newY) {
  for (index = 0; index < itemsArray.length; index++) {
    if (itemsArray[index].symbol === gridItem) {
      return index;
    }
  }
}

//Update the activeGrid with the transition item
function transitionItem(index, gridItem, newX, newY) {
  var transition = itemsArray[index].transition;
  if (transition === "none") return;
  var previousString = levelGrid[gameLevel][newY];

  // //Replace item with trnsition item on the levelGrid[gameLevel]
  levelGrid[gameLevel][newY] =
    previousString.substring(0, newX) +
    transition +
    previousString.substring(newX + 1);
  findBoardItem(gridItem, newX, newY, transition);
}

//Locate the colided item on the board
function findBoardItem(gridItem, newX, newY, transition) {
  var levelContainer = document.querySelectorAll(".level-container");
  for (index = 0; index < levelContainer[0].children.length; index++) {
    var containerY = parseInt(
      levelContainer[0].children[index].style.top.slice(
        0,
        levelContainer[0].children[index].style.top.length - 2
      )
    );
    if (containerY === newY * 40) {
      var containerX = parseInt(
        levelContainer[0].children[index].style.left.slice(
          0,
          levelContainer[0].children[index].style.left.length - 2
        )
      );
      if (containerX === newX * 40) {
        updateBoardItem(levelContainer, index, gridItem, transition);
      }
    }
  }
}

//update the colided item on the board
function updateBoardItem(levelContainer, index, gridItem, transition) {
  levelContainer[0].children[index].classList.add(transition);
  levelContainer[0].children[index].classList.remove(gridItem);
}


//The below 4 functions are needed to remove a board element
function deleteItem(boardArray, className, newX, newY) {
  var levelContainer = document.querySelectorAll(".level-container")[0];
  var childElement = document.querySelectorAll(".enemy")[index];
  var itemContainer = document
    .querySelectorAll(".level-container")[0]
    .querySelectorAll(`.${className}`);
  var itemIndex = findBoardLocation(itemContainer, newX, newY);
  var itemArrayIndex = findInItemsArray(className, newX, newY);

  removeGridItem(itemArrayIndex, className, newX, newY);
  removeBoardItem(itemIndex);
  boardCoins.splice(itemIndex, 1);

  //UpdateSounds/Score and Coin
  transitionItem(itemArrayIndex, className, newX, newY - 1);
  updateSound(
    itemsArray[itemArrayIndex].sound,
    itemsArray[itemArrayIndex].soundDelay
  );
  updateScore(itemsArray[itemArrayIndex].score);
  updateCoin(itemsArray[itemArrayIndex].coin);
}

function findBoardLocation(itemContainer, newX, newY) {
  for (index = 0; index < itemContainer.length; index++) {
    var containerY = itemContainer[index].style.top;
    var parsedContainerY = parseInt(containerY.slice(0, containerY.length - 2));
    if (parsedContainerY / 40 === newY) {
      var containerX = itemContainer[index].style.left;
      var parsedContainerX = parseInt(
        containerX.slice(0, containerX.length - 2)
      );
      if (parsedContainerX === newX * 40) {
        return index;
      }
    }
  }
}

function removeBoardItem(index) {
  var levelContainer = document.querySelectorAll(".level-container")[0];
  var childElement = document.querySelectorAll(".c")[index];
  levelContainer.removeChild(childElement);
}

function removeGridItem(index, gridItem, newX, newY) {
  var transition = itemsArray[index].transition;
  if (transition === "none") return;

  // Replace item with transition item on the levelGrid[gameLevel]
  var previousString = levelGrid[gameLevel][newY];
  levelGrid[gameLevel][newY] =
    previousString.substring(0, newX) +
    transition +
    previousString.substring(newX + 1);
}
