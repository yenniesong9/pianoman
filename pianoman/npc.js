//NPC 별로 스크립트 추가
let script0 = [["다들 크리스마스 밤에 행복해보이네요...",
"사실 오늘은 가장 행복해야 할 저의 생일이지만, 매년 크리스마스에 밀려서\n아무도 제 생일을 기억하지도 못 하고, 축하해주지도 않아요…", 
"그 흔한 생일 축하 노래마저 크리스마스 캐롤에 묻혀 들리지 않네요 ㅠㅠ.",
"아무에게도 생일 축하를 받지 못 하고 여기 혼자 오게 되다니… 너무 슬픈 생일이에요."], ["성공의 경우", "추가 스크립트"], ["실패의 경우"]];
let script1 = [["다들 가족들과 멋진 크리스마스 밤을 보내고 있네요.", "전 가족들과 떨어져 산지 어연 10년이 다 되어가고 있어요.",
"서로 바쁜 일 탓에 얼굴도 잘 못 보는 것에 익숙해졌다고 생각했지만..\n이렇게 크리스마스가 되면 외로움이 느껴지는 건 어쩔 수 없나봐요.",
"오늘따라 가족들이 더 보고 싶어지네요."], ["성공의 경우2"], ["실패의 경우2"]];
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
        display() {
            //스크립트 디스플레이 공간
            fill(0,150);
            rect(width/2,height/2+350,width,height/3);
        if (this.mode == 0) {
            //게임 전 스크립트 진행
            text(scripts[this.num][this.mode][this.scriptPointer], width / 2, height / 2 + 310);
            let button = new Button(900, 950, 150, 50);
            if (this.scriptPointer < scripts[this.num][this.mode].length - 1) {
                button.setTitle("다음으로");
            } else {
                button.setTitle("연주하러 가기");
            }
            button.show();
        } else {
            text(scripts[this.num][this.mode][this.scriptPointer], width / 2, height / 2);
            let button = new Button(900, 950, 150, 50)
            if (this.scriptPointer < scripts[this.num][this.mode].length - 1) {
                button.setTitle("다음으로");
            } else {
                button.setTitle("로비로 가기");
            }
            button.show();
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
