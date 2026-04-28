const gameboard = document.getElementById("wordle-game-board");
const rows = Array.from(document.getElementsByClassName("wordle-row"));
let enteredWords = 0;

document.addEventListener("keydown", function(event) {
    console.log(event.key);
});