//images 폴더 안에 bg_image.jpg 파일을 수정하면 자동으로 그 크기에 맞는 캔버스가 생성됩니다. 
let bg_main;
let bg_npc;
let bg_w, bg_h;
let key_up, key_down, key_left, key_right;
let pixelFont;

///스테이지 구분
let stage = -2; //0:로비, 1:NPC 플레이 중, 2:게임 중, 3:성공, 4:실패

///NPC 관련 변수
let NPC_count = 4; //TODO: 향후 수정 필요
let NPCs = []; //NPC 객체들을 담을 배열
let NPC_completed = [0, 0, 0, 0]; //성공하면 1로 바뀌는 배열
let success_count = 0;

let playingNPC;

//lobby에 표시하는 용
let NPC_pngs = [];
let NPC_choose = []; //npc 이미지 저장
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

let buttonBasicArr = []
let buttonPressedArr = []
let notePngArr = []
let songArr = []

let selectableNPC = -1;
let heart;
let arrow;
let bartenderPng;
let bartenderPng2;
let bartenderScript = ["어, 그래! 당신이 오늘부터 함께 일하게 된 피아노맨이군.", "크리스마스인데 왜 표정이 안 좋냐고? 휴...", "오늘 같이 특별한 밤에 슬퍼보이는 손님이 많아\n걱정이 이만저만이 아냐.", 
                      "그래서 말인데, 네가 좀 도와줄 수 있을까?", "당신의 연주로 손님들을 기쁘게 해주는 거야!", "피아노는 위에서 내려오는 노트에 맞춰서\nD, F, J, K를 눌러서 연주할 수 있어.",
                      "몇 명한테 연주해줘야 하냐고? 흠...\n적어도 두 분한테는 연주해줘.", "그래, 그럼 부탁할게 피아노맨!"]
let missionPointer = -1;
let cabin;
let startButton;
let startButtonClicked;

let missionCompleteScript = ["오늘 첫 출근이라 걱정이 많았는데,", "당신 덕분에 손님들도 즐거워하고,\n우리 바가 더 따뜻해진 거 같군!", "덕분에 나와 손님들 모두\n좋은 크리스마스 추억을 만들 수 있었어.", "그럼 당신도 행복한 크리스마스를 보내라고~! 하하하"];
let completePointer = -1;


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

  buttonBasicArr[0] = loadImage('images/button/D버튼 기본.png')
  buttonPressedArr[0] = loadImage('images/button/D버튼 눌림.png')
  buttonBasicArr[1] = loadImage('images/button/F버튼 기본.png')
  buttonPressedArr[1] = loadImage('images/button/F버튼 눌림.png')
  buttonBasicArr[2] = loadImage('images/button/J버튼 기본.png')
  buttonPressedArr[2] = loadImage('images/button/J버튼 눌림.png')
  buttonBasicArr[3] = loadImage('images/button/K버튼 기본.png')
  buttonPressedArr[3] = loadImage('images/button/K버튼 눌림.png')
  
  for (let i = 0; i < NPC_count; i++) {
    console.log(i);
    let title = 'images/NPC/손님' + (i+1) + ' 3인칭(기본).png'
    let pixel = loadImage(title);
    NPC_pngs[i] = pixel;
    let stroke = 'images/NPC/손님' + (i+1) + ' 3인칭(스트로크).png';
    let choose = loadImage(stroke);
    NPC_choose[i] = choose;
    let basic = loadImage('images/NPC/손님' + (i+1) + '기본(픽셀화).png');
    let success = loadImage('images/NPC/손님' + (i+1) + '성공(픽셀화).png');
    let npc = new NPC(i, basic, success);
    NPCs[i] = npc;
    console.log(NPCs[i]);
    let notePng = loadImage('images/button/선물버튼' + (i+1) + '.png');
    notePngArr[i] = notePng;
  }

  playerPng = loadImage('images/NPC/주인공 3인칭(기본).png');
  heart = loadImage('images/NPC/하트.png');
  arrow = loadImage('images/NPC/화살표.png');
  bartenderPng = loadImage('images/NPC/바텐더 3인칭(기본).png')
  bartenderPng2 = loadImage('images/NPC/바텐더 3인칭(기본).png')
  cabin = loadImage('images/background/cabin.jpeg')
  startButton = loadImage('images/button/대화창버튼기본.png');
  startButtonClicked = loadImage('images/button/대화창버튼눌림.png')

  //음악 불러오기
  song0 = loadSound('audio/hbdhard2.mp3');
  song1 = loadSound('audio/stnc.mp3');
  song2 = loadSound('audio/memories1.mp3');
  song3 = loadSound('audio/jinglebell.mp3');
  songArr[0] = song0;
  songArr[1] = song1;
  songArr[2] = song2;
  songArr[3] = song3;

  songLobby = loadSound('audio/christmasjazz.mp3');
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

  songLobby.setLoop(true);
  songLobby.setVolume(0.3);
  songLobby.play();
}

