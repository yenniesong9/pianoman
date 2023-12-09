//images 폴더 안에 bg_image.jpg 파일을 수정하면 자동으로 그 크기에 맞는 캔버스가 생성됩니다. 
let bg_main;
let bg_npc;
let bg_w, bg_h;
let key_up, key_down, key_left, key_right;
let pixelFont;

///스테이지 구분
let stage = 0; //0:로비, 1:NPC 플레이 중, 2:게임 중, 3:성공, 4:실패

///NPC 관련 변수
let NPC_count = 4; //TODO: 향후 수정 필요
let NPCs = []; //NPC 객체들을 담을 배열
let NPC_completed, NPC_tried = [0, 0, 0, 0]; //성공하면 1로 바뀌는 배열
let success_count = 0;

let playingNPC;

//lobby에 표시하는 용
let NPC_pngs = []; //npc 이미지 저장
let NPC_position = [[260, 330], [640, 250], [780, 470], [180,650]]; //npc 위치 저장
let NPC_w = 100; //화면에 표시하는 크기
let NPC_h = 130;

let games = [];
let playingGame;
let song0;
let button = 0;

//player
let plX = 525;
let plY = 860;
let plSpeed = 3;
let playerPng;

let isUpKeyPressed = false;
let isDownKeyPressed = false;
let isLeftKeyPressed = false;
let isRightKeyPressed = false;

function preload() {
  //이미지 불러오기
  bg_main = loadImage("images/background/bg_main.png");
  bg_npc = loadImage("images/background/bg_npc.jpg");
  pixelFont = loadFont("font/DungGeunMo.ttf");

  key_default = loadImage('images/background/방향키.png');
  key_up = loadImage("images/background/방향키(상).png");
  key_down = loadImage("images/background/방향키(하).png");
  key_left = loadImage("images/background/방향키(좌).png");
  key_right = loadImage("images/background/방향키(우).png");
  key_shift = loadImage("images/background/shift키.png");

  table = loadImage('images/background/오브젝트2(테이블).png');
  tabletop = loadImage('images/background/오브젝트2-1(테이블윗부분).png');
  smallplant = loadImage('images/background/오브젝트3(미니식물).png');
  bigplant = loadImage('images/background/오브젝트4(빅식물).png');
  bigplanttop = loadImage('images/background/오브젝트4-1(빅식물).png');
  piano = loadImage('images/background/오브젝트5(피아노).png');
  pianobottom = loadImage('images/background/오브젝트5-1(의자).png');
  minitable = loadImage('images/background/오브젝트6(미니테이블).png');
  shelf = loadImage('images/background/오브젝트7-1(선반윗부분).png');

  imageScript = loadImage('images/button/대화창높음.png');
  buttonDefault = loadImage('images/button/대화창버튼기본.png');
  buttonClick = loadImage('images/button/대화창버튼눌림.png')
  
  for (let i = 0; i < NPC_count; i++) {
    console.log(i);
    let title = 'images/NPC/손님' + (i+1) + ' 3인칭(기본).png'
    let pixel = loadImage(title);
    NPC_pngs[i] = pixel;
    let basic = loadImage('images/NPC/손님' + (i+1) + '기본(픽셀화).png');
    let success = loadImage('images/NPC/손님' + (i+1) + '성공(픽셀화).png');
    let npc = new NPC(i, basic, success);
    NPCs[i] = npc;
    console.log(NPCs[i]);
  }

  playerPng = loadImage('images/NPC/주인공 3인칭(기본).png');

  //음악 불러오기
  song0 = loadSound('audio/hbdhard2.mp3');
  song1 = loadSound('audio/stnc.mp3');
  song2 = loadSound('audio/memories1.mp3');
  song3 = loadSound('audio/jinglebell.mp3');
}

function setup() {
  //bg_image 크기에 맞는 캔버스 생성
  bg_w = bg_main.width;
  bg_h = bg_main.height;
  createCanvas(bg_w, bg_h);

  //mode 초기화
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont(pixelFont);
  //game 미리 생성 (임시)
  games[0] = new Game(0, song0);
  games[1] = new Game(1, song1);
  games[2] = new Game(2, song2);
  games[3] = new Game(3, song3);
}

function draw() {
  //console.log(playingNPC);
  if (stage == 0) { 
    lobby();
  } else if (stage == 1){
    talk_npc();
  } else if (stage == 2){
    rhythm();
  } else if (stage == 3){ //성공 스크립트 진행
    success();
  } else if (stage == 4) { //실패 스크립트 진행
    fail();
  }
}

