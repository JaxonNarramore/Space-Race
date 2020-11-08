# Space-Race
This a game where you are controlling a rocket and the goal is to avoid the astroids and stay alive until you are through the astroid belt!

## Images of game







## Link to live website
https://jaxonnarramore.github.io

## Steps to install on local computer
1. Go to [repo](https://github.com/JaxonNarramore/Space-Race.git) on Github profile
2. `Fork` and `clone` repo
3. Clone to local machine
```text
git clone https://github.com/JaxonNarramore/Space-Race.git
```
4. Go to `Space-Race` directory
5. Open `index.html` in browser
```text
open index.html
```

## Function to spawn random astroids and animate the astroids and rocket

```javascript
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
```

## Function for collision detection

```javascript
function collisionDetection(astroid, rocket) {
    var distX = Math.abs(astroid.x - rocket.x - rocket.width / 2);  
    var distY = Math.abs(astroid.y - rocket.y - rocket.height / 2);

    if (distX <= (rocket.width / 2) && distY <= (rocket.height / 2)) {
       document.getElementById('game-over').innerHTML = 'Game Over';
       document.getElementById('game-over-button').innerHTML = 'Restart';
       restartButton = document.getElementById('game-over-button');
       restartButton.addEventListener('click', gameRestart);
       end();
       cancelAnimationFrame(stop)
    }
    
    var dx = distX - rocket.width / 2;
    var dy = distY - rocket.height / 2;
    return (dx * dx + dy * dy <= (astroid.r * astroid.r));
}
```

## Contact with creator 

Email Adress: jaxon_narramore@hotmail.com