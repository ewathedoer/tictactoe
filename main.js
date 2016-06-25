$(document).ready(function() {
  $("#symbol-choice").modal();
});

// assign the symbol for a user and a computer
var user;
var computer;

$("#o").on("click", function() {
  user = "O";
  computer = "X";
});
$("#x").on("click", function() {
  user = "X";
  computer = "O";
});

// look for random place
