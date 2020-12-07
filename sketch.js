var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var BG,ground,BG_image;
var gameOversound,jumpSound,catchSound;
var banana ,bananaImage, obstacle, obstacleImage, gameOver, gameOverImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collided = loadImage("sprite_8.png");
  
  gameOverImage = loadImage("gameOver.gif");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  BG_image = loadImage("background.jpg");
  
  gameOverSound = loadSound("gameover.mp3");
  jumpSound = loadSound("jump.mp3");
  catchSound = loadSound("Catch.mp3");
  
}



function setup() {
  createCanvas(600,400);
  
  BG = createSprite(400,120.600,20);
  BG.addImage(BG_image);
  BG.velocityX = -4;
  BG.scale = 1;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.1;
  
  ground = createSprite(300,350,400,10);
  ground.velocityX = -4;
  
  gameOver = createSprite(300,200,20,20);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  
}


function draw() {
  
  if(gameState === PLAY) {
    
    gameOver.visible = false;
  
      food();
      obstacles();

      ground.visible = false;

        if (BG.x < 0){
          BG.x = BG.width/2;
        }

      ground.x = ground.width/2;

      if(keyDown("space") && monkey.y >= 300) {
        monkey.velocityY = -18;
        jumpSound.play();
      }
      monkey.velocityY = monkey.velocityY + 0.8;
      monkey.collide(ground);

      if(FoodGroup.isTouching(monkey)) {
        FoodGroup.destroyEach();
        catchSound.play();
        score = score + 1;
      }

      if(obstacleGroup.isTouching(monkey)) {
        gameState = END;
        gameOverSound.play();
      }
        FoodGroup.depth = gameOver.depth;
        gameOver.depth = gameOver.depth + 1;
    }
    
  else if(gameState === END) {
        
        gameOver.visible = true;
    
        FoodGroup.depth = gameOver.depth;
        gameOver.depth = gameOver.depth + 1;
    
        monkey.changeAnimation("collided", monkey_collided);
    
        monkey.velocityY = 0;
        BG.velocityX = 0;
    
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
  }
  
  drawSprites();
  
  textSize(20);
  fill("white");
  text("Banana = " + score,20,30);
  
}

function food() {
  if(frameCount % 130 === 0) {
    var banana = createSprite(600,0,20,20);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.velocityX = -4;
    banana.scale = 0.1;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount % 300 === 0) {
    var stone = createSprite(620,315,20,20);
    stone.addImage(obstaceImage);
    stone.velocityX = -4;
    stone.scale = 0.18;
    stone.lifetime = 200;
    
    stone.setCollider("circle",0,0,200);
    
    obstacleGroup.add(stone)
  }
}
