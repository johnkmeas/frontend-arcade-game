// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed =  speed;


   
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   this.x = this.x + this.speed * dt;
   if (this.x > 500) {
    this.x = -75;
    this.randomSpeed();
   }
   if (this.x > player.x -60 && this.x < player.x +60 && 
    this.y > player.y -60 && this.y < player.y +60

        ){
        player.resetPosition();
   }


    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.randomSpeed = function() {
    var upSpeed = Math.floor(Math.random() * 3 + 2);
    this.speed = 80 * upSpeed;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var playerXaxis = 200;
var playerYaxis = 400;

var player = function(){
    this.sprite = 'images/char-boy.png'
    this.x = playerXaxis;
    this.y = playerYaxis;
};
player.prototype.update = function(dt) {

};

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
player.prototype.resetPosition = function() {
    this.x = playerXaxis;
    this.y = playerYaxis;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
allEnemies = [];

for (var i = 0; i < 3; i++) {
    var tempSpeed = Math.floor(Math.random() * 5 + 1) * 75;
    allEnemies.push(new Enemy(-50, i * 83 + 50, tempSpeed));
}
// Place the player object in a variable called player
var player = new player();
var leftwall = 50;
var rightwall = 380;
var bottomwall = 380;
var topwall = 130;
var step = 100;
player.handleInput =function(key){
    if (key === 'left'){
        if (this.x < leftwall){
            return null;
        }
        this.x -= step;
    }
    if (key === 'right'){
        if (this.x > rightwall){
            return null;
        }
        this.x += step;
    }
    if (key === 'up'){
        if (this.y < topwall){ // Winner move
        this.x = playerXaxis;
        this.y = playerYaxis + 82;
        }
        this.y -= step * .82;
    }
    if (key === 'down'){
        if (this.y > bottomwall){
            return null;
        }
        this.y += step * .82;
    }
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// HELPER Function
var LogPlayerPosition = function() {
    console.log('>>> PLAYER - X: ' + player.x + ' Y: ' + player.y + ' ' + player.wallChecker.leftWall + " " + player.wallChecker.rightWall);
}