//NPC 별로 스크립트 추가
let script0 = [["다들 크리스마스 밤에 행복해보이네요...",
"사실 오늘은 가장 행복해야 할 저의 생일이지만,\n매년 크리스마스에 밀려서\n아무도 제 생일을 기억하지도 못 하고, 축하해주지도 않아요…", 
"그 흔한 생일 축하 노래마저\n크리스마스 캐롤에 묻혀 들리지 않네요ㅠㅠ",
"아무에게도 생일 축하를 받지 못 하고 여기 혼자 오게 되다니…\n너무 슬픈 생일이에요."],
 ["아름다운 연주가 너무 감동적이네요... \n덕분에 저도 오늘 다른 사람에게 생일을\n축하 받을 수 있게 되었어요. 고마워요!"],
 ["역시 오늘 제 생일을 축하 받는 건 불가능한 일이었군요… \n하지만 이제 익숙해서 눈물도 나지 않네요."]];

let script1 = [["다들 가족들과 멋진 크리스마스 밤을 보내고 있네요.", "전 가족들과 떨어져 산지 어연 10년이 다 되어가고 있어요.",
"서로 바쁜 일 탓에 얼굴도 잘 못 보는 것에\n익숙해졌다고 생각했지만..", "이렇게 크리스마스가 되면\n외로움이 느껴지는 건 어쩔 수 없나봐요.",
"오늘따라 가족들이 더 보고 싶어지네요."],
 ["당신의 피아노 선율이 외로운 내 마음을 위로해주네요! \n아름다운 노래를 들으며 멀리 있는 가족들을 생각하니\n마음이 따뜻해졌어요."], 
 ["가족들을 향한 그리움은 역시 지워지지 않네요. \n피아노 소리를 들으니 마음이 더 슬퍼져요."]];

let script2 = [["제가 생각하는 크리스마스는 이런 게 아니었어요.", 
"전 분명 사랑하는 제 연인과 함께 맛있는 케이크를 먹고, \n분위기 좋은 곳에서 저녁 식사하는 모습을 상상했는데…",
"바로 어제 헤어지게 될 줄 누가 알았겠어요!",
 "지금이라도 시간을 돌려서 다시 만나고 싶어요.. \n오늘은 인생 최악의 크리스마스로 기억될 거 같아요."],
["아름다운 피아노 연주 덕분에\n오늘 제 슬픔을 조금이나마 잊을 수 있었어요. \n더 멋진 사람이 돼서 그녀를 찾아가겠어요."], 
["역시 아름다운 음악도 제 마음을 위로해주지는 못하네요… \n그녀 없는 크리스마스는 너무 슬퍼요."]];

let script3 = [["오늘이 크리스마스 밤이었다니!","매일 같은 시간에 출근해 똑같은 일만 하고 \n피곤하게 집으로 돌아가는 일상만 반복되는 탓에 \n시간이 가는 줄도 몰랐네요…",
"이렇게 지루하게 크리스마스 밤을 보내긴 아쉬워서\n이 곳을 찾게 되었는데,","오늘이 지나면 내일도 똑같은 하루를 시작해야 한다는 사실에 \n기운이 나질 않아요."],
["아름다운 연주를 듣고 나니, 제 기분이 한결 나아졌어요. \n덕분에 힘을 얻어서 내일도 열심히 살아갈 수 있을 것 같아요."],
["멋진 연주를 듣는다고 해서 기분이 좋아지지 않네요. \n이 기분으로 내일도 회사에 가야겠죠…"]];

let scripts = [script0, script1, script2, script3];

class NPC {
    constructor(num, imageBasic, imageBasic2, imageSuccess) {
        this.num = num;
        this.imageScript = imageScript;
        this.imageBasic = imageBasic;
        this.imageBasic2 = imageBasic2;
        this.imageSuccess = imageSuccess;
        this.scriptPointer = 0; //script의 어느 단계에 있는지
        this.mode = 0; //전, 성공, 실패
    }

    display() {
        if (this.mode == 0) { //게임 전 스크립트 진행
            this.imageBasic.resize(700,875);
            this.imageBasic2.resize(700,875);
            if(this.scriptPointer % 3 == 0) {
                image(this.imageBasic,width-860,height-940); //npc 그림1
            } else {
                image(this.imageBasic2,width-860,height-940); //npc 그림2
            }
            image(this.imageScript,0,0); //스크립트 디스플레이 화면
            //스크립트 텍스트
            fill(50);
            text(scripts[this.num][this.mode][this.scriptPointer], width / 2, height / 2 + 280);
            //스크립트 버튼
            let button1 = new Button(880-75, 920-37.5);
            let button2 = new Button(880-75-170, 920-37.5);
            if (this.scriptPointer < scripts[this.num][this.mode].length - 1) {
                button1.setTitle("다음으로");
            } else {
                button1.setTitle("연주하러 가기");
                button2.setTitle("다른 손님과\n대화하기");
                button2.show();
            }
            button1.show();
        } else {
            if (this.mode == 1) { //성공 시
                this.imageSuccess.resize(700,875);
                image(this.imageSuccess,width-860,height-940);
            } else { //실패 시
                this.imageBasic.resize(700,875);
                image(this.imageBasic,width-860,height-940);
            }
            image(this.imageScript,0,0); //스크립트 디스플레이 화면
            
            fill(50);
            text(scripts[this.num][this.mode][this.scriptPointer], width / 2, height / 2 + 280);
            let button1 = new Button(880-75, 920-37.5);
            let button2 = new Button(880-75-170, 920-37.5);
            if (this.scriptPointer < scripts[this.num][this.mode].length - 1) {
                button1.setTitle("다음으로");
            } else {
                if (this.mode == 2) {
                    button2.setTitle("다시 연주하기");
                    button2.show();
                }
                button1.setTitle("로비로 가기");
            }
            button1.show();
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
