const gameboard = document.getElementById("wordle-game-board");
const rows = Array.from(document.getElementsByClassName("wordle-row"));
let enteredWords = 0;
let currentLetter = 0;

function wiggleScreenError(strErrorMessage) {
    let id = null;
    let max = 20;
    let currentPos = 0;
    let rounds = 0;

    id = setInterval(() => {
        if (currentPos != max) {
            currentPos += 10 * max < 0 ? -1 : 1;
            gameboard.style.transform = "translate(" + currentPos + "px)";
        } else {
            if (max == 0) clearInterval(id);
            max *= -1;
            rounds++;
            if (rounds >= 4) max = 0;
        }
    }, 1);
    console.log("round1");
}

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
                console.log("error!");
                wiggleScreenError("error");
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
                console.log("error!");
                wiggleScreenError("error");
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