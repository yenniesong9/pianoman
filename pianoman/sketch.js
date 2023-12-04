//images 폴더 안에 bg_image.jpg 파일을 수정하면 자동으로 그 크기에 맞는 캔버스가 생성됩니다. 
let bg_main;
let bg_npc;
let bg_w, bg_h;

let mode = 0; //0:로비, 1:NPC 플레이 중


let NPC_count = 2; //TODO: 향후 수정 필요
let NPCs = []; //NPC 객체들을 담을 배열
let NPC_completed, NPC_tried = [0, 0, 0, 0]; //성공하면 1로 바뀌는 배열
let success_count = 0;

//lobby에 표시하는 용
let NPC_pngs = []; //npc 이미지 저장
let NPC_position = [[310, 330], [585, 350], [0, 0], [0, 0]]; //npc 위치 저장
let NPC_w = 100; //화면에 표시하는 크기
let NPC_h = 130;

let button = 0;
let game;
let song0;

//player
let plX = 100;
let plY = 375;
let plSpeed = 3;

let isUpKeyPressed = false;
let isDownKeyPressed = false;
let isLeftKeyPressed = false;
let isRightKeyPressed = false;

function preload() {
  //이미지 불러오기
  bg_main = loadImage("images/background/bg_main.png");
  bg_npc = loadImage("images/background/bg_npc.jpg");

  for (let i = 0; i < NPC_count; i++) {
    let title = 'images/NPC/손님' + (i+1) + ' 3인칭(기본).png'
    let photo = loadImage(title);
    NPC_pngs[i] = photo;
  }

  //음악 불러오기
  song0 = loadSound('audio/birthday.mp3');
}

function setup() {
  //bg_image 크기에 맞는 캔버스 생성
  bg_w = bg_main.width;
  bg_h = bg_main.height;
  createCanvas(bg_w, bg_h);

  //mode 초기화
  rectMode(CENTER);
  textAlign(CENTER);

  //game 미리 생성
  game = new Game(0, song0);

}

function draw() {
  //background(220);
  //image(bg_image, 0, 0);
  lobby();
  if (button) { //게임 실행
    game.display();
  }
  if (button) {
    fill(255);
  } else {
    fill(0);
  }
  rect(10, 10, 50, 50);
}

function lobby() {
  image(bg_main,0,0);

  //npc 위치와 모양 (1. npc.js에 추가해야할 듯 / 2. rect를 각 npc이미지로 대체 필요)
  fill(200);
  rect(200,200,30,30);

  drawNPCs();

  //player 위치 조정
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


  let selectableNPC = nearNPCs();
  if (selectableNPC != -1) { //npc 근처에 있다면
    //TODO: 스트로크 표시
    //지금은 rect로 대용
  }

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


function drawNPCs() {
  for (let i = 0; i < NPC_count; i++) {
    let img = NPC_pngs[i];
    img.resize(NPC_w, NPC_h);
    image(img, NPC_position[i][0], NPC_position[i][1]);
  }
}

function nearNPCs() {
  for (let i = 0; i < NPC_count; i++) {
    if (dist(plX, plY, NPC_position[i][0]+(NPC_w/2), NPC_position[i][1]+(NPC_h/2)) < 50) {
      return i;
    }
  }
  return -1;
}





function mouseClicked() {
  if (mouseX > 10 && mouseX < 60 && mouseY > 10 && mouseY < 60) {
    button = !button;
    if (button == 0) {
      game.resetButtonClicked();
      game = new Game(0, song0);
    }
  }
}


function keyPressed() {
  //게임
  if (keyCode == 65) { //A
    game.buttonPressed(0);
  } else if (keyCode == 83) { //S
    game.buttonPressed(1);
  } else if (keyCode == 68) { //D
    game.buttonPressed(2);
  } else if (keyCode == 70) { //F
    game.buttonPressed(3);
  }

  //이동
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
  //게임
  if (keyCode == 65) { //A
    game.buttonReleased(0);
  } else if (keyCode == 83) { //S
    game.buttonReleased(1);
  } else if (keyCode == 68) { //D
    game.buttonReleased(2);
  } else if (keyCode == 70) { //F
    game.buttonReleased(3);
  }

  //이동
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
