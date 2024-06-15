import { GameState, colors, setScene } from "./fowljs.js"

class Game extends GameState {
    constructor() {
        super();
    }

    init() {
        this.bgColor = colors.blue;
    }

    draw() {

    }

    update() {

    }
}

setScene(new Game());