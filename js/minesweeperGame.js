const difficultyToggleButton = document.getElementById("toggle-difficulty");
let difficulty = 0;
const gameBoardElement = document.getElementsByClassName("minesweeper-gameboard")[0];

const tileTemplate = `<div class="minesweeper-tile"><button class="minesweeper-clickable"></button></div>`;
const rowTemplate = `<div class="minesweeper-row"></div>`;

let bombSum = Number();
let bombsLeft = Number();
let bombsMarked = Number();
let wrongBombsMarked = Number();

difficultyToggleButton.addEventListener("click", () => {
    reset();
    if (difficultyToggleButton.innerHTML === "Easy") {
        difficulty = 1;
        difficultyToggleButton.innerHTML = "Normal";
        clearGameBoard();
        buildGameBoard(16, 16);
    } else if (difficultyToggleButton.innerHTML === "Normal") {
        difficulty = 2;
        difficultyToggleButton.innerHTML = "Hard";
        clearGameBoard();
        buildGameBoard(16, 30);
    } else {
        difficulty = 0;
        difficultyToggleButton.innerHTML = "Easy";
        clearGameBoard();
        buildGameBoard(9, 9);
    }
});

document.getElementById("minesweeper-reset").addEventListener("click", reset);

function reset() {

}

function clearGameBoard() {
    while (gameBoardElement.children[0] !== undefined) gameBoardElement.children[0].remove();
}

function buildGameBoard(rows, collumns) {
    for (let i = 0; i < rows; i++) {
        gameBoardElement.innerHTML += rowTemplate;
        for (let j = 0; j < collumns; j++) {
            gameBoardElement.children[i].innerHTML += tileTemplate;
        }
    }
}

function placeBombs() {
    for (let i = 0; i < difficulty === 0 ? 10 : difficulty === 1 ? 40 : 99; i++) {
        let c = Number();
        let r = Number();
        console.log(gameBoardElement.children[0]);
        /*
        [].slice.call(gameBoardElement.children).forEach((e) => {
            console.log(e);
        });
        
        /*
        do {
            c = Math.round((Math.random() * 100) % difficulty === 0 ? 9 : difficulty === 1 ? 16 : 30);
            r = Math.round((Math.random() * 100) % difficulty >= 1 ? 16 : 9);
        } while (!gameBoardElement.children[r].children[c].children[0].classList.contains("bomb"));
        gameBoardElement.children[r].children[c].children[0].classList.add("bomb");
        */
    }
}