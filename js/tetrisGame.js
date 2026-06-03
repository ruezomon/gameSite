let ms = 1000;

const OTYPE = {
    empty: 0,
    oricky: 1,
    bricky: 2,
    cleve: 3,
    rhode: 4,
    hero: 5,
    teewee: 6,
    smashboy: 7,
    current: 8
};

class Entity {
    shape = [];
    constructor(shape) {
        switch (shape) {
            case OTYPE.oricky:
                shape = [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ];
                // 0, 0 -> 0, 3
                // 0, 1 -> 1, 3
                // 0, 2 -> 2, 3
                // 0, 3 -> 3, 3

                // 1, 0 -> 0, 2
                // 1, 1 -> 1, 2
                // 1, 2 -> 2, 2
                // 1, 3 -> 3, 2
                
                // 2, 0 -> 0, 1
                // 2, 1 -> 1, 1
                // 2, 2 -> 2, 1
                // 2, 3 -> 3, 1

                //...
                break;
            case OTYPE.bricky:
                break;
            case OTYPE.cleve:
                break;
            case OTYPE.rhode:
                break;
            case OTYPE.hero:
                break;
            case OTYPE.teewee:
                break;
            case OTYPE.smashboy:
                break;
            default:
                throw "bad entity shape error";
        }
    }
};

class GameBoard {
    queue = [];

    init() {

    }

    getNewBlock() {

    }

    pushNewBlock() {

    }
};

let game = new GameBoard();

document.getElementById("toggle-difficulty").addEventListener("click", (event) => {
    if (document.getElementById("snake-difficulty").innerHTML == "Easy") {
        ms = 700;
        document.getElementById("snake-difficulty").innerHTML = "Normal";
    } else if (document.getElementById("snake-difficulty").innerHTML == "Normal") {
        ms = 400;
        document.getElementById("snake-difficulty").innerHTML = "Hard";
    } else {
        ms = 1000;
        document.getElementById("snake-difficulty").innerHTML = "Easy";
    }

    game.reset();
});

let e = new Entity(18);