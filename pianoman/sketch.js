//images 폴더 안에 bg_image.jpg 파일을 수정하면 자동으로 그 크기에 맞는 캔버스가 생성됩니다. 
let bg_main;
let bg_npc;
let bg_w, bg_h;
let key_up, key_down, key_left, key_right;
let pixelFont;

///스테이지 구분
let stage = -3;
// -3: 시작화면, -2: 게임소개멘트, -1: 바텐더화면
// 0:로비, 1:NPC 플레이 중, 2:게임 중, 3:성공, 4:실패, 
// 5: 2명성공, 6: 4명 성공, 7: 엔딩화면

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
let bubbleArr = []

let introScript = "거리 곳곳에서 신나는 캐롤이 울리고,\n집집마다 형형색색의 트리가 반짝이는 오늘은 크리스마스.\n\n당신은 오늘 이 바에 첫 출근을 하게 된 피아노맨입니다.\n\n바에 있는 손님들의 사연을 듣고,\n이에 맞는 음악을 연주해 손님을 위로해주세요."
let selectableNPC = -1;
let heart;
let arrow;
let bartenderPng;
let bartenderBasic;
let bartenderSmile;
let bartenderScript = ["어, 그래! 당신이 오늘부터 함께 일하게 된 피아노맨이군.", 
"크리스마스인데 왜 표정이 안 좋냐고? 휴...", 
"오늘 같이 특별한 밤에 슬퍼보이는 손님이 많아서 \n걱정이 이만저만이 아냐.",
"당신이 오늘부터 할 일은 멋진 피아노 연주로 \n손님들을 기쁘게 해주는 거야!", 
"피아노는 위에서 내려오는 노트가 \n키보드 버튼에 닿을 때에 맞춰서 \nD, F, J, K키를 눌러서 연주할 수 있어.",
"노트를 80% 이상 틀리면 손님들의 기분은 나아지지 않을 거야.",
"하지만 걱정하지마. 우리 손님들은 모두 너그러운 분들이야. \n얼마든지 성공할 때까지 다시 연주해드리면 돼.",
"오늘치 일당을 받으려면 \n적어도 두 분에게는 연주를 성공해줘야 할거야.", 
"자, 이제 손님들에게 가서 말을 걸어봐. \n그래, 그럼 잘 부탁할게 피아노맨!"]
let missionPointer = -1;
let cabin;
let startButton;
let startButtonClicked;

let missionCompleteScript = ["오늘 첫 출근이라 걱정이 많았는데,", 
"당신 덕분에 손님들도 즐거워하고,\n우리 바가 더 따뜻해진 것 같군!",
"오늘치 일당만큼은 일을 다 했으니 이만 퇴근해도 좋아.",
"하지만 남아서 피아노를 더 연주하고 싶다면 \n얼마든지 그래도 돼. 우리 바는 항상 열려있거든!"];
//2명 엔딩 스크립트입니다
let completePointer = -1;

//4명 엔딩 스크립트도 필요함
let allCompleteScript = ["피아노 연주로 손님을 모두 행복하게 하다니!","넌 정말 최고의 피아니스트야. 아주 잘 뽑았군.",
"덕분에 나와 여기 계신 손님들 모두\n좋은 크리스마스 추억을 만들 수 있었어.", 
"그럼 당신도 행복한 크리스마스를 보내라고~!"]
let allCompletePointer = 0;


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
  shelf = loadImage('images/background/오브젝트7-1(선반윗부분).png');

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
  
  bubbleArr[0] = loadImage('images/button/말풍선_good.png');
  bubbleArr[1] = loadImage('images/button/말풍선_great.png');
  bubbleArr[2] = loadImage('images/button/말풍선_thanks.png');
  bubbleArr[3] = loadImage('images/button/말풍선_wow.png');

  for (let i = 0; i < NPC_count; i++) {
    let title = 'images/NPC/손님' + (i+1) + ' 3인칭(기본).png'
    let pixel = loadImage(title);
    NPC_pngs[i] = pixel;
    let stroke = 'images/NPC/손님' + (i+1) + ' 3인칭(스트로크).png';
    let choose = loadImage(stroke);
    NPC_choose[i] = choose;
    let basic = loadImage('images/NPC/손님' + (i+1) + '기본(픽셀화).png');
    let basic2 = loadImage('images/NPC/손님' + (i+1) + '말(픽셀화).png');
    let success = loadImage('images/NPC/손님' + (i+1) + '성공(픽셀화).png');
    let npc = new NPC(i, basic, basic2, success);
    NPCs[i] = npc;
    let notePng = loadImage('images/button/선물버튼' + (i+1) + '.png');
    notePngArr[i] = notePng;
  }

  playerPng = loadImage('images/NPC/주인공 3인칭(기본).png');
  heart = loadImage('images/NPC/하트.png');
  arrow = loadImage('images/NPC/화살표.png');
  bartenderPng = loadImage('images/NPC/바텐더 3인칭(기본).png')
  bartenderBasic = loadImage('images/NPC/바텐더 기본.png')
  bartenderSmile = loadImage('images/NPC/바텐더 웃음.png')
  endingPlayer = loadImage('images/NPC/엔딩배경.png')
  endingFrame = loadImage('images/NPC/엔딩프레임.png')
  cabin = loadImage('images/background/opening.png')
  tree = loadImage('images/background/tree.jpeg')
  startButton = loadImage('images/button/대화창버튼기본.png');
  startButtonClicked = loadImage('images/button/대화창버튼눌림.png');

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
}

