const difficultyToggleButton = document.getElementById("toggle-difficulty");
let difficulty = 0;
const gameBoardElement = document.getElementsByClassName("minesweeper-gameboard")[0];
const commentElement = document.getElementById("minesweeper-comment");

const tileTemplate = `<div class="minesweeper-tile"><button class="minesweeper-clickable"></button></div>`;
const rowTemplate = `<div class="minesweeper-row"></div>`;

let boardWidth = 9;
let boardHeight = 9;
let bombSum = 10;
let bombsMarkedSum = 0; 
let wrongBombsMarked = 0;
let discoveredTiles = 0;
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
document.addEventListener("keydown", (event) => {
    if (event.key === "r") reset();
});

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
    for (let i = 0; i < bombSum; i++) {
        let r = Number();
        let c = Number();
        do {
            r = Math.round(Math.random() * 100) % boardHeight;
            c = Math.round(Math.random() * 100) % boardWidth;
        } while (gameBoardElement.children[r].children[c].children[0].classList.contains("bomb") || protectedNearby(r, c));

        gameBoardElement.children[r].children[c].children[0].classList.add("bomb");
        gameBoardElement.children[r].children[c].classList.add("bomb-parent");
    }
}

function makeDiscoverable() {
    for (let i = 0; i < boardHeight; i++) {
        for (let j = 0; j < boardWidth; j++) {

            gameBoardElement.children[i].children[j].children[0].addEventListener("click", (event) => {
                if (!started) {
                    start(i, j);
                }
                if (!gameActive) return;
                discover(i, j);
            });

            gameBoardElement.children[i].children[j].children[0].addEventListener("contextmenu", (event) => {
                if (!gameActive) return;
                event.preventDefault();
                mark(i, j);
                if (bombSum === bombsMarkedSum && wrongBombsMarked === 0) win();
            });

        }
    }
}

function initNumbersForTiles() {
    for (let i = 0; i < boardHeight; i++) {
        for (let j = 0; j < boardWidth; j++) {
            let sum = 0;
            [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]].forEach(e => {
                if (gameBoardElement.children[i + e[0]] !== undefined && gameBoardElement.children[i + e[0]].children[j + e[1]] !== undefined)
                    if (gameBoardElement.children[i + e[0]].children[j + e[1]].classList.contains("bomb-parent")) 
                        sum++;
            });
            if (!gameBoardElement.children[i].children[j].classList.contains("bomb-parent"))
                gameBoardElement.children[i].children[j].classList.add(`surrounded-${sum}`);
        }
    }
}

function rawDiscover(row, collumn) {
    gameBoardElement.children[row].children[collumn].children[0].remove();
    discoveredTiles++;
}

function discover(row, collumn) {
    if (gameBoardElement.children[row].children[collumn].children[0].classList.contains("marked-as-bomb")) return;
    if (gameBoardElement.children[row].children[collumn].classList.contains("bomb-parent")) lose();
    discoverWhenFree(row, collumn);
}

function discoverWhenFree(row, collumn) {
    if (!gameBoardElement.children[row].children[collumn].classList.contains("surrounded-0")) {
        rawDiscover(row, collumn);
        return;
    }
    if (gameBoardElement.children[row].children[collumn].children[0] !== undefined)
        rawDiscover(row, collumn);

    if (row !== boardHeight - 1 && gameBoardElement.children[row + 1].children[collumn].children[0] !== undefined)
        discoverWhenFree(row + 1, collumn);
    if (row !== 0 && gameBoardElement.children[row - 1].children[collumn].children[0] !== undefined)
        discoverWhenFree(row - 1, collumn);
    if (collumn !== boardWidth - 1 && gameBoardElement.children[row].children[collumn + 1].children[0] !== undefined)
        discoverWhenFree(row, collumn + 1);
    if (collumn !== 0 && gameBoardElement.children[row].children[collumn - 1].children[0] !== undefined)
        discoverWhenFree(row, collumn - 1);

    if (row !== boardHeight - 1 && collumn !== boardWidth - 1 && gameBoardElement.children[row + 1].children[collumn + 1].children[0] !== undefined)
        discoverWhenFree(row + 1, collumn + 1);
    if (row !== 0 && collumn !== 0 && gameBoardElement.children[row - 1].children[collumn - 1].children[0] !== undefined)
        discoverWhenFree(row - 1, collumn - 1);
    if (row !== boardHeight - 1 && collumn !== 0 && gameBoardElement.children[row + 1].children[collumn - 1].children[0] !== undefined)
        discoverWhenFree(row + 1, collumn -1);
    if (row !== 0 && collumn !== boardWidth - 1 && gameBoardElement.children[row - 1].children[collumn + 1].children[0] !== undefined)
        discoverWhenFree(row - 1, collumn + 1);
}

