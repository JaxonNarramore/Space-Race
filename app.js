// Game variables
const game = document.querySelector('#game');

game.height = 600;

game.width = 400;

let restartButton;

var startTime, endTime;

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

// Key press linking 
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

// Astroid spawning variables
var spawnLineY = 0;

var spawnRate = 500;

var spawnRateOfDescent = 0.90;

var lastSpawn = -1;

var astroids = [];

var startTime = Date.now();

var t;

var stop;

animate();

// Random astroid spawning
function spawnRandomAstroid() {
    t = "orange"
    const astroid = {
        type: t,
        x: Math.random() * (game.width - 30) + 15,
        y: spawnLineY,
        r: 10
    }
    astroids.push(astroid);
}

// Animation
function animate() {
    var time = Date.now();
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnRandomAstroid();
    }
    
    stop = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, game.width, game.height);
    ctx.beginPath();
    ctx.moveTo(0, spawnLineY);
    ctx.lineTo(game.width, spawnLineY);
    ctx.stroke();
    
    for (var i = 0; i < astroids.length; i++) {
        var astroid = astroids[i];
        astroid.y += spawnRateOfDescent;
        ctx.beginPath();
        ctx.arc(astroid.x, astroid.y, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = astroid.type;
        ctx.fill();
        rocket.render();
    }
    for (let i = 0; i < astroids.length; i++) {
        collisionDetection(astroids[i], rocket)
    }
}

// Collision detection
function collisionDetection(astroid, rocket) {
    var distX = Math.abs(astroid.x - rocket.x - rocket.width / 1.5);  
    var distY = Math.abs(astroid.y - rocket.y - rocket.height / 1.8);

    if (distX <= (rocket.width / 1.5) && distY <= (rocket.height / 1.8)) {
       document.getElementById('game-over').innerHTML = 'Game Over';
       document.getElementById('game-over-button').innerHTML = 'Restart';
       restartButton = document.getElementById('game-over-button');
       restartButton.addEventListener('click', gameRestart);
       end();
       cancelAnimationFrame(stop)
       document.getElementById('scoretext').innerHTML = 'Score';
    //    document.getElementById('score').innerHTML = seconds;
    }
    
    var dx = distX - rocket.width / 1.5;
    var dy = distY - rocket.height / 1.8;
    return (dx * dx + dy * dy <= (astroid.r * astroid.r));
}

// Restart button
function gameRestart() {
    location.reload();
}

// Score keeping 
function start() {
    startTime = new Date();
};

function end() {
    endTime = new Date();
    var timeDiff = endTime - startTime; 
    timeDiff /= 1000;
    
    let seconds = Math.round(timeDiff);
    document.getElementById('score').innerHTML = seconds;


const finalScore = document.getElementById('score');

const mostRecentScore = localStorage.getItem('mostRecentScore')

let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

finalScore.innerText = mostRecentScore;

const score = {
    score: seconds
};

highScores.push(score);

highScores.sort((a, b) => b.score - a.score);

highScores.splice(5);

localStorage.setItem('highScores', JSON.stringify(highScores));

document.getElementById('score').innerHTML = seconds;
}

const highScoreList = document.getElementById('highscore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoreList.innerHTML = highScores.map(score => {
    return `<li>${score.score}</li>`;
}).join('');

























// var localStorageName = 'bestestscore';

// var highScore;

// highScore = localStorage.getItem(localStorageName) == null ? 0 :
//             localStorage.getItem(localStorageName);


// if(localStorage.getItem(localStorageName) == null) {
//     highScore = 0;
// } else {
//     highScore = localStorage.getItem(localStorageName);
// }

// function getHighScore() {
//     highScore = Math.max(score, highScore);
//     localStorage.setItem(localStorageName, highScore);
    
//     var style = {
//         font: "32px Monospace",
//         fill: "#00ff00",
//         align: "center"
//     }
    
//     var text = game.add.text(
//         game.width / 2, game.height / 2, "Game Over\n\nYour score: " + score + "\nBest score: " + highScore + "\n\nTap to restart", style
//     );
    
//     text.anchor.set(0.5);
//     game.input.onDown.add(this.restartGame, this);
// }




























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
        
        