function draw() {
  //console.log(playingNPC);
  if (stage == -2) {
    beforeStart();
  } else if (stage == -1) {
    bartender();
  } else if (stage == 0) { 
    lobby();
  } else if (stage == 1){
    talk_npc();
  } else if (stage == 2){
    rhythm();
  } else if (stage == 3){ //성공 스크립트 진행
    success();
  } else if (stage == 4){ //실패 스크립트 진행
    fail();
  } else if (stage == 5){ //전체 성공
    missionFinished();
  } else if (stage == 6) {
    ending();
  }
}

//--------------- 각 스테이지 별 함수들 -----------------//
function beforeStart() {
  image(cabin, 0, -300);
  fill(255);
  textSize(100);
  text("Piano Man", 512, 300);
  startButton.resize(250, 120);
  startButtonClicked.resize(250, 120);
  textSize(50);
  if (mouseX > 380 && mouseX < 630 && mouseY > 450 && mouseY < 570) {
    image(startButton, 380, 450);
    fill(0);
  } else {
    image(startButtonClicked, 380, 450);
    fill(255);
  }
  text("START", 512, 500);
}

function bartender() {
  image(bg_main,0,0);
  key_default.resize(250,250);
  image(key_default,760,800);
  let tmpBart = bartenderPng;
  tmpBart.resize(NPC_w, NPC_h);
  image(tmpBart, 450, 150);
  arrow.resize(100, 80);
  image(arrow, 450, 70);

  //플레이어 움직이기
  movePlayer();
  //npc 그리기
  drawNPCs();
  //player 그리기
  drawPlayer();

  if (plX > 400 && plX < 530 && plY > 0 && plY < 350) {
    key_shift.resize(100, 50);
    image(key_shift,plX, plY - 45);
    if (keyIsDown(SHIFT)){
      missionPointer = 0;
    }
  }

  //player가 밑으로 지나가야 하는 오브젝트 모음
  piano.resize(300-20, 290-5);
  shelf.resize(94-5, 204-5);
  image(piano,320,475);
  image(bigplanttop,716,368);
  image(smallplant,690,650);
  image(shelf,570,179);
  //image(tabletop,410,365);


  if (missionPointer != -1) {
    noStroke();
    fill(0, 150);
    rect(width/2, height/2, width, height);
    rect(width/2, 750, width - 100, 200);
    image(bartenderPng2, 300, 100);
    fill(255);
    textSize(30);
    text(bartenderScript[missionPointer], width/2, 750);
    let button1 = new Button(880-75, 920-37.5);
    button1.setTitle("다음으로");
    button1.show();
  } 
}

