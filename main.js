var user;
var computer;
// defining turn and board area as an array
var turn = "U"; // user starts each time
var gameBoard = [["&nbsp;", "&nbsp;", "&nbsp;"],
                 ["&nbsp;", "&nbsp;", "&nbsp;"],
                 ["&nbsp;", "&nbsp;", "&nbsp;"]];

function displayGameBoard() {
  $("#one-left span").html(gameBoard[0][0]);
  $("#one-middle span").html(gameBoard[0][1]);
  $("#one-right span").html(gameBoard[0][2]);
  $("#two-left span").html(gameBoard[1][0]);
  $("#two-middle span").html(gameBoard[1][1]);
  $("#two-right span").html(gameBoard[1][2]);
  $("#three-left span").html(gameBoard[2][0]);
  $("#three-middle span").html(gameBoard[2][1]);
  $("#three-right span").html(gameBoard[2][2]);
}

function displayTurnInfo() {
  if (turn == "U") {
    $("#turn").text("Your turn");
  } else {
    $("#turn").text("Your compiturn");
  }  
}

// random from min-max excluding max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// choose random place in a gameBoard and assign there the symbol of the computer
function compiMove() {
  // checking if any move is still possible 
  if (checkGameBoardComplete()) {
    $("#turn").text("Game finished");
    return false;
  }
  
  var x, y;
  // checking if the place is empty for compi move
  do {
    x = getRandomInt(0, 3);
    y = getRandomInt(0, 3);
  } while (
    gameBoard[x][y] == "X" || gameBoard[x][y] == "O"
  );
  
  // assigning symbol for a clicked box
  gameBoard[x][y] = computer;
  // displaying gameBoard with a changed box
  displayGameBoard();
  
  // give the turn back to a user
  turn = "U";
  displayTurnInfo();
}

function checkGameBoardComplete() {
  var complete = true;
  for (var i=0; i<=2; i++) {
    for (var j=0; j<=2; j++) {
      if (gameBoard[i][j] == "&nbsp;") {
        complete = false;
      }
    }
  }
  return complete;
}



$(document).ready(function() {
  $("#symbol-choice").modal();
  
  // assign the symbol for a user and a computer
  $("#o").on("click", function() {
    user = "O";
    computer = "X";
    displayGameBoard();
    displayTurnInfo();
  });
  $("#x").on("click", function() {
    user = "X";
    computer = "O";
    displayGameBoard();
    displayTurnInfo();
  });
  
  // listening for user choices, displaying them and reacting to the move
  $(".board-box").on("click", function(){
    // checking if any move is still possible 
    if (checkGameBoardComplete()) {
      $("#turn").text("Game finished");
      return false;
    }
    
    // check if it's computer's turn, and if so ignore user's move
    if (turn == "C") {
      return false;
    }
    
    // defining which place was chosen
    var elementId = $(this).attr("id");
    var x, y;

    switch (elementId) {
      case "one-left": 
        x = 0;
        y = 0;
        break;
      case "one-middle": 
        x = 0;
        y = 1;
        break;
      case "one-right": 
        x = 0;
        y = 2;
        break;
      case "two-left": 
        x = 1;
        y = 0;
        break;
      case "two-middle": 
        x = 1;
        y = 1;
        break;
      case "two-right": 
        x = 1;
        y = 2;
        break;
      case "three-left": 
        x = 2;
        y = 0;
        break;
      case "three-middle": 
        x = 2;
        y = 1;
        break;
      case "three-right": 
        x = 2;
        y = 2;
        break;
    }
    
    // checking if the place is empty for a user's move
    if (gameBoard[x][y] !== "X" && gameBoard[x][y] !== "O") {
      // assigning symbol for a clicked box
      gameBoard[x][y] = user;
      // displaying gameBoard with a changed box
      displayGameBoard();
      // let computer make the next move
      turn = "C";
      displayTurnInfo();
      setTimeout(compiMove, 2000);
    } else {
      $("#turn").text("It's occupied");
    }
    

    
  });
  
});
