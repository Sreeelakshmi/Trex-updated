var trex,ground,clod,Obst,score,gamestate,cloud1,select,obstacle1,restart,gameover
var c,go,g,o1,o2,o3,o4,o5,o6,r,trexrunning,trexcolliding;
function preload(){
  c=loadImage("cloud.png");
  go=loadImage("gameOver.png");
  g=loadImage("ground2.png");
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png");
  o3=loadImage("obstacle3.png");
  o4=loadImage("obstacle4.png");
  o5=loadImage("obstacle5.png");
  o6=loadImage("obstacle6.png");
  r=loadImage("restart.png");
  trexrunning=loadAnimation("trex1.png","trex3.png","trex4.png");
  trexcolliding=loadAnimation("trex_collided.png");
}
function setup(){
  createCanvas(windowWidth,windowHeight);
  
trex = createSprite(width/2-200, 350,10,10);
trex.addAnimation("trex",trexrunning);
trex.addAnimation("colliding",trexcolliding);
trex.scale=0.5;
 ground = createSprite(width, 380);
ground.addImage(g);
ground.velocityX=-5;

 restart = createSprite(width/2, height/2);
 gameover = createSprite(width/2, height/2-50);
restart.addImage(r);
gameover.addImage(go);
restart.visible=false;
gameover.visible=false;
//trex.debug=true;
trex.setCollider("circle",0,0,25);
//var invground = createSprite(200, 390,400,10);
//invground.visible=false;
 score=0;

 clod = createGroup();
 Obst = createGroup();




 gamestate="play";
}
function draw() {
  background("white");
  if(gamestate=="play"){
  if (touches.lenght>0||keyDown("space")&&trex.y>340) {
    trex.velocityY=-15;
   // playSound("sound://category_instrumental/chime.mp3");
    
  touches=[]}
 score=score+Math.round(frameRate()/60);
  trex.velocityY=trex.velocityY+0.6;
 
  console.log("hello"+7);
 ground.velocityX=-(5+score/100);
  if (ground.x<0) {
    ground.x=ground.width/2;
  }
  obstacles();
  clouds();
  if(score%100==0&&score>0) {
 // playSound("sound://category_achievements/peaceful_win_3.mp3"); 
    
  }
  
  if (trex.isTouching(Obst)) {
   gamestate="end";
  gameover.visible=true;
  restart.visible=true;
    trex.changeAnimation("colliding",trexcolliding);
 // playSound("sound://category_instrumental/harpe_music_2.mp3" );
  
  }
  }
  if(gamestate=="end"){ ground.velocityX=0;
    Obst.setVelocityXEach(0);
    clod.setVelocityXEach(0);
    Obst.setLifetimeEach(-1);
    clod.setLifetimeEach(-1);
   Obst.destroyEach();
   clod.destroyEach();
    if (touches.lenght>0||mousePressedOver(restart)) {
 // gamestate="play";
  restart.visible=false;
gameover.visible=false;
trex.changeAnimation("trex",trexrunning);
      gamestate="play";
   touches=[]
      score=0;  
    }
  
    }
  trex.collide(ground);
  drawSprites();
textSize(20);
text("score"+score, 50, 20);


  

}
function clouds(){
  if (frameCount%80==0) {
    
  
  
   cloud1 = createSprite(width/2+200,random(60,200));
  cloud1.addImage(c);
  cloud1.velocityX=-(2+score/100);
   cloud1.lifetime=500;
   clod.add(cloud1);
  }
  
  }
  function obstacles(){
  if (frameCount%200==0) {
    
 select=Math.round(random(1,6));
  
   obstacle1 = createSprite(width/2+200,360);
  switch(select){
    case 1:
    obstacle1.addImage(o1);
  break;
  case 2:
    obstacle1.addImage(o2);
  break;
  case 3:
    obstacle1.addImage(o3);
  break;
  case 4:
    obstacle1.addImage(o4);
  break;
  case 5:
    obstacle1.addImage(o5);
  break;
  case 6:
    obstacle1.addImage(o6);
  break;
  default:break;}
      obstacle1.velocityX=-(2+score/100);
   obstacle1.scale=0.5;
   obstacle1.lifetime=500;
   Obst.add(obstacle1);
  }
  
  }