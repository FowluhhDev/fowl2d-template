import { State, colors, startGame } from "../lib/fowl.js";

class GameState extends State {
    constructor() {
        super();
    }

    preload() {
        this.finishPreload();
    }

    create() {
        this.bgColor = colors[1].fowl;
    }

    update(dt) {
        
    }
}

startGame(new GameState());