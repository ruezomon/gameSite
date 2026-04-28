const gameboard = document.getElementById("wordle-game-board");
const rows = Array.from(document.getElementsByClassName("wordle-row"));
let enteredWords = 0;
let currentLetter = 0;

document.addEventListener("keydown", function(event) {
    if (enteredWords == 6) return;
    switch (event.key.toUpperCase()) {
        case "A":
        case "B":
        case "C":
        case "D":
        case "E":
        case "F":
        case "G":
        case "H":
        case "I":
        case "J":
        case "K":
        case "L":
        case "M":
        case "N":
        case "O":
        case "P":
        case "Q":
        case "R":
        case "S":
        case "T":
        case "U":
        case "V":
        case "W":
        case "X":
        case "Y":
        case "Z":
            if (currentLetter == 5) {
                // wiggle screen or smth
                return;
            }
            rows[enteredWords].children[currentLetter].innerHTML = event.key.toUpperCase();
            currentLetter++;
            break;
        case "BACKSPACE":
            if (currentLetter == 0) return;
            rows[enteredWords].children[--currentLetter].innerHTML = "";
            break;
        case "ENTER":
            event.preventDefault();
            if (currentLetter != 5) {
                // some kind of error
                return;
            }
            enteredWords++;
            currentLetter = 0;
            
            if (enteredWords == 6) {
                () => {}
            }

            break;
    }
});