// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x= x;
    this.y= y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //x for moving bugs horizontally
    // if x exceeds the canvas width ie, 505 assigning the value of x =0 ;bugs start from 0 position
    // distance = speed * time(dt)
    if(this.x > 505){
      this.x = -10;
      var bug_speed = ((Math.random()*100 + 50)); //after exceeding the canvas setting a diff speed for the bug.
      this.x = this.x + bug_speed *dt;
    }
    else{
    var bug_speed = ((Math.random()*400 + this.speed));// creating random speed using Math.random method
    this.x = this.x + bug_speed *dt;
}


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
//passing speed aswell so that each bug move at different speed
var enemy_1 = new Enemy(20,60,50);
var enemy_2 = new Enemy(100, 225,300);
var enemy_3 = new Enemy(80,140,150);
var allEnemies = [enemy_1, enemy_2, enemy_3];


//Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function(x,y) {
    this.x= x;
    this.y= y;
    this.sprite = 'images/char-boy.png';
};

player.prototype.update = function() {
    this.x = 200;
    this.y = 400;

  };

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

player.prototype.handleInput = function (e) {
  switch (e) {
     case 37:
     this.x = this.x - 10 ;
     break;
    case 38:
    this.y = this.y - 10  ;
    break;
    case 39:
    this.x = this.x + 10;
    break;
    case 40:
    this.y = this.y + 10 ;
  }
};

var player = new player();






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