function mark(row, collumn) {
    if (gameBoardElement.children[row].children[collumn].children[0].classList.contains("marked-as-bomb")) {
        bombsMarkedSum--;
        if (!gameBoardElement.children[row].children[collumn].classList.contains("bomb-parent")) wrongBombsMarked--;
    } else {
        bombsMarkedSum++;
        if (!gameBoardElement.children[row].children[collumn].classList.contains("bomb-parent")) wrongBombsMarked++;
    }
    gameBoardElement.children[row].children[collumn].children[0].classList.toggle("marked-as-bomb");
}

function protectStart(row, collumn, value) {
    gameBoardElement.children[row].children[collumn].classList.add("protected-for-start");
    if (Math.random() > 0.4 * value && row !== 0 && !gameBoardElement.children[row - 1].children[collumn].classList.contains("protected-for-start"))
        protectStart(row - 1, collumn, value + 0.2);
    if (Math.random() > 0.4 * value && row !== boardHeight - 1 && !gameBoardElement.children[row + 1].children[collumn].classList.contains("protected-for-start"))
        protectStart(row + 1, collumn, value + 0.2);
    if (Math.random() > 0.4 * value && collumn !== 0 && !gameBoardElement.children[row].children[collumn - 1].classList.contains("protected-for-start"))
        protectStart(row, collumn - 1, value + 0.2);
    if (Math.random() > 0.4 * value && collumn !== boardWidth - 1 && !gameBoardElement.children[row].children[collumn + 1].classList.contains("protected-for-start"))
        protectStart(row, collumn + 1, value + 0.2);
}

function protectedNearby(originRow, originCollumn) {
    let protected = false;
    [[0, 0], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]].forEach(coords => {
        if (gameBoardElement.children[originRow + coords[0]] !== undefined && gameBoardElement.children[originRow + coords[0]].children[originCollumn + coords[1]] !== undefined)
            if (gameBoardElement.children[originRow + coords[0]].children[originCollumn + coords[1]].classList.contains("protected-for-start")) protected = true;
    });
    return protected;
}

function start(row, collumn) {
    protectStart(row, collumn, 1.2);
    placeBombs(row, collumn);
    initNumbersForTiles();
    started = true;
    gameActive = true;
}

function lose() {
    gameActive = false;
    alert("you lost");
}

function win() {
    gameActive = false;
    alert("you won");
}

function reset() {
    started = false;
    bombsMarkedSum = 0;
    discoveredTiles = 0;
    wrongBombsMarked = 0;
    clearGameBoard();
    buildGameBoard(boardHeight, boardWidth);
    makeDiscoverable();
    gameActive = true;
}

function init() {
    buildGameBoard(9, 9);
    makeDiscoverable();
}

// debug function
function uncoverAll() {
    for (let i = 0; i < boardHeight; i++) {
        for (let j = 0; j < boardWidth; j++) {
            if (gameBoardElement.children[i].children[j].children[0] === undefined) continue;
            gameBoardElement.children[i].children[j].children[0].remove();
        }
    }
}

init();