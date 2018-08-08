




function playerJumpUp(player, xMove, yMove, tiles) {
  if (stopMovement === true) return;
  jumping = true;

  movePlayer(player, xMove, yMove);
  setTimeout(() => {
    if (tiles > 0) {
      tiles -= 1;
      playerJumpUp(player, xMove, yMove, tiles);
    } else {
      checkUpCollision(player);
      jumping = false;
      playerJumpDown(player, xMove, yMove * -1, 4);
    }
  }, 80);
}

function playerWalk(player, xMove, yMove) {
  playerLocationX += xMove;
  playerLocationY += yMove;
  document.querySelector(`.${player}`).style.left = playerLocationX + "px";
  document.querySelector(`.${player}`).style.top = playerLocationY + "px";
  if (playerLocationX === levelEnd && levelStop === false) {
    levelWin();
  }
}

function playerJumpDown(player, xMove, yMove, tiles) {
  if (jumping === true) return;
  movePlayer(player, xMove, yMove);
  setTimeout(() => {
    if (tiles > 0) {
      tiles -= 1;
      playerJumpDown(player, xMove, yMove, tiles);
    } else {
      jumping = false;
    }
  }, 30);
}

function tunnelWarp(warp, warpX, warpY) {
  pauseSound(level1);
  playSound(pipe, 0);
  playerWalk(player, warpX, warpY);
  if (warp === 2) {

    //Warp to last level
    levelWarp()
  } else {
    setTimeout(function() {
      moveScreen(
        (levelX += levelDetails[gameLevel].warpX + 480 - playerLocationX)
      );
      playerLocationX = levelDetails[gameLevel].warpX;
      playerLocationY = levelDetails[gameLevel].warpY;
      document.querySelector(`.${player}`).style.left =
        levelDetails[gameLevel].warpX + "px";
    }, 2000);
  }
}
