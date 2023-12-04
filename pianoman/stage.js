let bg_main;
let bg_npc;
let player;
let npc1_lobby;
let npc1_default;

//스테이지 세기
let stage = 0;

//player 기본 좌표
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
  npc1_lobby = loadImage("images/NPC/손님1 3인칭(기본).png");
  npc1_default = loadImage("images/NPC/손님1기본(픽셀화).png");
  player = loadImage("images/NPC/주인공 3인칭(기본).png");
}

function setup() {
  createCanvas(700,500); // 캔버스 크기 고정
  bg_main.resize(width, height); // 캔버스 크기에 맞게 resize
  bg_npc.resize(width,height); // 캔버스 크기에 맞게 resize
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
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
    if(mouseIsPressed && mouseX > width - 210 && mouseX < width-110 &&
      mouseY > height - 45 && mouseY < height - 15)
      stage = 0; // 로비로 이동
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
  image(bg_main,width/2,height/2); //로비 배경 추가
  image(npc1_lobby,250,200); //npc 위치와 모양 (1. npc.js에 추가해야할 듯)

  if (dist(plX, plY, 200, 200) < 40) { //npc1 일정 반경 옆에 갔을 때
    // npc 이미지 위에 사각형을 둘러 스트로크 표현 (별로 안 예뻐서..ㅎㅎ 테두리 있는 캐릭터 이미지 추가 제작 후 넣어야할듯)
    image(npc1_lobby,250,200);
    noFill();
    stroke(200,200,0);
    strokeWeight(3); 
    rect(200,200,40,40);

  //npc 옆에 갔을 때 글씨로 shift키 누를 것을 안내
    fill(255);
    textSize(8);
    text("shift 눌러 말걸기", plX, plY + 35);

  //쉬프트 누르면 스테이지 1로 이동
    if (keyIsDown(SHIFT)){
      stage = 1;
      }
    }

  //player 그리기 (추후 player image로 바꿔야 함)
    image(player, plX, plY);

  //벽 만들기
  plX = constrain(plX, 125, width);
  plY = constrain(plY, 150, height-50);
  }

function talk_npc(){ //사연공간 세부
  background(0);
  image(bg_npc,width/2,height/2); // 배경 추가
  image(npc1_default,width/2,height/2-20); //npc 모양 추가

  //스크립트 디스플레이 배경
  fill(0,150);
  rect(width/2,height/2+220,width,height/2);
  
  //스크립트 내용
  fill(255);
  textSize(16);
  text("npc 사연 스크립트",width/2,height/2+150);

  //연주하러 가기 버튼
  let button1 = new Button(width-60, height-30, 100, 30);
  let button2 = new Button(width-170, height-30, 100, 30);
  button1.setTitle("연주하러 가기");
  button1.show();
  button2.setTitle("다른 손님 위로하기");
  button2.show();
  }

function rhythm(){ // 리듬게임 공간 세부, 유진님 코드 잘 합쳐야 함
  background(0);
  fill(255);
  text("리듬게임 영역, press shift to continue",width/2,height/2);
}

function success(){ //성공 스크립트 세부
  //스크립트 디스플레이 공간
  background(0);
  image(bg_npc,width/2,height/2);
  fill(0,150);
  rect(width/2,height/2+200,width,height/2);
  
  //스크립트 내용
  fill(255);
  textSize(16);
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
