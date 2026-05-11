// head: 8
// snake-parts: 4
// walls: 2
// apples: 1
// empty: 0

// down: +1
// right: +1
// left: -1
// up: -1

const height = 15;
const width = 15;

const gameBoardArray = [];

function buildGameBoardArray(heightInt, widthInt) {
    for (let i = 0; i < heightInt + 2; i++) {
        gameBoardArray.push([]);
        for (let j = 0; j < widthInt + 2; j++) {
            gameBoardArray[i].push((j == 0 || j == widthInt + 1 || i == 0 || i == widthInt + 1) ? 8 : 0);
        }
    }
}

function placeHeadAt(x, y) {
    
}

function visualizeHead() {
    
}

buildGameBoardArray(height, width);