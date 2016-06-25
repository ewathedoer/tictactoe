var EMPTY = " ";
var user;
var computer;
// defining turn and board area as an array
var turn = "U"; // user starts each time
var gameBoard = [[EMPTY, EMPTY, EMPTY],
                 [EMPTY, EMPTY, EMPTY],
                 [EMPTY, EMPTY, EMPTY]];

function displayGameBoard() {
  for (var x = 0; x <= 2; x++) {
    for (var y = 0; y <= 2; y++) {
      var boxId = "#box-" + x + "-" + y + " span";
      $(boxId).html(gameBoard[x][y][0]);
      // if there is a winner row there is symbol and "w" (from checkGameWinner)
      if (gameBoard[x][y].length > 1) {
        $(boxId).addClass("winner flash animated");
      }
    }
  }
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
    gameBoard[x][y] !== EMPTY
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
      if (gameBoard[i][j] == EMPTY) {
        complete = false;
      }
    }
  }
  return complete;
}

function checkGameWinner() {
  if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[0][0] !== EMPTY) {
    // adding winner symbol "w" for later animation
    gameBoard[0][0] += "w";
    gameBoard[1][1] += "w";
    gameBoard[2][2] += "w";
    // returning a winner
    return gameBoard[0][0];
  }
  if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] !== EMPTY) {
    gameBoard[0][2] += "w";
    gameBoard[1][1] += "w";
    gameBoard[2][0] += "w";
    return gameBoard[0][2];
  }
  for (var i=0; i<=2; i++) {
    if (gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2] && gameBoard[i][0] !== EMPTY) {
      gameBoard[i][0] += "w";
      gameBoard[i][1] += "w";
      gameBoard[i][2] += "w";
      return gameBoard[i][0];
    }
  }
  for (var i=0; i<=2; i++) {
    if (gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i] && gameBoard[0][i] !== EMPTY) {
      gameBoard[0][i] += "w";
      gameBoard[1][i] += "w";
      gameBoard[2][i] += "w";
      return gameBoard[0][i];
    }
  }
  // if game is on and still nobody won
  return null;
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
    // taking the position from the elementId string name
    var x = parseInt(elementId[4]);
    var y = parseInt(elementId[6]);
    
    // checking if the place is empty for a user's move
    if (gameBoard[x][y] == EMPTY) {
      // assigning symbol for a clicked box
      gameBoard[x][y] = user;
      // displaying gameBoard with a changed box
      displayGameBoard();
      // checking if with this move a user won
      var winner = checkGameWinner();
      
      // let computer make the next move
      turn = "C";
      displayTurnInfo();
      setTimeout(compiMove, 2000);
    } else {
      $("#turn").text("It's occupied");
    }
    

    
  });
  
});
