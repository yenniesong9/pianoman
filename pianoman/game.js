//노트 생성 후 업데이트 필요
//몇 번 레인인지와 시작 기준으로 몇 박자인지
let notes0 = [[0, 0], [0, 0.5], [3, 1], [2, 2], [3, 3], [1, 4], [0, 5],
                [1, 6.5], [3, 7], [2, 8], [3, 9], [2, 10], [0, 11],
                [0, 12], [0, 12.5], [3, 13], [2, 14], [2, 15], [1, 16], [0, 17], 
                [3, 18], [3, 18.5], [2, 19], [0, 20], [1, 21], [0, 22]];

let notes1 = [];
let notes2 = [];
let notes3 = [];
let noteArr = [notes0, notes1, notes2, notes3];


let audioName = ["birthday.mp3", "", "", ""];
let laneText = ["A", "S", "D", "F"];
let lanePressed = [0, 0, 0, 0];

let bpm = [400]; //한 박자 시간
let startDelayArr = [3000]; //첫 노트가 나온 후 음악이 시작되기 까지의 시간

class Game {

    constructor(num, song) {
        //npc 번호와 일치
        this.num = num;

        //Note 오브젝트의 배열 생성
        this.notes = this.makeNoteArr(noteArr[num]); //플레이할 노트 목록 가져오기
        this.bpm = bpm[num]; //박자 설정

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
        if (curTime - this.startTime > nextNote.timing*bpm) {
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
                rect(0, 0, width, height);
                textSize(100);
                fill(0);
                if (this.hit/this.notes.length > 0.8) {
                    text("Success!", 300, 500);
                } else {
                    text("Game Over", 300, 500);   
                }
            }
        } else {
            //게임 시작
            this.start();
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
            textSize(50);
            fill(0);
            text(laneText[i], laneStartX[i]+30, laneStartY+40);
        }
    }

    drawStatistics() {
        textSize(40);
        fill(0);
        text("hit: " + this.hit, 800, 50);
        text("miss: " + this.miss, 800, 100);
    }
}