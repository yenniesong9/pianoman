//노트 생성 후 업데이트 필요
//몇 번 레인인지와 시작 기준으로 몇 박자인지
let notes0 = [[0,0],[0,0.5],[2,1],[1,2],[3,3],[2,4],[0,5.5],[0,6],
[2,6.5],[1,7.5],[3,8.5],[2,9.5],[1,11],[1,11.5],[3,12],[2,13],[1,14],[1,14.5],
[0,15],[0,16],[3,16.5],[3,17],[2,17.5],[1,18.5],[2,19.5],[0,20.5],
[0,22],[0,22.5],[2,23],[1,23.5],[3,24.5],[2,25.5],
[0,27.5],[0,28],[2,28.5],[1,29.5],[3,30.5],[2,31.5],
[1,33],[1,33.5],[3,34],[2,35],[1,36],[1,36.5],[0,37],[0,38],
[3,39],[3,39.5],[2,40],[0,41],[1,41.5],[0,42.5]]
//생일 축하 노래

let notes1 = [[0,0], [3,1.4], [2,2.8], [1,3.15], [1,3.85], [0,4.2],
[1,6.3], [2,6.65], [3,7], [2,7.35], [1,7.7], [2,8.05], [3,8.75], [3,9.45], [0,9.8],
[0,11.2], [3,12.6], [2,14], [1,14.35], [0,15.05],
[0,17.5], [1,17.95], [2,18.2], [1,18.55], [0,18.9], [2,19.15], [3,19.95], [3,20.45], 
[0,21.35], [1,21.7], [2,22.05],[3,22.75], [1,23.45],
[0,24.15], [1,24.5], [2,24.85], [3,25.55], [1,26.25],
[2,28], [3,28.462], [0,28.924], [1,29.4], [2,30.1],[3,30.8],
[0,33.6], [3,33.6], [1,34.65], [2,34.65],[1,35], [2,35.35], [3,35.7], 
[0,36.4], [3,37.8],[2,39.2], [1,39.9], [1,40.95], [0,41.3],
[0,44.1],[0,44.45], [2,44.8], [3,45.15], [2,45.5], [1,45.85], [1,46.55]];
//npc2 - something never change

let notes2 = [[3,0],[1,0.7],[2,1.05],[3,1.4],[1,2.1],[2,2.45],[3,2.8],
[2,5.6],[0,6.3],[1,6.65],[2,7],[0,7.7],[1,8.05],[2,8.4],[1,9.1],[2,9.45],[3,9.8],[2,10.5],[1,10.85],
[2,11.2],[2,11.9],[2,12.6],[2,13.3],[1,13.65],[0,14],[1,14.35],[1,14.7],[2,16.1],
[1,16.8],[2,17.15],[2,17.5],[2,18.2],[3,18.9],[1,19.6],
[3,22.4],[1,23.1],[2,23.45],[3,23.8],[1,24.5],[2,24.85],[3,25.2],
[2,28],[0,28.7],[1,29.05],[2,29.4],[0,30.1],[1,30.45],[2,30.8],[1,31.5],[2,31.85],[3,32.2],[2,32.9],[1,33.25],
[2,33.6],[2,34.3],[2,35],[2,35.7],[1,36.05],[3,36.4],[1,36.75],[1,37,1],
[0,38.5],[0,38.85],[0,39.2],[1,39.55],[1,39.9],[1,40.6],[2,41.3],[1,42],[1,42.35],[1,42.7],[1,43.4],[2,44.1],[3,44.8]];
//npc3 - Memories

let notes3 = [[3,0],[3,0.75],[1,1],[2,2],[2,2.75],[0,3],[0,4],[3,3.75],[2,5],[1,6],
[2,8],[3,8.75],[2,9],[0,10],[1,10],[2,11],
[1,12],[2,12],[2,12.75],[2,13],[1,14],[3,14.75],
[0,16],[1,16.75],[3,17.25],[1,18],[3,18],[2,18.75],[3,19.25],
[0,20],[1,20.75],[2,21],[3,21.75],
[0,24.75],[3,24.75],[1,25.75],[2,26],[1,26.75],[2,27],
[1,28],[3,28],[2,29],[0,29.75],
[2,32], [3,32], [2,32.75], [3,32.75], [2,33], [3,33],
[0,34], [1,34],[0,34.75], [1,34.75], [0,35], [1,35],
[1,36],[3,36.75],[2,37],[0,38],
[0,40],[2,40],[3,40.75],[2,41],[0,42],[1,42],[2,43],
[2,44],[3,44.75],[2,45],[0,46],
[0,48],[1,48.75],[2,49.25],[0,50],[2,50],[3,50.75],[2,51.25],
[0,52],[1,52.75],[2,53],[0,53.75],[3,53.75],
[0,56.75],[3,56.75],[1,57.75],[2,57.75],[0,58],[1,59],[2,59.75],[3,59.75]]; 
//npc4 -jinglebell

