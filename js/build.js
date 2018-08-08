"use strict";

function buildLevel(level) {
  //Loop Through all the Rows for the level
  for (var row = 0; row < levelGrid[gameLevel].length; row++) {
    //Loop Through each of the columns for the row
    for (var column = 0; column < levelGrid[gameLevel][row].length; column++) {
      var gridElement = levelGrid[gameLevel][row].slice(column, column + 1);

      if (gridElement !== "_") {
        var newDiv = document.createElement("div");
        newDiv.classList.add(gridElement);
        newDiv.style.position = "absolute";
        newDiv.style.left = column * 40 + "px";
        newDiv.style.top = row * 40 + "px";
        document.querySelector(".level-container").appendChild(newDiv);
        if (gridElement === "c") {
          boardCoins.push([row, column]);
        }
      }
    }
  }
}

function playerAddLocation(player, x, y) {
  var newDiv = document.createElement("div");
  newDiv.classList.add(player);
  newDiv.style.position = "absolute";
  newDiv.style.left = x + "px";
  newDiv.style.top = y + "px";
  document.querySelector(".level-container").appendChild(newDiv);
}
