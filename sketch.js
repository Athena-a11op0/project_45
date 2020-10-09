
var player, playerImg;
var backdrop;
var obstaclesGroup;
var score = 0;
var gameState;
var bird, birdImg;
var birdGroup;
var cannon, cannonImg;
var cannonGroup;

function preload()
{
  playerImg = loadImage("helicopter.png");
  birdImg = loadImage("bird.png");
  cannonImg = loadImage("gun.png");
}

function setup() {
	createCanvas(1000, 700);

	//Create the Bodies Here.

	player = createSprite(200, 200, 10, 10);
	player.addImage(playerImg);
  player.scale = 0.5; 

  obstaclesGroup = new Group();
  birdGroup = new Group();
  cannonGroup = new Group();

	//player.debug = true;
	player.setCollider("rectangle", 5, 10, 370, 140);

  gameState = 0;
}


function draw() {
  rectMode(CENTER);
  background(1);
  
   if(gameState === 0){
   
   textSize(20);  
   var text1 = text("COPTER GAME", 400, 300);
   var text2 = text("PRESS SPACEBAR TO START", 400, 340);
   var text3 = text("CONTROLS: UP AND DOWN ARROW TO MOVE", 400, 380);
   //var text4 = text(" DOWN ARROW TO MOVE DOWN", 515, 420);

  }
  
   
  if(keyCode === 32){
	   gameState = 1
   }

  
   if(gameState === 1){

    score = score + Math.round(getFrameRate()/60);
    textSize(20);
    text("Score: "+score, 880, 300);
   //var hide = createSprite(615, 352, 435, 140);
   //hide.shapeColor = "black";

   player.velocityY = player.velocityY + 0.9;

   if(keyCode === 38){
     player.velocityY = -8;
  }

  if(keyCode === 40){
     player.velocityY = 8;
  }

  spawnObstaclesUp();
  spawnObstaclesDown();
  bird();
  //spawnGunUp();
  

  if(obstaclesGroup.isTouching(player) || player.y > 700 || birdGroup.isTouching(player)){
	  gameState = 2
  }

  
  
  //player.collide(bottomEdge);
 }
 
 if(gameState === 2){
  player.velocityY = 0;

  obstaclesGroup.setVelocityXEach(0);
  birdGroup.setVelocityXEach(0);

  textSize(20);
  var text5 = text("GAME OVER", 400, 340);
  var text6 = text("PRESS SPACE TO RESTART", 400, 380);

  score = 0;

  reset();

}

  createEdgeSprites();
  drawSprites();
 
}

function spawnObstaclesUp(){
	if(frameCount % 40 === 0){
	
    let c = color('rgb(57,129,29)')
    
    var obstacle1 = createSprite(1000, 690, displayWidth, random(200, 500));
		obstacle1.shapeColor = c;
		
		obstacle1.velocityX = -(6+3*score/100);
	

    obstaclesGroup.add(obstacle1);
		
	}
}

function spawnObstaclesDown(){
	if(frameCount % 40 === 0){
    let c = color('rgb(57,129,29)')
    
    var obstacle3 = createSprite(1000, 10, displayWidth, random(200, 500));
		
		obstacle3.shapeColor = c;
		
		obstacle3.velocityX = -(6+3*score/100);
		

    obstaclesGroup.add(obstacle3);
   
	}
}

function reset(){
  if(keyCode === 32 && gameState === 2){
    
    player.x = 200;
    player.y = 200;

    obstaclesGroup.destroyEach();
    birdGroup.destroyEach();
    //cannonGroup.destroyEach();

    gameState === 1
    
  }
  
}

function bird(){
  if(frameCount % 200 === 0){
    var bird = createSprite(1000, random(300, 500), 10, 10);
    bird.addImage(birdImg);
    bird.scale = 1.5;
    //bird.debug = true;
    bird.setCollider("rectangle", 0, 0, 20, 20);

    bird.velocityX = -(6+3*score/100);

    birdGroup.add(bird);
  }
}

function spawnGunUp(){
  if(frameCount % 100 === 0){
    var gun = createSprite(obstacle1.x, obstacle1.y, 10, 10);
    gun.addImage(cannonImg);
    gun.scale = 0.5;

    gun.velocityX = -(6+3*score/100);

    cannonGroup.add(gun);

  }
}