let noteArr = [notes0, notes1, notes2, notes3];
let songNameArr = ["Happy Birthday", "Some Things Never Change", "Memories", "Jingle Bell Rock"];
let artistArr = ["", "", "", ""];
let levelArr = ["★", "★★", "★★★", "★★★★"];

let laneText = ["D", "F", "J", "K"];
let lanePressed = [0, 0, 0, 0];

let bpms = [502, 475, 466, 462]; //한 박자 시간
let startDelayArr = [2800, 2800, 2800, 2800]; //첫 노트가 나온 후 음악이 시작되기 까지의 시간
let textDisplayedTime = 25;

class Game {

    constructor(num, song) {
        //npc 번호와 일치
        this.num = num;

        //Note 오브젝트의 배열 생성
        this.notes = this.makeNoteArr(noteArr[num]); //플레이할 노트 목록 가져오기
        this.bpm = bpms[this.num]; //박자 설정

        this.song = song; //음악 불러오기
        console.log(this.song);

        this.startDelay = startDelayArr[this.num]; //첫 노트가 나온 후 음악이 시작되기 까지의 시간
        this.notePointer = 0; //다음에 불러올 노트의 인덱스
        this.displayedNotes = []; //현재 화면에 나오는 노트의 배열

        this.play = 0; //게임이 만들어졌지만 시작되지는 않음
        this.songPlay = 0; //음악이 재생되지 않음
        this.songEnd = 0; //음악이 끝나지 않음
        this.endDelay = 1000; //음악이 끝난 후 게임이 끝나기까지의 시간
        this.gameEnd = 0;

        this.hit = 0;
        this.miss = 0;

        this.lastHitTime = 0;
        this.lastMissTime = 0;
        this.combo = 0;
    }

    start() { //외부에서 플레이 버튼을 눌렀을 때 실행. 게임 시작
        console.log("game start");

        this.play = 1;
        this.startTime = millis();
        this.lastUpdatedTime = this.startTime;
        
        console.log(this.startTime);
    }

    addNote() {
        let curTime = millis();

        if (this.notePointer >= this.notes.length) { 
            return; //더 이상 불러올 노트가 없음
        }

        //새 노트 생성해서 추가
        while (true) {
            if (this.notePointer >= this.notes.length) break;
            let nextNote = this.notes[this.notePointer];
            if (curTime - this.startTime > nextNote.timing*this.bpm) {
                //this.lastUpdatedTime = curTime;
                this.displayedNotes.push(nextNote);
                this.notePointer++;
            } else {
                break;
            }
        }
        

        //delay가 지났다면 음악 재생
        if (this.songPlay == 0) {
            if (curTime - this.startTime > this.startDelay) {
                console.log("song started");
                this.song.play();
                this.songPlay = 1;
            }
        }
    }

    deleteNote() {
        if (this.displayedNotes.length != 0) {
            let oldestNote = this.displayedNotes[0];
            if (oldestNote.y - oldestNote.height/2 > laneDetected) {
                this.displayedNotes.shift(); //가장 오래된 노트 삭제
                this.miss++; //miss 횟수 증가
                this.combo = 0;
                this.lastMissTime = textDisplayedTime;
            }
        }
    }

