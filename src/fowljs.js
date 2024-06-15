// FowlJS code, do not modify unless you know what you're doing!

// declares the delta
let delta;

// colors
export var colors = {
    white:         "#FFFFFF",
    silver:        "#CCCCCC",
    gray:          "#777777",
    black:         "#000000",
    red:           "#DE3163",
    candyapplered: "#E6192E",
    orange:        "#FF7F50",
    yorange:       "#FFBF00",
    yellow:        "#FFDF00",
    yelleen:       "#9DD62B",
    green:         "#9FE2BF",
    darkgreen:     "#22AB63",
    teal:          "#40E0D0",
    skyblue:       "#00BBFF",
    fowl:          "#0085FF",
    blue:          "#6495ED",
    deepblue:      "#15158A",
    purple:        "#8128D4",
    fushcia:       "#CCCCFF",
    hotpink:       "#DB2162",
    lime:          "#77CC77",
    lemon:         "#CCCC77",
    rgblue:        "#0000FF",
    rgreenb:       "#00FF00",
    redgb:         "#FF0000",
}

// colors from id to a name just in case
export var colorIDs = {
    0:          "white",
    1:         "silver",
    2:           "gray",
    3:          "black",
    4:            "red",
    5:  "candyapplered",
    6:         "orange",
    7:        "yorange",
    8:         "yellow",
    9:        "yelleen",
    10:         "green",
    11:     "darkgreen",
    12:          "teal",
    13:       "skyblue",
    14:          "fowl",
    15:          "blue",
    16:      "deepblue",
    17:        "purple",
    18:       "fushcia",
    19:       "hotpink",
    20:          "lime",
    21:         "lemon",
    22:         "redgb",
    23:       "rgreenb",
    24:        "rgblue",
}

// base gamestate class
export class GameState {
    constructor() {
        this.canvas = document.querySelector("#app");
        this.ctx = this.canvas.getContext("2d");

        this.isMouseHidden = false;
    
        this.bgColor = colors.gray;
        
        // controller allows input
        this.controller = {
            "ArrowLeft":  {down: false},
            "ArrowRight": {down: false},
            "ArrowUp":    {down: false},
            "ArrowDown":  {down: false},
            "Enter":      {down: false},
            "Shift":      {down: false},
            "Control":    {down: false},
            "Escape":     {down: false},
            "a":          {down: false},
            "b":          {down: false},
            "c":          {down: false},
            "d":          {down: false},
            "e":          {down: false},
            "f":          {down: false},
            "g":          {down: false},
            "h":          {down: false},
            "i":          {down: false},
            "j":          {down: false},
            "k":          {down: false},
            "l":          {down: false},
            "m":          {down: false},
            "n":          {down: false},
            "o":          {down: false},
            "p":          {down: false},
            "q":          {down: false},
            "r":          {down: false},
            "s":          {down: false},
            "t":          {down: false},
            "u":          {down: false},
            "v":          {down: false},
            "w":          {down: false},
            "x":          {down: false},
            "y":          {down: false},
            "z":          {down: false},
            "1":          {down: false},
            "2":          {down: false},
            "3":          {down: false},
            "4":          {down: false},
            "5":          {down: false},
            "6":          {down: false},
            "7":          {down: false},
            "8":          {down: false},
            "9":          {down: false},
            "0":          {down: false},
        };

        this.mouseController = {
            0: {down: false, clicked: false},
            1: {down: false, clicked: false},
            2: {down: false, clicked: false},
        }

        this.manager = null;

        this.mousePos = {x: 0, y: 0}

        this.baseInit();
    }

    baseInit() {
        this.camera = new Camera(this.ctx);
        // get keys down and bind them to controller
        window.addEventListener("keydown", (e) => {
            if (this.controller[e.key]) {
                this.controller[e.key].down = true;
            }
        });

        // remove keys when up
        window.addEventListener("keyup", (e) => {
            if (this.controller[e.key]) {
                this.controller[e.key].down = false;
            }
        });

        window.addEventListener("mousedown", (e) => {
            if (this.mouseController[e.button]) {
                this.mouseController[e.button].down = true;
                this.mouseController[e.button].clicked = true;
                setTimeout(() => {
                    this.mouseController[e.button].clicked = false;
                }, 1);
            }
        });

        window.addEventListener("mouseup", (e) => {
            if (this.mouseController[e.button]) {
                this.mouseController[e.button].down = false;
                this.mouseController[e.button].clicked = false;
            }
        });

        window.addEventListener("mousemove", (e) => {
            this.mousePos = getMousePos(this.canvas, e);
        });

        this.init();
    }

