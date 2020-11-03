// Defining variables / Grabbing elements
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

const rocket = new Rocket(300, 425, 'white', 30, 90);

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
})

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
})

var posX = 20, posY = 100;

setInterval(function() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,game.width, game.height);
    posX += 6;
    posY += 4;
    ctx.beginPath();
    ctx.fillStyle = "orange";
    ctx.arc(posX, posY, 20, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();
    rocket.render();
    
}, 30);



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
        
        
        // function rePaint() {
            //     ctx.clearRect(0, 0, game.width, game.height)
            
            
            
            //     // rocket.render();
            //     // meteor.render();
            
            // }
            
            // setInterval(rePaint, 1000 / 60) 
            
            
            
            // class Obsticals {
                //     constructor(x, y, color, width, height, velocity) {  // Change color to image later
                //         this.x = x
                //         this.y = y
                //         this.color = color  // Change to sprite image later
                //         this.width = width
                //         this.height = height
                //         this.velocity = velocity
                //     }
                //     render() {
                    //         ctx.fillStyle = this.color
                    //         ctx.fillRect(this.x, this.y, this.width, this.height)
                    //     }
                    // }
                    
            
                    // const meteor = new Obsticals(200, 325, 'grey', 20, 20);
                    

                    // meteor.render();