const game = document.querySelector('#game');

// const score = document.querySelector('#score');

// const computedStyle = getComputedStyle(game);

// const height = computedStyle.height;

// const width = computedStyle.width;

game.height = 600; //height.replace('px', '');

game.width = 400; //width.replace('px', '');

let restartButton;

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

const rocket = new Rocket(225, 550, 'white', 25, 80);

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

var spawnRate = 500;

var spawnRateOfDescent = 0.90;

var lastSpawn = -1;

var meteors = [];

var startTime = Date.now();

var t;

animate();

function spawnRandomMeteor() {
    t = "orange"
    const meteor = {
        type: t,
        x: Math.random() * (game.width - 30) + 15,
        y: spawnLineY,
        r: 10
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
    
    for (var i = 0; i < meteors.length; i++) {
        var meteor = meteors[i];
        meteor.y += spawnRateOfDescent;
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = meteor.type;
        ctx.fill();
        rocket.render();
    }
    for (let i = 0; i < meteors.length; i++) {
        collisionDetection(meteors[i], rocket)
    }
}

function collisionDetection(meteor, rocket) {
    var distX = Math.abs(meteor.x - rocket.x - rocket.width / 2);  
    var distY = Math.abs(meteor.y - rocket.y - rocket.height / 2);

    if (distX <= (rocket.width / 2) && distY <= (rocket.height / 2)) {
       document.getElementById('game-over').innerHTML = 'Game Over';
       document.getElementById('game-over-button').innerHTML = 'Restart';
       restartButton = document.getElementById('game-over-button');
       restartButton.addEventListener('click', gameRestart);
       
    }
    
    var dx = distX - rocket.width / 2;
    var dy = distY - rocket.height / 2;
    
    return (dx * dx + dy * dy <= (meteor.r * meteor.r));
}

function gameRestart() {
    location.reload();
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
        
        