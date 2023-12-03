let bg_main;
let bg_npc;

//스테이지 세기
let stage = 0;

//player
let plX = 100;
let plY = 375;
let plSpeed = 3;

let isUpKeyPressed = false;
let isDownKeyPressed = false;
let isLeftKeyPressed = false;
let isRightKeyPressed = false;

function preload() {
  bg_main = loadImage("images/background/bg_main.png");
  bg_npc = loadImage("images/background/bg_npc.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bg_main.resize(width, height); // 캔버스 크기에 맞게 resize
  bg_npc.resize(width,height); // 캔버스 크기에 맞게 resize
  //image(bg_main, 0, 0);
  //background(0);
  rectMode(CENTER);
  textAlign(CENTER);
}

function draw() {
    //player 좌표 이동
    if (isUpKeyPressed) {
      plY -= plSpeed;
    }
    if (isDownKeyPressed) {
      plY += plSpeed;
    }
    if (isLeftKeyPressed) {
      plX -= plSpeed;
    }
    if (isRightKeyPressed) {
      plX += plSpeed;
    }

    //스테이지 이동
  if (stage == 0) {
    lobby();
  } else if (stage == 1){
    talk_npc();
    if(mouseIsPressed && mouseX > width - 110 && mouseX < width-10 &&
      mouseY > height - 45 && mouseY < height - 15){
      stage = 2; // 스테이지 2으로 이동
      }
  } else if (stage == 2){
    rhythm();
    if (keyIsDown(SHIFT)) {
      stage = 3; //스테이지 3로 이동
    }
  } else if (stage == 3){
    //성공 스크립트와 실패 스크립트 각각 구현해야 함
    success();  //일단 지금은.. 성공스크립트
    if (keyIsDown(ENTER)) {
      stage = 0; // 스테이지0(로비)로 다시 이동
    }
  }
}

function lobby() {
  background(0);
  image(bg_main,0,0);

  //npc 위치와 모양 (1. npc.js에 추가해야할 듯 / 2. rect를 각 npc이미지로 대체 필요)
  fill(200);
  rect(200,200,30,30);

  if (dist(plX, plY, 200, 200) < 40) { //npc 일정 반경 옆에 갔을 때
    stroke(200,200,0);
    strokeWeight(3); // npc 모양에 스트로크
    rect(200,200,30,30); //각 npc이미지로 대체 필요

  //npc 옆 글씨로 키 누를 것을 안내
    noStroke();
    fill(255);
    textSize(10);
    text("press shift", plX, plY + 20);

  //쉬프트 누르면 스테이지 1로 이동
    if (keyIsDown(SHIFT)){
      stage = 1;
      }
    }

  //player 그리기 (추후 player image로 바꿔야 함)
  noStroke();
  fill(150, 0, 170);
  rect(plX, plY, width/30, width/30);

  //벽 만들기
  plX = constrain(plX, 125, width);
  plY = constrain(plY, 150, height);
  }

function talk_npc(){ //사연공간 세부
  background(0);
  image(bg_npc,0,0);
  fill(0,100);
  rect(width/2,height/2+200,width,height/2);

  //스크립트 디스플레이 공간
  fill(255);
  textSize(20);
  text("npc 사연 스크립트",width/2,height/2+150);

  //연주하러 가기 버튼
  let button1 = new Button(width-60, height-30, 100, 30);
  button1.setTitle("연주하러 가기");
  button1.show();
  }

function rhythm(){ // 리듬게임 공간 세부, 유진님 코드 잘 합쳐야 함
  background(0);
  fill(255);
  text("리듬게임 영역, press shift to continue",width/2,height/2);
}

function success(){ //성공 스크립트 세부
  //스크립트 디스플레이 공간
  background(0);
  image(bg_npc,0,0);
  fill(0,100);
  rect(width/2,height/2+200,width,height/2);
  
  //스크립트 내용
  fill(255);
  textSize(20);
  text("성공 스크립트, press enter to go back to lobby",width/2,height/2+150);
}

//player 방향키에 따른 이동
function keyPressed() {
  if (keyCode === UP_ARROW) {
    isUpKeyPressed = true;
  } else if (keyCode === DOWN_ARROW) {
    isDownKeyPressed = true;
  } else if (keyCode === LEFT_ARROW) {
    isLeftKeyPressed = true;
  } else if (keyCode === RIGHT_ARROW) {
    isRightKeyPressed = true;
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    isUpKeyPressed = false;
  } else if (keyCode === DOWN_ARROW) {
    isDownKeyPressed = false;
  } else if (keyCode === LEFT_ARROW) {
    isLeftKeyPressed = false;
  } else if (keyCode === RIGHT_ARROW) {
    isRightKeyPressed = false;
  }
}

//stage에서 쓰일 버튼 (js파일로 따로 빼도 됨)
class Button {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.title = "untitle";
    }
    over() {
      rectMode(CENTER)
      if (this.x - this.w/2 < mouseX && mouseX < this.x +this.w/2 
      && this.y - this.h/2< mouseY && mouseY < this.y + this.h/2) {
        return true;
      } else {
        return false;
      }
    }
    show() {
      if (this.over()) fill(255, 0, 0);
      else fill(255, 200, 200);
      rect(this.x, this.y, this.w, this.h);
      textAlign(CENTER, CENTER);
      fill(20);
      textSize(16);
      text(this.title, this.x, this.y);
    }
    setTitle(title) {
      this.title = title;
    }
  }