function draw() {
  if (stage == -3) {
    beforeStart();
  } else if (stage == -2) {
    intro();
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
  } else if (stage == 5){ //2명 성공
    selectableNPC = -1;
    missionFinished();
  } else if (stage == 6) { //4명 성공
    selectableNPC = -1;
    allComplete();
  } else if (stage == 7) { //엔딩
    ending();
  }

  if (stage == 0 || (stage == -1 && missionPointer < 0) || (stage == 5&&completePointer < 0)) {
    drawResetButton();
  }
}

//--------------- 각 스테이지 별 함수들 -----------------//
function beforeStart() {
  image(cabin, 0, 0);
  stroke(0);
  strokeWeight(3);
  fill(255);
  textSize(36);
  text("press SPACEBAR or\nclick button to start",512,700);
}

function intro() {
  tree.resize(1029*1.5, 772*1.5);
  image(tree, 0, 0);

  fill(0, 150);
  rect(width/2, height/2, width, height);

  rect(width/2, height/2 - 100, width - 100, 350);
  fill(255);
  textSize(30);
  text(introScript, width/2, height/2 - 100);


  playerPng.resize(100, 130);
  image(playerPng, 850, 450);

  noStroke();
  startButton.resize(300,150);
  startButtonClicked.resize(300,150);
  if (mouseX > width/2 - 150 && mouseX < width/2 + 150 && mouseY > 650 && mouseY < 800) {
    image(startButtonClicked, width/2 - 150, 650);
    fill(255);
  } else {
    image(startButton, width/2 - 150, 650);
    fill(0);
  }
  textSize(28);
  text("그럼,\n출근해볼까요?", width/2, 650+70);
  fill(255);
  text("press SPACEBAR or click button",width/2,830);
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
    image(bartenderBasic, 300, 150);
    image(imageScript, 0, 0);
    fill(0);
    textSize(30);
    text(bartenderScript[missionPointer], width/2, 800);
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
    //rect(width/2, 750, width - 100, 200);
    image(bartenderSmile, 350, 150);
    image(imageScript, 0, 0);
    fill(0);
    textSize(30);
    text(missionCompleteScript[completePointer], width/2, 800);
    let button1 = new Button(880-75, 920-37.5);
    let button2 = new Button(880-75-170, 920-37.5);
    if (completePointer == missionCompleteScript.length - 1) {
      button1.setTitle("다른 손님에게\n연주하기");
      button2.setTitle("처음으로");
      button2.show();
    } else {
      button1.setTitle("다음으로");
    }
    button1.show();
  }
}

function ending() {
  image(endingPlayer,0,0);
  image(endingFrame,0,0);

  startButton.resize(200,100);
  startButtonClicked.resize(200,100);
  if (mouseX > width/2 - 100 && mouseX < width/2 + 100 && mouseY > 800 && mouseY < 900) {
    image(startButtonClicked, width/2 - 100, 800);
    fill(255);
  } else {
    image(startButton, width/2 - 100, 800);
    fill(0);
  }
  textSize(28);
  text("처음으로", width/2, 848);
}

