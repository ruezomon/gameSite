const gameBoardArray = [];
const gameBoardElement = document.getElementById("gewinnt-game-board");
const resetButton = document.getElementById("gewinnt-reset-button");

let player1 = true; // true is player 1, false is player 2;
let moves = 0;
let gameActive = true;

resetButton.addEventListener("click", () => {
    createGameBoardArray();
    player1 = true;
    moves = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            gameBoardElement.getElementsByClassName("gewinnt-row")[i].children[j].innerHTML = "";
        }
    }
    gameActive = true;
});

function createGameBoardArray() {
    gameBoardArray.length = 0;
    for (let i = 0; i < 6; i++) {
        gameBoardArray.push([]);
        for (let j = 0; j < 7; j++) {
            gameBoardArray[i].push(0);
        }
    }
}

function visualizeTile(rowInt, collumnInt, colorInt) {
    gameBoardElement.getElementsByClassName("gewinnt-row")[rowInt].children[collumnInt].innerHTML = `<div class="gewinnt-tile" color="${colorInt}"></div>`;
}

function dropTile(collumnInt, colorInt) {
    if (getFreeRowForCollumn(collumnInt) === -1) return false;
    gameBoardArray[getFreeRowForCollumn(collumnInt)][collumnInt] = colorInt;
    // +1 because wanted row will be occupied in the matrix, but not on the page
    visualizeTile(getFreeRowForCollumn(collumnInt) + 1, collumnInt, colorInt);
    return true;
}

function getFreeRowForCollumn(collumnInt) {
    if (gameBoardArray[0][collumnInt] !== 0) return -1;
    if (gameBoardArray[5][collumnInt] === 0) return 5;
    for (let i = 0; i < 6; i++)
        if (gameBoardArray[i][collumnInt] !== 0) return i - 1;
}

function checkForWin(originRowInt, originCollumnInt, colorInt) {
    let currentRow = originRowInt, currentCollumn = originCollumnInt;

    const countDirection = (rowDir, collumnDir) => {
        let row = originRowInt;
        let collumn = originCollumnInt; 
        let count = -1; // -1 is the origin tile, disregarded because if will be counted twice otherwise
        while (0 <= row && row <= 5 && 0 <= collumn && collumn <= 6 && gameBoardArray[row][collumn] == colorInt) {
            count++;
            row += rowDir;
            collumn += collumnDir;
        }
        return count;
    };

    let horizontal = countDirection(0, -1) + countDirection(0, 1) + 1; // +1 is the origin tile
    let vertical = countDirection(-1, 0) + countDirection(1, 0) + 1;
    let diagonal1 = countDirection(-1, 1) + countDirection(1, -1) + 1;
    let diagonal2 = countDirection(-1, -1) + countDirection(1, 1) + 1;

    return horizontal >= 4 || vertical >= 4 || diagonal1 >= 4 || diagonal2 >= 4;
}

[].slice.call(document.getElementsByClassName("gewinnt-input-row")[0].children).forEach((input, index) => {
    input.addEventListener("click", () => {
        if (!gameActive) return;
        dropTile(index, player1 ? 1 : 2);
        if (++moves == 42) {
            gameActive = false;
            
            return;
        }



        if (checkForWin(getFreeRowForCollumn(index) + 1, index, player1 ? 1 : 2)) {
            gameActive = false;
            alert(`Spieler ${player1 ? 1 : 2} hat gewonnen!`);
            return;
        }

        player1 = !player1;
    });
});

createGameBoardArray();