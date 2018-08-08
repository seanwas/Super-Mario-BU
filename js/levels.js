var gameLevel = 0;
var stopMovement = false;
var level = levelGrid[gameLevel];
var levelX = 0; // Player's X Location on Screen
var levelY = 0; // Player's Y Location on Screen
var playerLocationX = 0; // Player's X Location on level Container
var playerLocationY = 560; // Player's Y Location on level Container
var player = "mario";
var levelStart = levelDetails[gameLevel].start;
var levelEnd = levelDetails[gameLevel].end;
var levelDelay = 1000;

var motion = 0;
var gravity = 0;
var jumping = false; //indicates whether the player is jumping
var boardEnemy = []; //Array of active enemies on the active level
var boardCoins = []; // Array of the active coins on the active level

var restart = "";
var collision = "";
var enemyMovement = "";
var levelStop = false;
var levelTimer = "";
var slide = 0; //slideshow view

// loadLevel();

document.querySelector("body").addEventListener("keydown", function(e) {
  if (stopMovement === false) {
    if (e.keyCode === 37) movePlayer(player, -40, 0); // Arrow Left
    if (e.keyCode === 38) movePlayer(player, 0, -40); //Arrow Up
    if (e.keyCode === 39) {
      // Arrow Right
      var playerX = playerLocationX / 40 + 1;
      var playerY = playerLocationY / 40;

      if (levelGrid[gameLevel][playerY].slice(playerX, playerX + 1) === "2") {
        tunnelWarp(2, 80, 0);
      } else {
        movePlayer(player, 40, 0);
      }
    }

    if (e.keyCode === 40) arrowDown();
    if (e.keyCode === 32) {
      playSound(jump, 0.2);
      playerJumpUp(player, 0, -40, 3);
      updateSlide();
    }
  }
  if (e.keyCode === 13) {
    levelWin();
  }
});

function arrowDown() {
  var playerX = playerLocationX / 40;
  var playerY = playerLocationY / 40 + 1;
  var gridPiece = levelGrid[gameLevel][playerY].slice(playerX, playerX + 1);

  if (gridPiece === "1") {
    tunnelWarp(1, 0, 80);
  } else if (gridPiece === "4" || gridPiece === "5" || gridPiece === "6") {
    extraGames(gridPiece);
  } else {
    movePlayer(player, 0, 40);
  }
}

function extraGames(gridPiece) {
  if (gridPiece === "4") {
    var newWeb = "https://pages.git.generalassemb.ly/seanwas/Tetris/";
  }
  if (gridPiece === "5") {
    var newWeb = "https://pages.git.generalassemb.ly/seanwas/Whack-A-Mole/";
  }
  if (gridPiece === "6") {
    var newWeb = "https://pages.git.generalassemb.ly/seanwas/2048/";
  }

  window.open(newWeb);
}

loadLevel();
function loadLevel() {
  //Add Elements to build entire level
  buildLevel(level);
  document.focus;

  // Add player's initial location
  playerAddLocation(player, playerLocationX, playerLocationY);
  addBoardEnemies();
  simulateGravity();
  detectCollisions();
  enemySetMovement();
}

function levelWin() {
  stopMovement = true;
  levelStop = true;
  stopIntervals();
  pauseSound(level1);
  playSound(levelclear);
  poleSlide(player, 0, 40, 10);
  addTimerPoints();
  setTimeout(() => {
    levelComplete();
  }, 7000);
}

function levelLose() {
  stopMovement = true;
  levelStop = true;
  stopIntervals();
  pauseSound(level1);
  playSound(dead);
  setTimeout(() => {
    startLevel();
  }, 3000);
}

function levelWarp() {
  stopMovement = true;
  levelStop = true;
  stopIntervals();
  gameLevel = 3;
  setTimeout(() => {
    levelComplete();
  }, 2000);
}

//Slide down the flagpole at the end of the level
function poleSlide(player, xMove, yMove, tiles) {
  movePlayer(player, xMove, yMove);
  setTimeout(() => {
    if (tiles > 0) {
      tiles -= 1;
      poleSlide(player, xMove, yMove, tiles);
    } else {
      jumping = false;
    }
  }, 50);
}

//Call to stop all intervals curently active
function stopIntervals() {
  if (enemyMovement) clearInterval(enemyMovement);
  if (levelTimer) clearInterval(levelTimer);
  if (gravity) clearInterval(gravity);
  if (collision) clearInterval(collision);
}

function startLevel() {
  //First Timer is to clear level
  var clearRack = setTimeout(() => {
    document.querySelector(".level-container").innerHTML = "";
  }, levelDelay);

  //Second Timer is to create new level and start sound
  var restart = setTimeout(() => {
    document.querySelector(
      ".level-container"
    ).style.transform = `translateX(0px)`;
    document.querySelector("#world").innerHTML = levelDetails[gameLevel].level;
    boardEnemy = [];
    boardCoins = [];
    buildLevel(level);
    playSound(level1);
  }, levelDelay + 2000);

  //Third Timer is to add player
  var addPlayer = setTimeout(() => {
    levelX = 0; // Player's X Location on Screen
    levelY = 0; // Player's Y Location on Screen
    playerLocationX = 0; // Player's X Location on level Container
    playerLocationY = 560; // Player's Y Location on level Container
    levelStart = levelDetails[gameLevel].start;
    levelEnd = levelDetails[gameLevel].end;
    playerAddLocation(player, playerLocationX, playerLocationY);
    stopMovement = false;
  }, levelDelay + 3000);

  //Last Timer is to final level elements
  var startElements = setTimeout(() => {
    motion = 0;
    gravity = 0;
    jumping = false; //indicates whether the player is jumping
    endTurn = false;
    levelStop = false;
    enemySetMovement();
    boardEnemy = [];
    boardCoins = [];
    addBoardEnemies();
    simulateGravity();
    detectCollisions();
    beginLevelTimer();
    levelDelay = 3000;
  }, levelDelay + 4000);
}

function levelComplete() {
  if (gameLevel < 4) {
    gameLevel += 1;
    startLevel();
  } else {
    gameWin();
  }
}

function updateSlide() {
  if (document.querySelector(".y")) {
    if (slide === 6) {
      document.querySelector(".y").style.visibility = "hidden";
    }
    if (slide < 6) {
      slide += 1;
    }
    if (document.querySelector(".y")) {
      document.querySelector(".y").style.background =
        "url('./img/slideshow/slide" + slide + ".jpg')";
      document.querySelector(".y").style.backgroundSize = "100%";
    }
  }
}

function gameWin() {
  levelStop = true;
  stopIntervals();
  pauseSound(level1);
  poleSlide(player, 0, 40, 10);
  addTimerPoints();
  playSound(ending);

  document.querySelector(".message-row").innerHTML =
    "<div class='message-column'><div><h1>Congratulations!!</h1></div><div><h1>Hartcode Academy!!</h1></div><div><h1>You Won!!</h1></div></div><div class='message-column'><div><h2>And a special THANK YOU!!</h2></div><div><h2>To everyone who made this </h2></div><div><h2>possible</h2></div></div>";

  for (toggle = 0; toggle < 60; toggle++) {
    setTimeout(() => {
      toggleFlash();
    }, toggle * 500);
  }
  setTimeout(() => {
    document.querySelector(".message-row").innerHTML = "";
    simulateGravity();
    detectCollisions();
    stopMovement = false;
  }, 60 * 500);
}

function toggleFlash() {
  if (document.querySelector(".flash")) {
    document.querySelector(".flash").classList.remove("flash");
  } else {
    document.querySelector(".message-row").classList.add("flash");
  }
}
