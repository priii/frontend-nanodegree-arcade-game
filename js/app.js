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
var enemy_1 = new Enemy(20,140,50);
var enemy_2 = new Enemy(100, 300,150);
var enemy_3 = new Enemy(80,220,100);
var allEnemies = [enemy_1,enemy_2,enemy_3];


//Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function(x,y) {
    this.x= x;
    this.y= y;
    this.sprite = 'images/char-boy.png';
};

player.prototype.update = function() {
   player.checkCollisions();
  };

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
player.prototype.handleInput = function(keycode_val) {
  var temp_x = 100; // temp_x value :width/ no of columns
  var temp_y = 84; // temp_y value :height/ no of rows
  switch (keycode_val) {
     case 'left':
     if(this.x - temp_x > 0){
     this.x = this.x - temp_x ;
   }
    break;
    case 'up':
    if (this.y - temp_y > 0){
    this.y = this.y - temp_y;
  }

    break;
    case 'right':
    if(this.x + temp_x < 500){
    this.x = this.x + temp_x;
  }
    break;
    case 'down':
    if(this.y + temp_y < 550){
    this.y = this.y + temp_y ;
  }

  }
};

player.prototype.checkCollisions = function(){
  var enemy_width = 101;
  var enemy_height = 65;
  var player_width = 102;
  var player_height = 75;

  for(var i = 0 ; i < allEnemies.length ; i++){
  //for(var i = 0 ; i < 1 ; i++){
    var e = allEnemies[i];
    var ey2 = e.y;
    var ey1 = ey2 + enemy_height;
    var py2 = player.y;
    var py1 = py2 + player_height;
    var ex1 = e.x;
    var ex2 = ex1 + enemy_width;
    var px1 = player.x;
    var px2 = px1 + player_width;
    // keeping player's x,y axis and width and height  as a reference
    // checking  bug's y axis and bug image's height comes inbetween player's y axis and player's height and the same for width and x axis
    if( ( ( (ey2 < py1) && (ey2 > py2) ) || ( (ey1 < py1) && (ey1 > py2) ) ) &&
        ( ( ( ex2 > px1)&& (ex2 < px2) ) || ( (ex1 > px1) && (ex1 < px2) ) ) ){
       console.log("error")
       alert("oop")
       player.x = 210;
       player.y = 470;
     }
   }
 };


var player = new player(210,470);







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