    display() { //매 루프마다 실행
        if (this.play) {
            if (!this.gameEnd) {
                if (!this.songEnd) {
                    this.addNote(); //새 노트 업데이트
                    this.deleteNote();
                    this.detectCollision();
                    this.hitAndMiss();

                    //디스플레이
                    //console.log(this.displayedNotes);
                    let curTime = millis();
                    for (let note of this.displayedNotes) {
                        note.display();
                        note.y = (curTime-this.startTime-note.timing*this.bpm)/3000*965 - 50;
                    }

                    this.song.onended(() => {
                        console.log("song end");
                        this.songEnd = 1;
                        this.doneTime = millis();
                    });
                } else {
                    if (this.songEnd) { //게임이 끝났다면
                        if (millis() - this.doneTime > this.endDelay) {
                            this.gameEnd = 1;
                        }
                    }
                }
                this.drawButton();
                this.drawStatistics();
            } else {
                //게임 종료 화면
                //fill(0, 0, 0);
                //rectMode(CENTER)
                //rect(500, 500, 1024, 1024);
                textSize(100);
                fill(255);
                if (this.hit/this.notes.length > 0.8) {
                    text("Success!", width/2, 400);
                } else {
                    text("Game Over", width/2, 400);   
                }
                fill(255);
                rect(500, 600, 200, 100);
                fill(0);
                textSize(30);
                text("게임 종료", 500, 600);
            }
        } else {
            //게임 시작
            textSize(100);
            fill(255);
            if (this.num == 1) {
                textSize(40);
                text("겨울왕국2 OST", 500, 430);
                textSize(80);
            } else if (this.num  == 2) {
                textSize(40);
                text("Maroon 5", 500, 430);
                textSize(100);
            }
            text(songNameArr[this.num], 500, 350);
            text(levelArr[this.num], 600, 500);
            textSize(60)
            text("난이도: ", 400, 500);
            fill(255);
            rect(500, 700, 200, 100);
            textSize(30);
            fill(0);
            text("플레이", 500, 700);
        }
        
    }

    detectCollision() {
        let deletedNoteIdx = [];
        for (let i = 0; i < this.displayedNotes.length; i++) { //가장 오래된 노트부터 살핌
            let checkNote = this.displayedNotes[i];

            if (checkNote.y + checkNote.height/2 < laneDetected) { //이번에 살피는 노트가 레인에 닿지 않음
                break; //더 이상 확인할 필요 없음
            }

            for (let lane = 0; lane < 4; lane++) {
                if (lanePressed[lane]) { //해당 레인이 눌러져 있다면
                    if (checkNote.checkHit(lane)) { //노트가 레인에 닿았다면
                        //this.displayedNotes.splice(i, 1); //노트 삭제
                        deletedNoteIdx.push(i);
                        this.hit++; //hit 횟수 증가
                        this.combo++;
                        this.lastHitTime = textDisplayedTime;
                        break; //이 노트를 더 이상 확인할 필요 없음
                    }
                }
            }
        }
        for (let i = deletedNoteIdx.length - 1; i >= 0; i--) {
            this.displayedNotes.splice(deletedNoteIdx[i], 1);
        }
    }

    buttonPressed(lane) { //key가 눌려지면 실행
        lanePressed[lane] = 1;
    }

    buttonReleased(lane) {
        lanePressed[lane] = 0;
    }

    makeNoteArr(arr) {
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            newArr[i] = new Note(arr[i][0], arr[i][1]);
        }
        return newArr;
    }

    drawButton() {
        for (let i = 0; i < 4; i++) {
            if (lanePressed[i]) {
                let tmp = buttonPressedArr[i]
                tmp.resize(150, 110)
                image(tmp, laneStartX[i]-75, laneStartY)
            } else {
                let tmp = buttonBasicArr[i]
                tmp.resize(150, 110)
                image(tmp, laneStartX[i]-75, laneStartY)

            }
        }
    }

    drawStatistics() {
        textSize(40);
        fill(255);
        textAlign(LEFT);
        text("hit: " + this.hit, 800, 50);
        text("miss: " + this.miss, 800, 100);
        textAlign(CENTER);
    }

    hitAndMiss() {
        textSize(100)
        if (this.lastHitTime > this.lastMissTime) {
            if (this.combo > 2) {
                fill(255, 255, 0, this.lastHitTime*10);
                text("COMBO " + this.combo + "!", width/2, 600);
            } else {
                fill(255, this.lastHitTime*10);
                text("HIT!", width/2, 600);
            }
            this.lastHitTime--;
            this.lastMissTime = (this.lastMissTime != 0) ? this.lastMissTime - 1 : 0;
        } else {
            if (this.lastMissTime > 0) {
                fill(255, 0, 0, this.lastMissTime*10);
                text("MISS!", width/2, 600);
                this.lastMissTime--;
                this.lastHitTime = (this.lastHitTime != 0) ? this.lastHitTime - 1 : 0;
            }
        }
    }

    startButtonClicked() {
        if (this.play == 0) this.start();
    }

    resetButtonClicked() {
        this.song.stop();
    }

    returnResult() { //0이라면 진행 중, 1이라면 성공, -1이라면 실패
        if (this.gameEnd) {
            if (this.hit/this.notes.length > 0.8) {
                return 1;
            } else {
                return -1;
            }
        } else {
            return 0;
        }
    }
}
