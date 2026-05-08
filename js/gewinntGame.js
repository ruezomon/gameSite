const gameBoardArray = [];

function createGameBoard() {
    gameBoardArray.length = 0;
    for (let i = 0; i < 6; i++) {
        gameBoardArray.push([]);
        for (let j = 0; j < 7; j++) {
            gameBoardArray[i].push(0);
        }
    }
}

function dropTile(collumnInt, colorInt) {
    if (getFreeRow(collumnInt) === -1) return false;
    gameBoardArray[getFreeRow(collumnInt)][collumnInt] = colorInt;
    return true;
}

function getFreeRow(collumnInt) {
    if (gameBoardArray[0][collumnInt] !== 0) return -1;
    if (gameBoardArray[5][collumnInt] === 0) return 5;
    for (let i = 0; i < 6; i++)
        if (gameBoardArray[i][collumnInt] !== 0) return i - 1;
}

function checkForWin(originRowInt, originCollumnInt, colorInt) {
    let left = 0, right = 0, up = 0, down = 0;
    let upright = 0, upleft = 0, downright = 0, downleft = 0;
    let currentRow = originRowInt, currentCollumn = originCollumnInt;

    // check left
    for (; gameBoardArray[currentRow][currentCollumn] === colorInt && 0 <= currentCollumn; currentCollumn--) left++;
    currentCollumn = originCollumnInt;
    // check right
    for (; gameBoardArray[currentRow][currentCollumn] === colorInt && currentCollumn <= 6; currentCollumn++) right++;
    currentCollumn = originCollumnInt;
    // check up
    for (; gameBoardArray[currentRow][currentCollumn] === colorInt && 0 <= currentRow; currentRow--) up++;
    currentRow = originRowInt;
    // check down
    for (; gameBoardArray[currentRow][currentCollumn] === colorInt && currentRow <= 5; currentRow++) down++;
    currentRow = originRowInt;

    // check upright
    for (; gameBoardArray[currentRow][currentCollumn] === colorInt && (0 <= currentRow && currentCollumn <= 6); upright++) { currentRow--; currentCollumn++; }
    currentRow = originRowInt;
    currentCollumn = originCollumnInt;

    // check downright
    for (; gameBoardArray[currentRow][currentCollumn] === colorInt && (currentRow <= 5 && currentCollumn <= 6); downright++) { currentRow++; currentCollumn++; }
    currentRow = originRowInt;
    currentCollumn = originCollumnInt;

    // check upleft 
    for (; gameBoardArray[currentRow][currentCollumn] === colorInt && (0 <= currentRow && 0 <= currentCollumn); upleft++) { currentRow--; currentCollumn--; }
    currentRow = originRowInt;
    currentCollumn = originCollumnInt;

    // check downleft 
    for (; gameBoardArray[currentRow][currentCollumn] === colorInt && (currentRow <= 5 && 0 <= currentCollumn); upleft++) { currentRow--; currentCollumn--; }
    currentRow = originRowInt;
    currentCollumn = originCollumnInt;

    // to account for the 1 tile already placed, i compare with 3 instead of 4
    console.log(`Left: ${left}
right: ${right}
top: ${up}
bottom: ${down}

upright: ${upright}
upleft: ${upleft}
bottomright: ${downright}
bottomleft: ${downleft}`);
    return ((left + right <= 3) || (up + down <= 3) || (upright + downleft <= 3) || (downright + upleft <= 3));
}

createGameBoard();

dropTile(2, 3);
dropTile(2, 3);
dropTile(2, 3);
console.log(gameBoardArray);
console.log(checkForWin(2, getFreeRow(2) + 1));
console.log(checkForWin(2, getFreeRow(2) + 1));