function lobby() {
  image(bg_main,0,0);
  key_default.resize(250,250);
  image(key_default,760,800);

  let tmpBart = bartenderPng;
  tmpBart.resize(NPC_w, NPC_h);
  image(tmpBart, 450, 150);

  //플레이어 움직이기
  movePlayer();
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
  

  selectableNPC = nearNPCs();

  if (selectableNPC != -1) { //npc 근처에 있다면
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

function talk_npc() {
  image(bg_npc,0,0);

  //스크립트 디스플레이 공간
  fill(255);
  textSize(28);
  playingNPC.display();
}

function rhythm() {
  image(bg_main, 0, 0)
  background(0, 0, 0, 150);
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

function missionFinished() {
  console.log(completePointer);
  image(bg_main,0,0);
  key_default.resize(250,250);
  image(key_default,760,800);
  let tmpBart = bartenderPng;
  tmpBart.resize(NPC_w, NPC_h);
  image(tmpBart, 450, 150);
  arrow.resize(100, 80);
  image(arrow, 450, 70);

  //플레이어 움직이기
  movePlayer();
  //npc 그리기
  drawNPCs();
  //player 그리기
  drawPlayer();

  if (plX > 400 && plX < 530 && plY > 0 && plY < 350) {
    key_shift.resize(100, 50);
    image(key_shift,plX, plY - 45);
    if (keyIsDown(SHIFT)){
      completePointer = 0;
    }
  }

  //player가 밑으로 지나가야 하는 오브젝트 모음
  piano.resize(300-20, 290-5);
  shelf.resize(94-5, 204-5);
  image(piano,320,475);
  image(bigplanttop,716,368);
  image(smallplant,690,650);
  image(shelf,570,179);
  //image(tabletop,410,365);

  

  if (completePointer != -1) {
    noStroke();
    fill(0, 150);
    rect(width/2, height/2, width, height);
    rect(width/2, 750, width - 100, 200);
    image(bartenderPng2, 350, 100);
    fill(255);
    textSize(30);
    text(missionCompleteScript[completePointer], width/2, 750);
    let button1 = new Button(880-75, 920-37.5);
    if (completePointer == missionCompleteScript.length - 1) {
      button1.setTitle("엔딩으로");
    } else {
      button1.setTitle("다음으로");
    }
    button1.show();
  }
}

function ending() {
  image(cabin, 0, -300);
  fill(255);
  textSize(100);
  text("임시 엔딩", 512, 300);
}

//--------------- 함수 내부에서 추가적으로 사용되는 함수들 -----------------//

function drawNPCs() {
  for (let i = 0; i < NPC_count; i++) {
    let img;
    if (selectableNPC == i) img = NPC_choose[i];
    else img = NPC_pngs[i];
    img.resize(NPC_w, NPC_h);
    if (NPC_completed[i] == 1) {
      let heartPng = heart;
      heartPng.resize(50, 50);
      image(heartPng, NPC_position[i][0]+25, NPC_position[i][1] - 50)
    }
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
      if (NPC_completed[i] == 0) {
        return i;
      }
    }
  }
  return -1;
}

function movePlayer() {
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
  if(plX < 400 && plY > 680 || plX > 650 && plY > 680){
    isDownKeyPressed = false;
    if(plX < 400) isLeftKeyPressed = false;
    if(plX > 650) isRightKeyPressed = false;
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
      isUpKeyPressed = false;
      isDownKeyPressed = false;
    } else if (
    plX < 410 + 20 + table.width - NPC_w/2 && plX >= 410 + table.width/2 &&
    plY < 365 + table.height - NPC_h + 10 && plY > 365 - 100
    ) {
      isLeftKeyPressed = false; // 부딪히면 방향키 비활성화
      isUpKeyPressed = false;
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
      isDownKeyPressed = false;

    } else if (
    plX < 320 + 10 + pianobottom.width - NPC_w/2 && plX >= 320 + pianobottom.width/2 &&
    plY < 475 + pianobottom.height - NPC_h + 10 && plY > 475 - NPC_h/2
    ) {
      isLeftKeyPressed = false; // 부딪히면 방향키 비활성화
      isUpKeyPressed = false;
      isDownKeyPressed = false;
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
  if (plX > 690 - 10 && plX < 690 + smallplant.width/2 && plY > 640 && plY < 690) {
    //isRightKeyPressed = false;
    plY = 650;
  }
  else if (plX >= 690 + smallplant.width/2 &&
  plX < 690 + smallplant.width - 10 && plY > 640 && plY < 690) isLeftKeyPressed = false;

}

//--------------- 외부 입력과 관련된 함수들 -----------------//

function mouseClicked() {
  console.log(mouseX, mouseY); //좌표 확인 용

  if (stage == 1 || stage == 3 || stage == 4) { //스크립트 플레이
    if (mouseX > 635 && mouseX < 785 && mouseY > 882 && mouseY < 957){
      if (playingNPC.isPlayable()) { //게임 하기 전에 로비로 돌아가는 경우
        console.log("return to lobby");
        playingNPC.scriptPointer = 0;
        stage = 0;
      } else { //실패 상태에서 게임 다시 플레이
        console.log("test");
        playingNPC.scriptPointer = 0;
        games[playingNPC.num] = new Game(playingNPC.num, songArr[playingNPC.num]);
        playingGame = games[playingNPC.num];
        songLobby.stop();
        stage = 2;
      }
    } else if (mouseX > 805 && mouseX < 955 && mouseY > 882 && mouseY < 957) {
      if (playingNPC.isPlayable()) { //게임 시작하는 경우
        playingGame = games[playingNPC.num];
        console.log("playing NPC num here: ", playingNPC.num);
        console.log(playingGame);
        songLobby.stop();
        stage = 2;
      } else if (playingNPC.isReturnable()) { //게임 후 로비로 들어가는 경우
        if (playingNPC.mode == 1) { //성공했을 경우
          NPC_completed[playingNPC.num] = 1;
          success_count++;
        } else {
          NPCs[playingNPC.num].mode = 0;
          games[playingNPC.num] = new Game(playingNPC.num, songArr[playingNPC.num]);
          playingNPC.scriptPointer = 0;
        }
        if (success_count == 4) { //전부 성공 시 엔딩 페이지로
          stage = 5;
        } else {
          stage = 0;
        }
      } else { //스크립트 진행
        playingNPC.updateScriptPointer();
      }
    }
  }

  if (stage == 2) { //리듬게임 플레이
    if (mouseX > 400 && mouseX < 600 && mouseY > 650 && mouseY < 750) {
      playingGame.startButtonClicked();
    }
    if (mouseX > 400 && mouseX < 600 && mouseY > 550 && mouseY < 650) {
      if (playingGame.returnResult() == 1) { //성공의 경우
        playingNPC.mode = 1;
        playingNPC.scriptPointer = 0;
        stage = 3;
      } else if (playingGame.returnResult() == -1){ //실패의 경우
        playingNPC.mode = 2;
        playingNPC.scriptPointer = 0;
        stage = 4;
      }
      songLobby.play();
    }
  }

  if (stage == -1 && missionPointer != -1) { //바텐더
    if (mouseX > 805 && mouseX < 955 && mouseY > 882 && mouseY < 957) {
      if (missionPointer == bartenderScript.length - 1) {
        stage = 0;
      }
      missionPointer++;
    }
  }

  if (stage == -2) {
    if (mouseX > 380 && mouseX < 630 && mouseY > 450 && mouseY < 570) {
      stage = -1;
    }
  }

  if (stage == 5 && completePointer != -1) {
    if (mouseX > 805 && mouseX < 955 && mouseY > 882 && mouseY < 957) {
      if (completePointer == missionCompleteScript.length - 1) {
        stage = 6; //엔딩 화면
      }
      completePointer++;
    }
  }
}

function keyPressed() {
  //게임
  if (keyCode == 68) { //D
    playingGame.buttonPressed(0);
  } else if (keyCode == 70) { //F
    playingGame.buttonPressed(1);
  } else if (keyCode == 74) { //J
    playingGame.buttonPressed(2);
  } else if (keyCode == 75) { //K
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

  if (keyCode == 82) {
    stage = 5;
  }
}

function keyReleased() {
  //게임
  if (keyCode == 68) { //D
    playingGame.buttonReleased(0);
  } else if (keyCode == 70) { //F
    playingGame.buttonReleased(1);
  } else if (keyCode == 74) { //J
    playingGame.buttonReleased(2);
  } else if (keyCode == 75) { //K
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