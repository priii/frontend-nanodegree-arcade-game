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
    this.width = 102;
    this.height = 75;

};

Player.prototype.update = function() {
  if(winFlag==1){
    this.lastUpdate();
  }
   this.checkCollisions();
   this.catchHearts();
   this.reachGirl(girl);
   this.checkWin();
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

var collisionFlag=0;
//Bug and player collision Function
Player.prototype.checkCollisions = function(){
  // height and width are from the bug and char boy's image
  var enemy_width = 101;
  var enemy_height = 65;
  var player_width = 102;
  var player_height = 75;
  var playerCenter = [this.x+this.width/2,this.y+this.height/2];
  for(var i = 0 ; i < allEnemies.length ; i++){
    var e = allEnemies[i];
    var enemyCenter = [e.x+enemy_width/2,e.y+enemy_height/2];
    intersectCondition = Math.max(Math.abs(playerCenter[0]-enemyCenter[0]),Math.abs(playerCenter[1]-enemyCenter[1]))<30;
    // keeping player's x,y axis and width and height  as a reference
    // checking  bug's y axis and bug image's height comes inbetween player's y axis and player's height and the same for width and x axis
    if(intersectCondition){
      this.x = 210;
      this.y = 470;
      player.resetHearts();
      alert("You have got eaten by a bug! Press Ok to Continue")
     }
   }
 };

//Player collecting Hearts Function
 Player.prototype.catchHearts = function(){
   var playerCenter = [this.x+this.width/2,this.y+this.height/2];
   for(var i = 0 ; i < allhearts.length ; i++){
   var h = allhearts[i];
   var heartCenter = [h.x+h.heart_width/2,h.y+h.heart_height/2];
   intersectCondition = Math.max(Math.abs(playerCenter[0]-heartCenter[0]),Math.abs(playerCenter[1]-heartCenter[1]))<50;
   if(intersectCondition){
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
   return heartFlag;
};

// if player reaches girl
var reachGirlFlag=0;
 Player.prototype.reachGirl = function(girl){
   var playerCenter = [this.x+this.width/2,this.y+this.height/2];
   var girlCenter = [girl.x+girl.width/2,girl.y+girl.height/2];
   intersectCondition = Math.max(Math.abs(playerCenter[0]-girlCenter[0]),Math.abs(playerCenter[1]-girlCenter[1]))<30;
   if(intersectCondition){
     reachGirlFlag=1;
   }
 }

var winFlag=0;
Player.prototype.checkWin = function(){
  heartFlag=this.heartWin();
  if ( (heartFlag==1) && (reachGirlFlag==1) ) {
     winFlag=1;

     }
}

Player.prototype.lastUpdate = function(){
  /*girl.x = 290;
  girl.y = 400;
  this.x = 210;
  this.y = 470;*/

  // i get an error before catching the last heart the game says i won continously i have to kill the page to restart the game
  location.reload();
  confirm(" Congratulations ! You helped the lonely boy to find his love .! Click play to Play again")
}

var player = new Player(210,470);

// girl class

var Girl = function(x,y){
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-princess-girl.png';
  this.height=92;
  this.width=82;
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
