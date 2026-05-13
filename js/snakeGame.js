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

const gameBoardArray = [];
let mustPlaceApple = false;

class Snake {
    direction = DIRECTION.right;
    // relative to the array
    length;
    pieces = [];
    mustIncrease = Boolean();

    constructor(x, y, length) {
        this.length = length;
        
        gameBoardArray[y + 1][x + 1] = SNAKE.head;
        this.pieces.push([y + 1, x + 1]);
        for (let i = 0; i < length - 1; i++) {
            gameBoardArray[y + 1][x - i] = SNAKE.snake;
            this.pieces.push([y + 1, x - i]);
        }
    }

    headIsFine() {
        if (gameBoardArray[this.pieces[0][0]][this.pieces[0][1]] !== SNAKE.head) return false;
        else return true;
    }

    shiftSnake() {
        if (this.mustIncrease === true) {
            this.mustIncrease = false; 
        } else {
            let last = this.pieces.pop();
            gameBoardArray[last[0]][last[1]] = SNAKE.empty;
        }
    }

    moveDown() {
        if (this.direction === DIRECTION.up) return;
        gameBoardArray[this.pieces[0][0] + 1][this.pieces[0][1]] += SNAKE.head;
        gameBoardArray[this.pieces[0][0]][this.pieces[0][1]] = SNAKE.snake;
        this.pieces.unshift([this.pieces[0][0] + 1, this.pieces[0][1]]);
        this.direction = DIRECTION.down;

        this.update();
        this.shiftSnake();
        if (!this.headIsFine()) lose();
    }

    moveUp() {
        if (this.direction === DIRECTION.down) return;
        gameBoardArray[this.pieces[0][0] - 1][this.pieces[0][1]] += SNAKE.head;
        gameBoardArray[this.pieces[0][0]][this.pieces[0][1]] = SNAKE.snake;
        this.pieces.unshift([this.pieces[0][0] - 1, this.pieces[0][1]]);
        this.direction = DIRECTION.up;

        this.update();
        this.shiftSnake();
        if (!this.headIsFine()) lose();
    }

    moveRight() {
        if (this.direction === DIRECTION.left) return;
        gameBoardArray[this.pieces[0][0]][this.pieces[0][1] + 1] += SNAKE.head;
        gameBoardArray[this.pieces[0][0]][this.pieces[0][1]] = SNAKE.snake;
        this.pieces.unshift([this.pieces[0][0], this.pieces[0][1] + 1]);
        this.direction = DIRECTION.right;

        this.update();
        this.shiftSnake();
        if (!this.headIsFine()) lose();
    }

    moveLeft() {
        if (this.direction === DIRECTION.right) return;
        gameBoardArray[this.pieces[0][0]][this.pieces[0][1] - 1] += SNAKE.head;
        gameBoardArray[this.pieces[0][0]][this.pieces[0][1]] = SNAKE.snake;
        this.pieces.unshift([this.pieces[0][0], this.pieces[0][1] - 1]);
        this.direction = DIRECTION.left;

        this.update();
        this.shiftSnake();
        if (!this.headIsFine()) lose();
    }

    update() {
        switch (gameBoardArray[this.pieces[0][0]][this.pieces[0][1]] - SNAKE.head) {
            case SNAKE.wall:
                break;
            case SNAKE.snake:
                break;
            case SNAKE.apple:
                this.length++;
                gameBoardArray[this.pieces[0][0]][this.pieces[0][1]] = SNAKE.head;
                this.mustIncrease = true;
                mustPlaceApple = true;
                break;
        }
    }
};


class gameBoard {
    height = Number();
    width = Number();

    gameBoardElement = null;

    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.buildGameBoardArray();
        this.gameBoardElement = document.getElementById("snake-game-board");
    }

    buildGameBoardArray() {
        while (true) 
            if (gameBoardArray.pop() === undefined) break;;
        for (let i = 0; i < this.height + 2; i++) {
            gameBoardArray.push([]);
            for (let j = 0; j < this.width + 2; j++) {
                gameBoardArray[i].push((j == 0 || j == this.width + 1 || i == 0 || i == this.width + 1) ? SNAKE.wall : SNAKE.empty);
            }
        }
    }

    update() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                switch (gameBoardArray[y + 1][x + 1]) {
                    case SNAKE.head:
                    case SNAKE.head + SNAKE.snake:
                        this.gameBoardElement.children[y].children[x].setAttribute("contents", "head");
                        break;
                    case SNAKE.snake:
                        this.gameBoardElement.children[y].children[x].setAttribute("contents", "snake");
                        break;
                    case SNAKE.apple:
                        this.gameBoardElement.children[y].children[x].setAttribute("contents", "apple");
                        break;
                    case SNAKE.empty:
                        this.gameBoardElement.children[y].children[x].setAttribute("contents", "empty");
                        break;
                }
            }
        } 
    }

    placeApple() {
        let y = Number();
        let x = Number();
        do {
            y = Math.round(Math.random() * 1000) % this.height;
            x = Math.round(Math.random() * 1000) % this.width;
        } while (gameBoardArray[y + 1][x + 1] !== SNAKE.empty);
        gameBoardArray[y + 1][x + 1] = SNAKE.apple; 
    }

    startGame() {
        gameActive = true;
    }

    stopGame() {
        gameActive = false;
    }

    reset() {
        this.buildGameBoardArray();
    }
}

let gameActive = true;
let game = new gameBoard(15, 15);
let player = new Snake(5, 3, 3);
player = new Snake(5, 3, 3);

document.addEventListener("keypress", (event) => {
    if (event.key === "w") {
        player.moveUp();
    } else if (event.key === "a") {
        player.moveLeft();
    } else if (event.key === "d") {
        player.moveRight();
    } else if (event.key == "s") {
        player.moveDown();
    }
    if (mustPlaceApple === true) {
        game.placeApple();
        mustPlaceApple = false;
    }
    game.update();
});

function lose() {
    alert("ya dumbfuck");
}

function win() {

}

game.placeApple();
game.update();