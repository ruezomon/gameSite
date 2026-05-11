// head: 8
// snake-parts: 4
// walls: 2
// apples: 1
// empty: 0

// down: +1
// right: +1
// left: -1
// up: -1

const SNAKE = {
    wall: 8,
    head: 4,
    snake: 2,
    apple: 1,
    empty: 0
};

const height = 15;
const width = 15;

const gameBoardArray = [];

function buildGameBoardArray(heightInt, widthInt) {
    for (let i = 0; i < heightInt + 2; i++) {
        gameBoardArray.push([]);
        for (let j = 0; j < widthInt + 2; j++) {
            gameBoardArray[i].push((j == 0 || j == widthInt + 1 || i == 0 || i == widthInt + 1) ? SNAKE.wall : SNAKE.empty);
        }
    }
}

function initSnakeHeadAt(x, y) {
    gameBoardArray[x + 1][y + 1] = 4;
}

function visualizeHead() {

}

buildGameBoardArray(height, width);