// Attempt to move the player from current Location to new Location
function movePlayer(player, xMove, yMove) {
  if (validateMove(player, xMove, yMove) === true) {
    playerWalk(player, xMove, yMove);
    if (
      playerLocationX > levelStart + 560 &&
      playerLocationX < levelEnd + 200
    ) {
      moveScreen((levelX += xMove));
    }
    // createMotion();
  }
}

// Function to move the Level-Container
function moveScreen(levelX) {
  var level = document.querySelector(".level-container");
  level.style.transform = `translateX(${levelX * -1}px)`;
}


// Compare the newLocation to the dataGrid to see if there is a static element
function validateMove(player, xMove, yMove) {
  var newY = (playerLocationY + yMove) / 40;
  var newX = (playerLocationX + xMove) / 40;

  //check to see if player fell through the bottom of theh screen
  if (newY > 16) {
    playerLose();
  }

  if (newY > 0) {
    var gridItem = levelGrid[gameLevel][newY].slice(newX, newX + 1);
    if (gridItem === "_") {
      return true;
    } else if (gridItem === "c") {
      deleteItem(boardCoins, gridItem, newX, newY);
      return true;
    } else {
      return false;
    }
  }
}

function simulateGravity() {
  gravity = setInterval(() => {
    if (jumping === false) {
      playerJumpDown(player, 0, +40, 17);
    }
  }, 1000);
}


