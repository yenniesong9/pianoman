//NPC 별로 스크립트 추가
let script0 = [["안녕하세요", "어쩌구", "저쩌구"], ["성공의 경우", "추가 스크립트"], ["실패의 경우"]];
let script1 = [["1번 NPC", "테스트용 스크립트"], ["성공의 경우2"], ["실패의 경우2"]];
let script2 = [];
let script3 = [];
let scripts = [script0, script1, script2, script3];


class NPC {
    constructor(num, imageBasic, imageSuccess) {
        this.num = num;
        this.imageBasic = imageBasic;
        this.imageSuccess = imageSuccess;
        this.scriptPointer = 0; //script의 어느 단계에 있는지
        this.mode = 0; //전, 성공, 실패
    }

    display() {
        if (this.mode == 0) {
            //게임 전 스크립트 진행
            image(this.imageBasic, 280, 50);
            text(scripts[this.num][this.mode][this.scriptPointer], width / 2, height/2  + 100);
            fill(255);
            rect(900, 900, 150, 50);
            fill(0);
            if (this.scriptPointer < scripts[this.num][this.mode].length - 1) {
                text("다음으로", 900, 900);
            } else {
                text("연주하러 가기", 900, 900);
            }
        } else {
            image(this.imageSuccess, 280, 50);
            text(scripts[this.num][this.mode][this.scriptPointer], width / 2, height / 2);
            fill(255);
            rect(900, 900, 150, 50);
            fill(0);
            if (this.scriptPointer < scripts[this.num][this.mode].length - 1) {
                text("다음으로", 900, 900);
            } else {
                text("로비로 가기", 900, 900);
            }
        }
    }

    isPlayable() {
        return this.mode == 0 && scripts[this.num][0].length-1 == this.scriptPointer;
    }

    isReturnable() {
        return this.mode != 0 && scripts[this.num][this.mode].length-1 == this.scriptPointer;
    }

    updateScriptPointer() {
        //스크립트 넘어가기 (스테이지 업데이트)
        this.scriptPointer++;
    }
}