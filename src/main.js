import { BaseState, colors, startGame } from "./fowl.js";

class GameState extends BaseState {
    constructor() {
        super()
    }

    create() {
        this.bgColor = colors.fowl;
    }

    update(dt) {
        
    }
}


startGame(new GameState());