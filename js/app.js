var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x= x;
    this.y= y;
    this.speed = speed; // bugs should move randomly so passing the speed value as well
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //x for moving bugs horizontally
    // if x exceeds the canvas width ie, 505 assigning the value of x =-10 ;bugs start from -10 position
    // distance = speed * time(dt)
    if(this.x > 505){
      this.x = -101;
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
var Player = function(x,y) {
    this.x= x;
    this.y= y;
    this.sprite = 'images/char-boy.png';

};

Player.prototype.update = function() {
   this.checkCollisions();
   this.catchHearts();
   this.heartWin();

  };

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


};
//player movement function
Player.prototype.handleInput = function(keycode_val) {
  var temp_x = 100; // temp_x value :width/ no of columns
  var temp_y = 84; // temp_y value :height/ no of rows (last row height is little bit bigger than the others that's y 84)
  switch (keycode_val) {
     case 'left':
     if(this.x - temp_x > 0){// checking the key movement is inside the boundary or not.
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
//Bug and player collision Function
Player.prototype.checkCollisions = function(){
  // height and width are from the bug and char boy's image
  var enemy_width = 101;
  var enemy_height = 65;
  var player_width = 102;
  var player_height = 75;
  for(var i = 0 ; i < allEnemies.length ; i++){
    var e = allEnemies[i];
    var c = player_width*1/2; // for logical collision
    var ey2 = e.y;
    var ey1 = ey2 + enemy_height;
    var py2 = this.y + c;
    var py1 = py2 + player_height - c;
    var ex1 = e.x;
    var ex2 = ex1 + enemy_width;
    var px1 = this.x + c;
    var px2 = px1 + player_width - c;
    // keeping player's x,y axis and width and height  as a reference
    // checking  bug's y axis and bug image's height comes inbetween player's y axis and player's height and the same for width and x axis
    if( ( ( (ey2 < py1) && (ey2 > py2) ) || ( (ey1 < py1) && (ey1 > py2) ) ) &&
        ( ( ( ex2 > px1)&& (ex2 < px2) ) || ( (ex1 > px1) && (ex1 < px2) ) ) ){
       console.log("error")
       this.x = 210;
       this.y = 470;
       player.resetHearts();
       alert("You have got eaten by a bug! Press Ok to Continue")
     }
   }
 };
//Player collecting Hearts Function
 Player.prototype.catchHearts = function(){
   /*for(var i = 0 ; i < allhearts.length ; i++){
     allhearts[i].catchHearts();
   }*/
   var player_width = 102;
   var player_height = 75;
   var heart_width = 48;
   var heart_height = 50;
   for(var i = 0 ; i < allhearts.length ; i++){
   var h = allhearts[i];
   //  var c = player_width/2; // for logical collision
   var hy2 = h.y;
   var hy1 = hy2 + heart_height;
   var py2 = this.y ;
   var py1 = py2 + player_height ;
   var hx1 = h.x;
   var hx2 = hx1 + heart_width;
   var px1 = this.x ;
   var px2 = px1 + player_width;
   if( ( ( (hy2 < py1) && (hy2 > py2) ) || ( (hy1 < py1) && (hy1 > py2) ) ) &&
       ( ( ( hx2 > px1)&& (hx2 < px2) ) || ( (hx1 > px1) && (hx1 < px2) ) ) ){
         h.x = 400;
         h.y = 65;
       }
     }
 };
 // resting the heart randomly when the bug bites the player
 Player.prototype.resetHearts = function(){
    for(var i = 0 ; i < allhearts.length ; i++){
    var h = allhearts[i];
    h.x = 0;
    h.y = 0;
    var ranx_heart = ((Math.random()*400 + 20));
    var rany_heart = ((Math.random()*170 + 150));
    h.x = ranx_heart;
    h.y = rany_heart;
  }
 };
// If the playyer collected all the hearts
 Player.prototype.heartWin = function(){
    var heartFlag = 1;//Setting my heartFlag as 1
    for(var i = 0 ; i < allhearts.length ; i++){
         heartTrue=((allhearts[i].x == 400) && (allhearts[i].y == 65) );
         heartFlag=heartTrue*heartFlag; // to check all the hearts are in the same position or not
    }
   if (heartFlag==1) {
      console.log("won")
      girl.x = 290;
      girl.y = 400;
      this.x = 210;
      this.y = 470;
      confirm(" You Have won the girl ! Click play to Play again")
      // i get an error before catching the last heart the game says i won continously i have to kill the page to restart the game
      location.reload();
      }
 };

var player = new Player(210,470);

// girl class

var Girl = function(x,y){
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-princess-girl.png';
};

Girl.prototype.update = function(dt){};

Girl.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

var girl = new Girl(400,45);

// heart class(rule book)
var Hearts = function(x,y){
  this.x = x;
  this.y = y;
  this.sprite = 'images/Heart.png';
  this.heart_width = 48;
  this.heart_height = 50;
  var win_flag = 0;
  };

Hearts.prototype.update = function(){};

Hearts.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// function to initialize two dimensional array and assigning the values to 0.
 function array_init_fn(r,c){
  var arr = [];
for(var x = 0; x < r; x++){
    arr[x] = [];
    for(var y = 0; y < c; y++){
        arr[x][y] = 0;
    }
}
return arr;
}

// heart objects
var heart_1 = new Hearts(220,150);
var heart_2 = new Hearts(340,320);
var heart_3 = new Hearts(120,220);
var heart_4 = new Hearts(410,150);
var heart_5 = new Hearts(125,320);

var allhearts = [heart_1,heart_2,heart_3,heart_4,heart_5];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