    init() {
        
    }

    baseDraw() {
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(-100000, -100000, this.canvas.width + 100000, this.canvas.height + 100000);

        this.draw();
    }

    draw() {

    }

    baseUpdate() {
        if (this.isMouseHidden) {
            this.canvas.style.cursor = "none";
        } else {
            this.canvas.style.cursor = "default";
        }
        this.update();
    }

    update() {

    }
}

export class Camera {
    constructor(canvas) {
        this.ctx = canvas;
    }

    apply(x, y) {
        this.ctx.resetTransform();
        this.ctx.translate(-x, -y);
    }
}

// the scene manager
class SceneManager {
    constructor() {
        
    }

    start(starting_scene) {
        this.go_to(starting_scene);
    }

    go_to(scene) {
        this.scene = scene;
        this.scene.manager = this;
    }
}

export function drawImage(src,x,y,ctx) {
    const img = new Image();
    img.src = src;
    ctx.drawImage(img, x, y);
}

// tilemap stuff
export class TileMap {
    constructor(data, tilesize, offsetx = 0, offsety = 0) {
        this.data = data;
        this.offsetX = offsetx;
        this.offsetY = offsety;
        this.tilesize = tilesize;
        this.tilePaths = [];
    }

    addTile(path) {
        this.tilePaths.push(path);
    }

    drawMap(ctx) {
        for (let y = 0; y < this.data.length; y++) {
            const row = this.data[y];
            for (let x = 0; x < row.length; x++) {
                const tile = this.data[y][x];
                drawImage(this.tilePaths[tile], this.offsetX+(x*this.tilesize), this.offsetY+(y*this.tilesize), ctx);
            }
        }
    }
}

export class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

export class Font {
    constructor(size = 24, name = "serif") {
        this.size = size;
        this.name = name;
    }

    getMerged() {
        return this.size.toString() + "px " + this.name;
    }

    getSize() {
        return this.size;
    }

    getName() {
        return this.name;
    }
}

// stuff related to initializing the game
var starting_scene;
var manager = new SceneManager();

export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Sound {
    constructor(src) {
        this.src = src;
    }

    play() {
        var audio = new Audio(this.src);
        audio.play();
    }
}

export class Music {
    constructor(src) {
        this.src = src;
    }

    play() {
        this.audio = new Audio(this.src);
        audio.play();
    }

    stop() {
        this.audio.pause();
        this.audio.fastSeek(0);
    }
}

// sets the class since you cant in the game script
export function setScene(x) {
    starting_scene = x;
    manager.start(starting_scene);
}

// collisions
export function getCollision(obj1, obj2) {
    if (
        obj1.x < obj2.x + obj2.w &&
        obj1.x + obj1.w > obj2.x &&
        obj1.y < obj2.y + obj2.h &&
        obj1.y + obj1.h > obj2.y
    ) {
        return true;
    } else {
        return false;
    }
}

export function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

export function getKey(key1, controller) {
    return controller[key1].down;
}

export function getKeys(key1, key2, controller) {
    return controller[key1].down || controller[key2].down;
}

// drawing
export function drawRectangle(x,y,w,h,col,ctx) {
    ctx.fillStyle = col;
    ctx.fillRect(x,y,w,h);
}

export function drawStrokedRectangle(x,y,w,h,col,ocol,ow,ctx) {
    ctx.fillStyle = ocol;
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle = col;
    ctx.fillRect(x+(ow),y+(ow),w-(ow*2),h-(ow*2));
}

export function drawText(text,x,y,col,font,ctx) {
    ctx.fillStyle = col;
    ctx.font = font.getMerged();
    ctx.fillText(text,x,y+(font.getSize()-10));
}

export function drawStrokedText(text,x,y,col,strokeCol,strokeW,font,ctx) {
    ctx.fillStyle = col;
    ctx.font = font.getMerged();
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = strokeW*2;
    ctx.strokeText(text, x, y+(font.getSize()-10));
    ctx.fillText(text,x,y+(font.getSize()-10));
}

export function drawLine(p1,p2,w,col,ctx) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineWidth = w;
    ctx.strokeStyle = col;
    ctx.stroke();
}

// updating and delta time
let now;
let then = performance.now();

function gameLoop() {
  let interval = 1000 / 60;

  now = performance.now()
  delta = now - then;

  if (delta > interval) {
    then = now - (delta % interval);

    manager.scene.baseUpdate();
    manager.scene.baseDraw();
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);