function lobby() {
  image(bg_main,0,0);
  key_default.resize(250,250);
  image(key_default,760,800);

  //player 위치 조정 & 방향키 누름 표시
  if (isUpKeyPressed) {
    plY -= plSpeed;
    key_up.resize(250,250);
    image(key_up,760,800);
  }
  if (isDownKeyPressed) {
    plY += plSpeed;
    key_down.resize(250,250);
    image(key_down,760,800);
  }
  if (isLeftKeyPressed) {
    plX -= plSpeed;
    key_left.resize(250,250);
    image(key_left,760,800);
  }
  if (isRightKeyPressed) {
    plX += plSpeed;
    key_right.resize(250,250);
    image(key_right,760,800);
  }

  //-------------------------위치 제한-----------------------//
  //벽
  plX = constrain(plX, 150, width-200);
  plY = constrain(plY, 60, height-150);

  if(plX < 700 && plX > 400 && plY < 150 && plY > 100){
    isDownKeyPressed = false;
  }
  
  //미니테이블
  image(minitable,180,290);
  if (
    plX < 180 + minitable.width/2 && plX > 180 - 20 &&
    plY < 290 - 20 + minitable.height - NPC_h && plY > 290 - NPC_h/2
    ) {
      isRightKeyPressed = false; // 부딪히면 방향키 비활성화
      isDownKeyPressed = false;
      isUpKeyPressed = false;
    } else if (
    plX < 180 + minitable.width - NPC_w && plX >= 180 + minitable.width/2 &&
    plY < 290 + minitable.height - NPC_h - 20 && plY > 290 - NPC_h/2
    ) {
      isLeftKeyPressed = false; // 부딪히면 방향키 비활성화
      isDownKeyPressed = false;
      isUpKeyPressed = false;
    }

  //큰테이블
  image(table,410,365);
  if (
    plX < 410 + table.width/2 && plX > 410 - NPC_w/2 &&
    plY < 365 + table.height - NPC_h + 10 && plY > 365 - 100
    ) {
      isRightKeyPressed = false; // 부딪히면 방향키 비활성화
      isDownKeyPressed = false;
    } else if (
    plX < 410 + 20 + table.width - NPC_w/2 && plX >= 410 + table.width/2 &&
    plY < 365 + table.height - NPC_h + 10 && plY > 365 - 100
    ) {
      isLeftKeyPressed = false; // 부딪히면 방향키 비활성화
      isDownKeyPressed = false;
    }

  //피아노
  pianobottom.resize(300-20, 290-5)
  image(pianobottom,320,475);
  if (
    plX < 320 + pianobottom.width/2 && plX > 320 - 10 - NPC_w/2 &&
    plY < 475 + pianobottom.height - NPC_h + 10 && plY > 475 - NPC_h/2
    ) {
      isRightKeyPressed = false; // 부딪히면 방향키 비활성화
      isUpKeyPressed = false;
      //isDownKeyPressed = false;
      //plY = 475 - NPC_h/2; // 부딪히면 좌표 재지정
    } else if (
    plX < 320 + 10 + pianobottom.width - NPC_w/2 && plX >= 320 + pianobottom.width/2 &&
    plY < 475 + pianobottom.height - NPC_h + 10 && plY > 475 - NPC_h/2
    ) {
      isLeftKeyPressed = false; // 부딪히면 방향키 비활성화
      isUpKeyPressed = false;
      //isDownKeyPressed = false;
      //plX = 320 + 10 + pianobottom.width - NPC_w/2  // 부딪히면 좌표 재지정
    }

  //빅식물
  image(bigplant,716,368);
  if (plX > 716 - NPC_w/3 && plX < 716 + bigplant.width &&
  plY > 368 && plY < 368 + bigplant.height/2 - NPC_h/2){
    isRightKeyPressed = false;
    plY = 368;
  } else if (plX > 716 - NPC_w/3 && plX < 716 + bigplant.width &&
    plY >= 368 + bigplant.height/2 - NPC_h/2 &&
    plY < 368 + bigplant.height - NPC_h/2){
    plY = 368 + bigplant.height - NPC_h/2;
    }

  ///미니식물
  image(smallplant,690,650);
  if (plX > 690 && plX < 690 + smallplant.width/2 && plY > 650) plY = 650;
  else if (plX >= 690 + smallplant.width/2 &&
  plX < 690 + smallplant.width && plY > 650) plX = plX;

  //--------------------------------------------------------------//

  //npc 그리기
  drawNPCs();
  //player 그리기
  drawPlayer();

  //player가 밑으로 지나가야 하는 오브젝트 모음
  piano.resize(300-20, 290-5);
  shelf.resize(94-5, 204-5);
  image(piano,320,475);
  image(bigplanttop,716,368);
  image(smallplant,690,650);
  image(shelf,570,179);
  //image(tabletop,410,365);
  

  let selectableNPC = nearNPCs();

  if (selectableNPC != -1) { //npc 근처에 있다면
    //TODO: 스트로크 표시
    //지금은 circle로 대체
    noStroke();
    fill(255);
    circle(NPC_position[selectableNPC][0], NPC_position[selectableNPC][1],30,30);
    
    //npc 옆 글씨로 키 누를 것을 안내
    key_shift.resize(100, 50);
    image(key_shift,plX, plY - 45);
    //쉬프트 누르면 스테이지 1로 이동
    //여러번 호출되는 문제가 발생. 한 번만 호출되도록 수정 필요할 수도 있음.
    if (keyIsDown(SHIFT)){
      stage = 1;
      playingNPC = NPCs[selectableNPC];
      console.log("selectabel num: " , selectableNPC);
    }
  }
}

