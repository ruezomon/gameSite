const difficultyToggleButton = document.getElementById("toggle-difficulty");
let difficulty = 0;
const gameBoardElement = document.getElementsByClassName("minesweeper-gameboard")[0];

const tileTemplate = `<div class="minesweeper-tile"><button class="minesweeper-clickable"></button></div>`;
const rowTemplate = `<div class="minesweeper-row"></div>`;

let boardWidth = 9;
let boardHeight = 9;
let bombSum = 10;
let bombsMarkedSum = 0; 
let wrongBombsMarked = 0;
let gameActive = true;
let started = false;

difficultyToggleButton.addEventListener("click", () => {
    if (difficultyToggleButton.innerHTML === "Easy") {
        difficulty = 1;
        difficultyToggleButton.innerHTML = "Normal";
        bombSum = 40;
        boardHeight = 16;
        boardWidth = 16;
    } else if (difficultyToggleButton.innerHTML === "Normal") {
        difficulty = 2;
        difficultyToggleButton.innerHTML = "Hard";
        bombSum = 99;
        boardHeight = 16;
        boardWidth = 30;
    } else {
        difficulty = 0;
        difficultyToggleButton.innerHTML = "Easy";
        bombSum = 10;
        boardHeight = 9;
        boardWidth = 9;
    }
    reset();
});

document.getElementById("minesweeper-reset").addEventListener("click", reset);

function reset() {
    bombsLeft = bombSum;
    bombsMarkedSum = 0;
    clearGameBoard();
    buildGameBoard(boardHeight, boardWidth);
    makeDiscoverable();
    gameActive = true;
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

function placeBombs(startingRow, startingCollumn) {
    for (let i = 0; i < bombSum; i++) {
        let c = Number();
        let r = Number();
        do {
            c = Math.round(Math.random() * 100) % boardWidth;
            r = Math.round(Math.random() * 100) % boardHeight;
        } while (gameBoardElement.children[r].children[c].children[0].classList.contains("bomb") || (r === startingRow && c === startingCollumn));

        gameBoardElement.children[r].children[c].children[0].classList.add("bomb");
        gameBoardElement.children[r].children[c].classList.add("bomb-parent");
    }
}

function makeDiscoverable() {
    for (let i = 0; i < boardHeight; i++) {
        for (let j = 0; j < boardWidth; j++) {

            gameBoardElement.children[i].children[j].children[0].addEventListener("click", (event) => {
                if (!gameActive) return;
                if (gameBoardElement.children[i].children[j].children[0].classList.contains("marked-as-bomb")) return;
                gameBoardElement.children[i].children[j].children[0].remove();
            });

            gameBoardElement.children[i].children[j].children[0].addEventListener("contextmenu", (event) => {
                if (!gameActive) return;
                event.preventDefault();
                if (gameBoardElement.children[i].children[j].children[0].classList.contains("marked-as-bomb")) {
                    bombsMarkedSum--;
                    if (!gameBoardElement.children[i].children[j].classList.contains("bomb-parent")) wrongBombsMarked--;
                } else {
                    bombsMarkedSum++;
                    if (!gameBoardElement.children[i].children[j].classList.contains("bomb-parent")) wrongBombsMarked++;
                }
                gameBoardElement.children[i].children[j].children[0].classList.toggle("marked-as-bomb");
            });

        }
    }
}

function start() {
    placeBombs();
}

buildGameBoard(9, 9);
placeBombs();
makeDiscoverable();