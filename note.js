let laneStartX = [200, 400, 600, 800];
let laneStartY = 850;
let laneDetected = 880;
let laneColor = ['pink', 'red', 'salmon', 'orange'];


class Note {
    height = 80;
    width = 100;

    constructor(lane, timing) {
        this.lane = lane; //몇 번째 레인인지
        this.timing = timing; //시작으로부터의 타이밍
        
        this.y = -50; //중앙
        this.x = laneStartX[lane];

        //한 번 할 떄마다 얼마나 이동할 것인지
        this.speed = 5;
        this.img = notePngArr[lane];
    }

    display() {
        //노트를 화면에 표시
        this.img.resize(120, 120);
        image(this.img, this.x-60, this.y-60);
        //이미지는 코너를 중심으로 불러와짐
        
        //위치 업데이트
        //this.y += this.speed;
        //노트가 화면 밖으로 나가거나 유저가 버튼을 눌러서 삭제되는 경우는 게임 클래스에서 처리
    }

    checkHit(lane) { //lane에 닿았다면 true 반환
        if (lane == this.lane) { //lane이 같음
            if (this.y + this.height/2 >= laneDetected) { //노트가 레인에 닿음
                return true;
            }
        }
        return false;
    }
}