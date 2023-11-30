class Note {
    constructor(num, lane, interval) {
        this.num = num; //몇 번째 노트인지
        this.lane = lane; //몇 번째 레인인지
        this.interval = interval; //앞 노트와의 간격
    }

    display() {
        //노트 그리기
    }

    checkHit() {
        //노트가 레인에 닿았는지 확인
        //닿았다면 true, 아니라면 false 리턴
    }
}