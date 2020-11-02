// Defining variables / Grabbing elements
const game = document.querySelector('#game');

const computedStyle = getComputedStyle(game);

const height = computedStyle.height;

const width = computedStyle.width;

game.height = height.replace('px', '');

game.width = width.replace('px', '');

// Grabbing context from the canvas
const ctx = game.getContext('2d');

class Rocket {
    constructor(x, y, color, width, height) {  // change color to image later
        this.x = x
        this.y = y
        this.color = color  // Change to sprite image later
        this.width = width
        this.height = height
        this.alive = true
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

const rocket = new Rocket(215, 415, 'white', 40, 90);
rocket.render();

class Obsticals {
    constructor(x, y, color, width, height) {  // Change color to image later
        this.x = x
        this.y = y
        this.color = color  // Change to sprite image later
        this.width = width
        this.height = height
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

const satellite = new Obsticals()
const ufo = new Obsticals()
const meteor = new Obsticals()







