//Global Variables
var monkey, bananaGroup, obstaclesGroup, ground, backGround, score, restart, gameOver;
var monkeyImage, bgImage, obstacleImage, foodImage, rsImage, goImage;
var gameState, END, PLAY, count;

function preload() {
  //settting monkey animation
  monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  //setting background Image
  bgImage = loadImage("jungle.jpg");

  //setting obstacle Image
  obstacleImage = loadImage("stone.png");

  //setting food image
  foodImage = loadImage("Banana.png");

  //setting ground image
  groundImage = loadImage("ground.jpg");

  //setting game over Image
  goImage = loadImage("gameOver.png");

  //setting restart image
  rsImage = loadImage("restart.png");
}


function setup() {
 // createCanvas(600, 300);

  //create monkey sprite, set its animation and scaling it down 
  monkey = createSprite(80, 295, 10, 10);
  monkey.addAnimation("monkeyI", monkeyImage);
  monkey.scale = 0.15;

  //create background sprite, set its animation and scaling it down
  backGround = createSprite(300, 150, 900, 10);
  backGround.addImage("jungle", bgImage);
  backGround.scale = 0.915;
  backGround.x = backGround.width / 2;
  //placing the background behind the monkey and giving it a velocity
  backGround.depth = monkey.depth - 1;
  

  //creating the ground sprite, seting the velocity, making it invisible
  ground = createSprite(300, 299, 600, 10);
 
  ground.visible = false;

  //create game over sprite, add image, make it invisible
  gameOver = createSprite(300, 120, 10, 10);
  gameOver.addImage("gameover", goImage);
  gameOver.visible = false;

  //create restart sprite, add image, make it invisible and scale it down
  //restart = createSprite(300, 170, 10, 10);
  //restart.addImage("restartimage", rsImage);
 // restart.scale = 0.5;
  //restart.visible = false;

  //create banana group
  bananaGroup = createGroup();
  //create obstacles group
  obstaclesGroup = createGroup();
  //create score variable
  score = 0;

  //create variables for game state
  END = 1;
  PLAY = 2;

  //create a variable for conuting the number of times the monkey touches the obstacles
  count = 0;

  //setting the play game state
  gameState = PLAY;
}


function draw() {

  createCanvas(500,300);
  background("jungle.jpg");

  //creating infinite invisible ground
  ground.velocityX = -10;
  if(ground.x<0){
  ground.x = ground.width / 2;
  }
  //creating infinite background  
  backGround.velocityX = -10;
  if(backGround.x<0){
  backGround.x = backGround.width / 2;
  }
  //collinding the monkey against the ground 
  monkey.collide(ground);
  //setting the gravity for the monkey 
  monkey.velocityY = monkey.velocityY + 0.5;

  //setting condition for gamestate play
  if (gameState === PLAY) {
    if (keyDown("space") && monkey.y > 220) {
      monkey.velocityY = -10;
    }
    //spawning food
    food();

    //spawning obstacles
    obstacles();

    //increasing score when the monkey touches the banana
    if (bananaGroup.isTouching(monkey)) {
      score = score + 2;
      bananaGroup.destroyEach();
    }

    //increasing the monkey size after every 10 points
    switch (score) {

      case 10:
        monkey.scale = 0.16;
        break;
      case 20:
        monkey.scale = 0.17;
        break;
      case 30:
        monkey.scale = 0.18;
        break;
      case 40:
        monkey.scale = 0.19;
        break;
      case 50:
        monkey.scale = 0.2;
        break;
      default:
        break;
    }
  }

  //increasing count when monkey touches obstacles
  if (obstaclesGroup.isTouching(monkey)) {
    count = count + 1;
    obstaclesGroup.destroyEach();
  }
  
  //if the monkey touches the obstacles more than once, ending the game
  if (count > 1) {
    gameState = END;
  }
  console.log(camera.position.x);
  console.log(camera.position.y);
  //condition for end state
  if (gameState === END) {
    //making the restart sprite visible
    restart.visible = true;
    //making the gameOver sprite visible
    gameOver.visible = true;
    //destroying the bananas
    bananaGroup.destroyEach();
    //destroy obstacles
    obstaclesGroup.destroyEach();
    //bringing score back to zero
    score = 0;
    //bringing count back to zero
    count = 0;
  }
  //condition to restart
  if (gameState === END && mousePressedOver(restart)) {
    //changing game state to play
    gameState = PLAY;
    //making the restart and gameover sprites invisible again 
    restart.visible = false;
    gameOver.visible = false;
  }

  //camera.position.x = monkey.x;
  //camera.position.y = monkey.y;

  //camera.position.x = camera.position.x+5;
  drawSprites();

  //Displaying the score 
  stroke("black");
  textSize(30);
  fill("black");
  text("Score:" + score, 360, 60);
}

function food() {
  //spawning the bananas after every 80 frames  
  if (World.frameCount % 80 === 0) {
    //creating the banana sprite and  randomizing the spawn point
    banana = createSprite(600, random(100, 140), 10, 10);
    //spawning bananas using camera position
    camera.position.x = banana.x;
    camera.position.y = banana.y;
    //setting animation for the 
    banana.addImage("FOOD", foodImage);
    //scaling down the banana  
    banana.scale = 0.05;
    //setting the velocity for the banana
    banana.velocityX = -5;
    //setting banana's lifetime
    banana.lifetime = 150;
    //adding the bananas to the banana group
    bananaGroup.add(banana);

  }
}

function obstacles() {
  //Spawing the obstacles after every 300 frames 
  if (World.frameCount % 300 === 0) {
    //creating the obstacle sprite     
    obstacle = createSprite(600, 275, 10, 10);
    //spawning obstacles using camera position
    camera.position.x = obstacle.x;
    camera.position.y = obstacle.y;
    //setting the animation for the obstacles    
    obstacle.addImage("STONE", obstacleImage);
    //Scaling down the obstacles 
    obstacle.scale = 0.15;
    //setting the velocity for the obstacles
    obstacle.velocityX = -6;
    //setting the lifetime for the obstacles
    obstacle.lifetime = 150;
    //adding the obstacles to the obstacles group
    obstaclesGroup.add(obstacle);
    //putting the obstacle behind the monkey  
    obstacle.depth = monkey.depth - 1;
  }
}