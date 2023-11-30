//NPC 별로 스크립트 추가
let script0 = ["안녕하세요", "어쩌구", "저쩌구"];
let script1 = [];
let script2 = [];
let script3 = [];
let scripts = [script0, script1, script2, script3];


class NPC {
    constructor(num) {
        this.num = num;
        this.image = loadImage('images/NPC' + num + '.png');
        this.stage = 0; //script의 어느 단계에 있는지
        this.mode = 0; //게임 전인지, 중인지, 후인지
        this.game = new Game(num);
    }

    display() {
        if (this.mode == 0) {
            //게임 전 스크립트 진행
        } else if (this.mode == 1) {
            //게임 중
            this.game.display();
        } else {
            //게임 후 스크립트 진행
        }
    }

    //클릭이 발생했고, 넘어가는 버튼 위에 있다면 실행됨
    buttonClicked() {
        //스크립트 넘어가기 (스테이지 업데이트)
    }

    //게임이 진행중이라면 0, 성공했다면 1, 실패했다면 -1을 리턴
    //리턴한 값을 받아서 sketch.js에서 npc 관리 
    returnSuccess() {
    }


}