function allComplete() {
  image(bg_main,0,0);
  //npc 그리기
  drawNPCs();

  if (allCompletePointer != -1) {
    noStroke();
    fill(0, 150);
    rect(width/2, height/2, width, height);
    //rect(width/2, 750, width - 100, 200);
    image(bartenderSmile, 350, 150);
    image(imageScript, 0, 0);
    fill(0);
    textSize(30);
    text(allCompleteScript[allCompletePointer], width/2, 800);
    let button1 = new Button(880-75, 920-37.5);
    if (allCompletePointer == allCompleteScript.length - 1) {
      button1.setTitle("엔딩으로");
    } else {
      button1.setTitle("다음으로");
    }
    button1.show();
  }
}
//--------------- 함수 내부에서 추가적으로 사용되는 함수들 -----------------//

function drawNPCs() {
  for (let i = 0; i < NPC_count; i++) {
    let img;
    if (selectableNPC == i) img = NPC_choose[i];
    else img = NPC_pngs[i];
    img.resize(NPC_w, NPC_h);

    bubbleArr[i].resize(100, 85);

    if (NPC_completed[i] == 1) {
      let heartPng = heart;
      heartPng.resize(50, 50);
      image(heartPng, NPC_position[i][0]+25, NPC_position[i][1] - 50)
            
      if (dist(plX, plY, NPC_position[i][0], NPC_position[i][1]) < 100) {
        image(bubbleArr[i], NPC_position[i][0]+50, NPC_position[i][1]-20);
       }
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
   /*if (
    plX < 180 + minitable.width/2 && plX > 180 - 20 &&
    plY < 290 - 20 + minitable.height - NPC_h && plY > 290 - NPC_h/2
    ) {
      isRightKeyPressed = false; // 부딪히면 방향키 비활성화
    }*/
    if (
    plX < 180 + minitable.width - NPC_w && plX >= 180 + minitable.width/2 &&
    plY < 290 + minitable.height - NPC_h - 20 && plY > 290 - NPC_h/2
    ) {
      isLeftKeyPressed = false; // 부딪히면 방향키 비활성화
    }

  //큰테이블
  image(table,410,365);
  if (
    plX < 410 + table.width/2 && plX > 410 - NPC_w/2 &&
    plY < 365 + table.height - NPC_h -20 && plY > 365 - 100
    ) {
      //isRightKeyPressed = false; // 부딪히면 방향키 비활성화
    } else if (
    plX < 410 + 20 + table.width - NPC_w/2 && plX >= 410 + table.width/2 &&
    plY < 365 + table.height - NPC_h -20 && plY > 365 - 70
    ) {
      isLeftKeyPressed = false; // 부딪히면 방향키 비활성화
    }

  //피아노
  pianobottom.resize(300-20, 290-5)
  image(pianobottom,320,475);
  if (
    plX < 320 + pianobottom.width/2 && plX > 320 - 10 - NPC_w/2 &&
    plY < 475 + pianobottom.height - NPC_h + 10 && plY > 475 - NPC_h/2
    ) {
      isRightKeyPressed = false; // 부딪히면 방향키 비활성화

    } else if (
    plX < 320 + 10 + pianobottom.width - NPC_w/2 && plX >= 320 + pianobottom.width/2 &&
    plY < 475 + pianobottom.height - NPC_h + 10 && plY > 475 - NPC_h/2
    ) {
      isLeftKeyPressed = false; // 부딪히면 방향키 비활성화
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

function drawResetButton() {
  let button1 = new Button(150, 900);
  button1.setTitle("처음으로");
  button1.show();

}

//--------------- 외부 입력과 관련된 함수들 -----------------//

function mouseClicked() {
  if (stage == 1 || stage == 3 || stage == 4) { //스크립트 플레이
    if (mouseX > 635 && mouseX < 785 && mouseY > 882 && mouseY < 957){
      if (playingNPC.isPlayable()) { //게임 하기 전에 로비로 돌아가는 경우
        playingNPC.scriptPointer = 0;
        stage = 0;
      } else { //실패 상태에서 게임 다시 플레이
        playingNPC.scriptPointer = 0;
        games[playingNPC.num] = new Game(playingNPC.num, songArr[playingNPC.num]);
        playingGame = games[playingNPC.num];
        songLobby.stop();
        stage = 2;
      }
    } else if (mouseX > 805 && mouseX < 955 && mouseY > 882 && mouseY < 957) {
      if (playingNPC.isPlayable()) { //게임 시작하는 경우
        playingGame = games[playingNPC.num];
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
        if (success_count == 2) { //전부 성공 시 엔딩 페이지로
          stage = 5;
        } else if (success_count == 4) {
          stage = 6;
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

  if (stage == -3) {
    if (mouseX > 390 && mouseX < 640 && mouseY > 550 && mouseY < 630) {
        stage = -2;
        songLobby.play();
      }
    }

  if (stage == -2) {
    if (mouseX > width/2 - 150 && mouseX < width/2 + 150 && mouseY > 650 && mouseY < 800) {
        stage = -1;
      }
    }

  if (stage == 5 && completePointer != -1) {
    if (completePointer == missionCompleteScript.length - 1) {
      if (mouseX > 635 && mouseX < 785 && mouseY > 882 && mouseY < 957){
        window.location.reload();
        }
    if (mouseX > 805 && mouseX < 955 && mouseY > 882 && mouseY < 957) {
        stage = 0;
      }
    } completePointer++;
  }


  if (stage == 6 && allCompletePointer != -1) {
    if (mouseX > 805 && mouseX < 955 && mouseY > 882 && mouseY < 957) {
      if (allCompletePointer == allCompleteScript.length - 1) {
        stage = 7;
      }
      allCompletePointer++;
    }
  }

  if (stage == 0 || (stage == -1 && missionPointer < 0) || (stage == 5&&completePointer < 0)) { //재시작
    if (mouseX > 150 && mouseX < 300 && mouseY > 900 && mouseY < 975) {
      window.location.reload();
    }
  }

  if (stage == 7){
    if (mouseX > width/2 - 100 && mouseX < width/2 + 100 && mouseY > 800 && mouseY < 900)
      window.location.reload();
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


  //스페이스바로 스테이지 이동
  if(keyCode === 32){
    spaceMove();
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

function spaceMove() {
    //무조건 오른쪽 버튼만 누른다고 가정했을 때. 왼쪽/오른쪽 버튼 선택 가능한 경우에는 여러 추가 작업이 필요해보여 일단 보류...!
      if (stage == 1 || stage == 3 || stage == 4){
        if (playingNPC.scriptPointer < scripts[playingNPC.num][playingNPC.mode].length-1){
        playingNPC.scriptPointer++;
        } else if (playingNPC.isPlayable()) { //게임 시작하는 경우
          playingGame = games[playingNPC.num];
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
          if (success_count == 2) {
            stage = 5;
            selectableNPC = -1;
          } else if (success_count == 4) {
            stage = 6;
          } else {
            stage = 0;
          }
        }
      } else if (stage == 2){
        playingGame.startButtonClicked(); // 시작할 때도 버튼이 눌려야 하는디.. 왜 안될까
        if (playingGame.returnResult() == 1) { //성공의 경우
          playingNPC.mode = 1;
          playingNPC.scriptPointer = 0;
          stage = 3;
          songLobby.play();
        } else if (playingGame.returnResult() == -1){ //실패의 경우
          playingNPC.mode = 2;
          playingNPC.scriptPointer = 0;
          stage = 4;
          songLobby.play();
        }
      } else if(stage == -3 || stage == -2) {
        if (stage == -3) {
          songLobby.play();
        }
        stage++;
      } else if (stage == -1) {
        if (missionPointer != -1 && missionPointer < bartenderScript.length -1){
          missionPointer++;
        } else if (missionPointer == bartenderScript.length -1) {
          stage = 0;
        }
      } else if (stage == 5 && completePointer != -1) {
        if (completePointer == missionCompleteScript.length - 1) {
            stage = 0; //엔딩 화면
          }
        completePointer++;
      } else if (stage == 6 && allCompletePointer != -1) {
          if (allCompletePointer == allCompleteScript.length - 1) {
            stage = 7;
          } else allCompletePointer++;
      } else if (stage == 7){
        window.location.reload(); // 왜 안될까 22
      }
}