function talk_npc(){
  image(bg_npc,0,0);

  //스크립트 디스플레이 공간
  fill(255);
  textSize(28);
  playingNPC.display();
}

function rhythm(){
  background(0);
  fill(255);
  playingGame.display();
}

function success() {
  image(bg_npc,0,0);
  
  //스크립트 디스플레이 공간
  fill(255);
  textSize(28);
  playingNPC.display();
}

function fail() {
  image(bg_npc,0,0);

  //스크립트 디스플레이 공간
  fill(255);
  textSize(28);
  playingNPC.display();
}


//--------------- 각 함수 내부에서 추가적으로 사용되는 함수들 -----------------//

function drawNPCs() {
  for (let i = 0; i < NPC_count; i++) {
    let img = NPC_pngs[i];
    img.resize(NPC_w, NPC_h);
    image(img, NPC_position[i][0], NPC_position[i][1]);
  }
}

function drawPlayer() {
  let photo = playerPng;
  photo.resize(NPC_w, NPC_h);
  image(photo, plX, plY);
}

function nearNPCs() {
  for (let i = 0; i < NPC_count; i++) {
    if (dist(plX, plY, NPC_position[i][0], NPC_position[i][1]) < 100) {
      return i;
    }
  }
  return -1;
}



//--------------- 외부 입력과 관련된 함수들 -----------------//

function mouseClicked() {
  console.log(mouseX, mouseY); //좌표 확인 용

  if (stage == 1 || stage == 3 || stage == 4) { //스크립트 플레이
    if (mouseX > 635 && mouseX < 785 && mouseY > 882 && mouseY < 957){
      if (playingNPC.isPlayable()) {
      console.log("return to lobby");
      playingNPC.scriptPointer = 0;
      stage = 0;
      }
    } else if (mouseX > 805 && mouseX < 955 && mouseY > 882 && mouseY < 957) {
      if (playingNPC.isPlayable()) {
        playingGame = games[playingNPC.num];
        console.log("playing NPC num here: ", playingNPC.num);
        console.log(playingGame);
        stage = 2;
      } else if (playingNPC.isReturnable()) {
        stage = 0;
      } else {
        playingNPC.updateScriptPointer();
      }
    }
  }

  if (stage == 2) { //리듬게임 플레이
    if (mouseX > 400 && mouseX < 600 && mouseY > 650 && mouseY < 750) {
      playingGame.startButtonClicked();
    }
    if (mouseX > 400 && mouseX < 600 && mouseY > 650 && mouseY < 750) {
      if (playingGame.returnResult() == 1) { //일단 무조건 성공이라 가정
        playingNPC.mode = 1;
        playingNPC.scriptPointer = 0;
        stage = 3;
      } else if (playingGame.returnResult() == -1){
        playingNPC.mode = 2;
        playingNPC.scriptPointer = 0;
        stage = 4;
      }
    }
  }
}


function keyPressed() {
  //게임
  if (keyCode == 65) { //A
    playingGame.buttonPressed(0);
  } else if (keyCode == 83) { //S
    playingGame.buttonPressed(1);
  } else if (keyCode == 68) { //D
    playingGame.buttonPressed(2);
  } else if (keyCode == 70) { //F
    playingGame.buttonPressed(3);
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
    playingGame.buttonReleased(0);
  } else if (keyCode == 83) { //S
    playingGame.buttonReleased(1);
  } else if (keyCode == 68) { //D
    playingGame.buttonReleased(2);
  } else if (keyCode == 70) { //F
    playingGame.buttonReleased(3);
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
