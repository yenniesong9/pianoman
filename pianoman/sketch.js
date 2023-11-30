//images 폴더 안에 bg_image.jpg 파일을 수정하면 자동으로 그 크기에 맞는 캔버스가 생성됩니다. 
let bg_image;
let bg_w, bg_h;

let mode = 0; //0:로비, 1:NPC 플레이 중

let NPCs = []; //NPC 객체들을 담을 배열
let NPC_completed, NPC_tried = [0, 0, 0, 0]; //성공하면 1로 바뀌는 배열
let success_count = 0; 

function preload() {
  bg_image = loadImage('images/bg_image.jpg');
}

function setup() {
  //bg_image 크기에 맞는 캔버스 생성
  bg_w = bg_image.width;
  bg_h = bg_image.height;
  createCanvas(bg_w, bg_h);

}

function draw() {
  background(220);
  image(bg_image, 0, 0);
}
