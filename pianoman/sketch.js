//images 폴더 안에 bg_image.jpg 파일을 수정하면 자동으로 그 크기에 맞는 캔버스가 생성됩니다. 
let bg_image;
let bg_w, bg_h;

let mode = 0; //0:로비, 1:NPC 플레이 중

let NPCs = []; //NPC 객체들을 담을 배열
let NPC_completed, NPC_tried = [0, 0, 0, 0]; //성공하면 1로 바뀌는 배열
let success_count = 0; 

let button = 0;
let game;
let song0;

function preload() {
  bg_image = loadImage('images/bg_image.jpg');
  song0 = loadSound('audio/birthday.mp3');
}

function setup() {
  //bg_image 크기에 맞는 캔버스 생성
  bg_w = bg_image.width;
  bg_h = bg_image.height;
  createCanvas(bg_w, bg_h);
  game = new Game(0, song0);

}

function draw() {
  background(220);
  //image(bg_image, 0, 0);
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
  if (keyCode == 65) { //A
    game.buttonPressed(0);
  } else if (keyCode == 83) { //S
    game.buttonPressed(1);
  } else if (keyCode == 68) { //D
    game.buttonPressed(2);
  } else if (keyCode == 70) { //F
    game.buttonPressed(3);
  }
}

function keyReleased() {
  if (keyCode == 65) { //A
    game.buttonReleased(0);
  } else if (keyCode == 83) { //S
    game.buttonReleased(1);
  } else if (keyCode == 68) { //D
    game.buttonReleased(2);
  } else if (keyCode == 70) { //F
    game.buttonReleased(3);
  }
}
