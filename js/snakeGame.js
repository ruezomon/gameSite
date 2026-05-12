const SNAKE = {
    wall: 8,
    head: 4,
    snake: 2,
    apple: 1,
    empty: 0
};

const DIRECTION = {
    up: 0,
    right: 1,
    down: 2,
    left: 3
};

class Snake {
    headX;
    headY;
    length;

    constructor(x, y, length) {
        this.length = length;
        this.headX = x;
        this.headY = y;
        
        gameBoardArray[y + 1][x + 1] = SNAKE.head;
        for (let i = 0; i < length - 1; i++)
            gameBoardArray[y + 1][x - i] = SNAKE.snake;
    }
    moveUp() {

    }
    moveDown() {

    }
    moveRight() {

    }
    moveLeft() {

    }
};

const height = 15;
const width = 15;

const gameBoardArray = [];
const gameBoardElement = document.getElementById("snake-game-board");

function buildGameBoardArray(heightInt, widthInt) {
    while (true)
        if (gameBoardArray.pop() === undefined) break;
    for (let i = 0; i < heightInt + 2; i++) {
        gameBoardArray.push([]);
        for (let j = 0; j < widthInt + 2; j++) {
            gameBoardArray[i].push((j == 0 || j == widthInt + 1 || i == 0 || i == widthInt + 1) ? SNAKE.wall : SNAKE.empty);
        }
    }
}

function update() {
    gameBoardArray.forEach((element, y) => {
        if (y === 0 || y === height + 1) return;
        element.forEach((element, x) => {
            if (element === 8) return;
            gameBoardElement[y + 1][x + 1] = element === SNAKE.head ? "head" : 
                                                element === SNAKE.snake ? "tail" : 
                                                element === SNAKE.apple ? "apple" : "none";
        });
    });
}

buildGameBoardArray(height, width);
player = new Snake(5, 3, 3);
gameBoardArray.forEach(element => {
    console.log(element);
});

update();