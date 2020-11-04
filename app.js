const game = document.querySelector('#game');

const computedStyle = getComputedStyle(game);

const height = computedStyle.height;

const width = computedStyle.width;

game.height = height.replace('px', '');

game.width = width.replace('px', '');

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

const rocket = new Rocket(225, 550, 'white', 30, 90);

document.addEventListener('keydown', function(evt) {
    if (evt.key === 'w') {
        rocket.y -= 10
    } else if (evt.key === 'a') {
        rocket.x -= 10
    } else if (evt.key === 's') {
        rocket.y += 10
    } else if (evt.key === 'd') {
        rocket.x +=10
    }
});

document.addEventListener('keyup', function(evt) {
    if (evt.key === 'w') {
        rocket.y -= 10
    } else if (evt.key === 'a') {
        rocket.x -= 10
    } else if (evt.key === 's') {
        rocket.y += 10
    } else if (evt.key === 'd') {
        rocket.x +=10
    }
});

var spawnLineY = 0;

var spawnRate = 1000;

var spawnRateOfDescent = 0.80;

var lastSpawn = -1;

var meteors = [];

var startTime = Date.now();

animate();

var t;

function spawnRandomMeteor() {
    t = "orange"
    var meteor = {
        type: t,
        x: Math.random() * (game.width - 30) + 15,
        y: spawnLineY,
    }
    meteors.push(meteor);
}

function animate() {
    var time = Date.now();
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnRandomMeteor();
    }
    
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, game.width, game.height);
    ctx.beginPath();
    ctx.moveTo(0, spawnLineY);
    ctx.lineTo(game.width, spawnLineY);
    ctx.stroke();
    rocket.render();
    
    for (var i = 0; i < meteors.length; i++) {
        var meteor = meteors[i];
        meteor.y += spawnRateOfDescent;
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = meteor.type;
        ctx.fill();
    }
}




















// EXTRA CODE I DIDNT WANT TO DELETE BUT MIGHT USE LATER 

// // Scrolling image
// var img = new Image(); 
// img.src = "space6.png";

// window.onload = function() { 
    //     var imgHeight = 0; 
    //     var scrollSpeed = 1.5; 
    
    //     function loop() { 
        //         ctx.drawImage(img, 0, imgHeight); 
        //         ctx.drawImage(img, 0, imgHeight - game.height); 
        //         imgHeight += scrollSpeed; 
        
        //        // resets the image 
        //         if (imgHeight == game.height) 
        //             imgHeight = 0; 
        //         window.requestAnimationFrame(loop); 
        //     } 
        //     loop();
        // } 
        
        