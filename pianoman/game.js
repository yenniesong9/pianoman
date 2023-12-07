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

let notes1 = [[0, 0], [0, 1], [1, 2], [2, 3], [3, 4], [3, 5], 
[2, 6], [1, 9], [2, 10], [3, 11], 
[2, 12], [2, 13], [2, 14], [0, 15], [3, 16], [1, 17.5], 
[2, 18], [2, 19], [1, 20], [1, 21], [0, 22], [1, 23], 
[2, 24], [3, 27], 
[0, 30], [1, 31], [2, 32], [3, 33], 
[3, 36], [2, 37], [2, 38], [1, 39], [0, 40], [1, 41], 
[1, 42], [1, 44], [2, 44.5], [3, 45]];
//수고했어 오늘도

let notes2 = [[3,0],[1,0.7],[2,1.05],[3,1.4],[1,2.1],[2,2.45],[3,2.8],
[2,5.6],[0,6.3],[1,6.65],[2,7],[0,7.7],[1,8.05],[2,8.4],[1,9.1],[2,9.45],[3,9.8],[2,10.5],[1,10.85],
[2,11.2],[2,11.9],[2,12.6],[2,13.3],[1,13.65],[0,14],[1,14.35],[1,14.7],[2,16.1],
[1,16.8],[2,17.15],[2,17.5],[2,18.2],[3,18.9],[1,19.6],
[3,22.4],[1,23.1],[2,23.45],[3,23.8],[1,24.5],[2,24.85],[3,25.2],
[2,28],[0,28.7],[1,29.05],[2,29.4],[0,30.1],[1,30.45],[2,30.8],[1,31.5],[2,31.85],[3,32.2],[2,32.9],[1,33.25],
[2,33.6],[2,34.3],[2,35],[2,35.7],[1,36.05],[3,36.4],[1,36.75],[1,37,1],
[0,38.5],[0,38.85],[0,39.2],[1,39.55],[1,39.9],[1,40.6],[2,41.3],[1,42],[1,42.35],[1,42.7],[1,43.4],[2,44.1],[3,44.8]];
//실연남 - Memories

let notes3 = []; //4번캐릭터
let noteArr = [notes0, notes1, notes2, notes3];


let audioName = ["birthday.mp3", "", "", ""];
let laneText = ["A", "S", "D", "F"];
let lanePressed = [0, 0, 0, 0];

let bpms = [500, 470]; //한 박자 시간
let startDelayArr = [3000, 3000]; //첫 노트가 나온 후 음악이 시작되기 까지의 시간

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
        //console.log(this.notePointer);
        let nextNote = this.notes[this.notePointer];
        //console.log(this.notePointer);
        //console.log(nextNote);
        if (curTime - this.startTime > nextNote.timing*this.bpm) {
            //this.lastUpdatedTime = curTime;
            this.displayedNotes.push(nextNote);
            this.notePointer++;
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
            if (oldestNote.y > laneStartY) {
                this.displayedNotes.shift(); //가장 오래된 노트 삭제
                this.miss++; //miss 횟수 증가
            }
        }
    }

    display() { //매 루프마다 실행
        if (this.play) {
            if (!this.gameEnd) {
                if (!this.songEnd) {
                    this.addNote(); //새 노트 업데이트
                    this.deleteNote();

                    //디스플레이
                    //console.log(this.displayedNotes);
                    for (let note of this.displayedNotes) {
                        note.display();
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
                fill(255, 0, 0);
                rectMode(CENTER)
                rect(500, 500, 1024, 1024);
                textSize(100);
                fill(0);
                if (this.hit/this.notes.length > 0.8) {
                    text("Success!", 500, 500);
                } else {
                    text("Game Over", 500, 500);   
                }
                fill(255);
                rect(500, 700, 200, 100);
                fill(0);
                textSize(30);
                text("게임 종료", 500, 700);
            }
        } else {
            //게임 시작
            text("대기 화면", 500, 500);
            fill(255);
            rect(500, 700, 200, 100);
            fill(0);
            text("플레이", 500, 700);
        }
        
    }

    buttonPressed(lane) { //key가 눌려지면 실행
        lanePressed[lane] = 1;
        for (let i = 0; i < this.displayedNotes.length; i++) { //가장 오래된 노트부터 살핌
            let checkNote = this.displayedNotes[i];

            if (checkNote.y + checkNote.height < laneStartY) { //이번에 살피는 노트가 레인에 닿지 않음
                break; //더 이상 확인할 필요 없음
            }

            if (checkNote.checkHit(lane)) { //노트가 레인에 닿았다면
                this.displayedNotes.splice(i, 1); //노트 삭제
                this.hit++; //hit 횟수 증가
                break; //더 이상 확인할 필요 없음
            }
        }   
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
                fill(150);
            } else {
                fill(255);
            }
            rect(laneStartX[i], laneStartY, 100, 50);
            textSize(30);
            fill(0);
            text(laneText[i], laneStartX[i], laneStartY+10);
        }
    }

    drawStatistics() {
        textSize(40);
        fill(255);
        text("hit: " + this.hit, 800, 50);
        text("miss: " + this.miss, 800, 100);
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