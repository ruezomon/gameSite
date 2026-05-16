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
let mustReset = false;

let ms = 300;

class Snake {
    deletedPiece = [0, 0];
    direction = DIRECTION.right;
    queuedDirection = DIRECTION.right;
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

    queueDirection(direction) {
        this.queuedDirection = direction;
    }

    setDirection() {
        if (this.queuedDirection != this.direction - 2 && this.queuedDirection != this.direction + 2)
            this.direction = this.queuedDirection;
    }

    headIsFine() {
        return !gameBoardArray[this.pieces[0][0]][this.pieces[0][1]] !== SNAKE.head
    }

    shiftSnake() {
        if (this.mustIncrease === true) {
            this.mustIncrease = false;
        } else {
            this.deletedPiece = this.pieces.pop();
            gameBoardArray[this.deletedPiece[0]][this.deletedPiece[1]] = SNAKE.empty;
        }
    }

    moveDown() {
        if (this.direction === DIRECTION.up) return;
        gameBoardArray[this.pieces[0][0] + 1][this.pieces[0][1]] += SNAKE.head;
        gameBoardArray[this.pieces[0][0]][this.pieces[0][1]] = SNAKE.snake;
        this.pieces.unshift([this.pieces[0][0] + 1, this.pieces[0][1]]);
        this.direction = DIRECTION.down;

        this.shiftSnake();
        this.update();
    }

    moveUp() {
        if (this.direction === DIRECTION.down) return;
        gameBoardArray[this.pieces[0][0] - 1][this.pieces[0][1]] += SNAKE.head;
        gameBoardArray[this.pieces[0][0]][this.pieces[0][1]] = SNAKE.snake;
        this.pieces.unshift([this.pieces[0][0] - 1, this.pieces[0][1]]);
        this.direction = DIRECTION.up;

        this.shiftSnake();
        this.update();
    }

    moveRight() {
        if (this.direction === DIRECTION.left) return;
        gameBoardArray[this.pieces[0][0]][this.pieces[0][1] + 1] += SNAKE.head;
        gameBoardArray[this.pieces[0][0]][this.pieces[0][1]] = SNAKE.snake;
        this.pieces.unshift([this.pieces[0][0], this.pieces[0][1] + 1]);
        this.direction = DIRECTION.right;

        this.shiftSnake();
        this.update();
    }

    moveLeft() {
        if (this.direction === DIRECTION.right) return;
        gameBoardArray[this.pieces[0][0]][this.pieces[0][1] - 1] += SNAKE.head;
        gameBoardArray[this.pieces[0][0]][this.pieces[0][1]] = SNAKE.snake;
        this.pieces.unshift([this.pieces[0][0], this.pieces[0][1] - 1]);
        this.direction = DIRECTION.left;

        this.shiftSnake();
        this.update();
    }

    move() {
        if (!gameActive) return;
        // calling from function-array doesnt work?
        switch (this.direction) {
            case DIRECTION.up:
                this.moveUp();
                break;
            case DIRECTION.right:
                this.moveRight();
                break;
            case DIRECTION.down:
                this.moveDown();
                break;
            case DIRECTION.left:
                this.moveLeft();
                break;
        }
    }

    update() {
        switch (gameBoardArray[this.pieces[0][0]][this.pieces[0][1]] - SNAKE.head) {
            case -4:
                gameBoardArray[this.pieces[0][0]][this.pieces[0][1]] = SNAKE.head;
                break;
            case SNAKE.wall:
            case SNAKE.snake:
                lose();
                break;
            case SNAKE.apple:
                this.length++;
                gameBoardArray[this.pieces[0][0]][this.pieces[0][1]] = SNAKE.head;
                mustPlaceApple = true;
                this.mustIncrease = true;
                // this.pieces.push(this.deletedPiece);
                break;
        }
        if (this.length >= 225) {
            win();
        }
    }
}


class gameBoard {
    height = Number();
    width = Number();

    gameLoopID = Number();
    gameBoardElement = null;
    scoreElement = null;

    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.buildGameBoardArray();
        this.gameBoardElement = document.getElementById("snake-game-board");
        this.scoreElement = document.getElementById("snake-score-apples");
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
        if (player.length === 225) win();
        this.scoreElement.innerHTML = `Length: ${player.length}`;
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

    startGame(key) {
        if (key === 39 && !mustReset && !gameActive) {
            gameActive = true;
            document.getElementById("comment-snake").innerHTML = "Collect all the apples!"
            document.getElementById("meta-message-snake").innerHTML = "Survive"
            this.gameLoopID = setInterval(() => {
                player.setDirection();
                player.move();
                game.update();
            }, ms);
        }
    }

    stopGame() {
        mustReset = true;
        gameActive = false;
        clearInterval(this.gameLoopID);
    }

    reset() {
        clearInterval(game.gameLoopID);
        mustReset = false;
        mustPlaceApple = false;
        this.buildGameBoardArray();
        player = new Snake(5, 3, 3);
        gameActive = false;
        this.scoreElement.innerHTML = "Length: 3";
        game.placeApple();
        game.update();
        document.getElementById("comment-snake").innerHTML = "Collect all the apples!"
        document.getElementById("meta-message-snake").innerHTML = "Press right-arrow key to start"
    }
}

let gameActive = false;
let game = new gameBoard(15, 15);
let player = new Snake(5, 3, 3);

document.getElementById("snake-reset-button").addEventListener("click", game.reset.bind(game)); // .bind() by AI

document.getElementById("snake-difficulty").addEventListener("click", (event) => {
    if (document.getElementById("snake-difficulty").innerHTML == "Easy") {
        ms = 120;
        document.getElementById("snake-difficulty").innerHTML = "Normal";
    } else if (document.getElementById("snake-difficulty").innerHTML == "Normal") {
        ms = 60;
        document.getElementById("snake-difficulty").innerHTML = "Hard";
    } else {
        ms = 240;
        document.getElementById("snake-difficulty").innerHTML = "Easy";
    }

    game.reset();
});

document.addEventListener("keydown", (event) => {
    game.startGame(event.keyCode);

    if (!gameActive) return;

    switch (event.keyCode) {
        case 37:
            event.preventDefault();
            player.queueDirection(DIRECTION.left);
            break;
        case 38:
            event.preventDefault();
            player.queueDirection(DIRECTION.up);
            break;
        case 39:
            event.preventDefault();
            player.queueDirection(DIRECTION.right);
            break;
        case 40:
            event.preventDefault();
            player.queueDirection(DIRECTION.down);
            break;
    }

    if (mustPlaceApple === true) {
        game.placeApple();
        mustPlaceApple = false;
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "r") game.reset().bind(game);
});

function lose() {
    mustReset = true;
    game.stopGame();
    document.getElementById("comment-snake").innerHTML = "You lost!";
    document.getElementById("meta-message-snake").innerHTML = "Click reset to try again."
}

function win() {
    game.stopGame();
    document.getElementById("comment-snake").innerHTML = "You won!";
    document.getElementById("meta-message-snake").innerHTML = "Congratulations, you have no life."
}

function init() {
    game.placeApple();
    game.update();
}

init();

// quick AI update: i had an issue, where the snake became rapidly faster over time
// i asked an AI and found the problem: i was stacking gameloops!!
// the AI helped me in fixing that