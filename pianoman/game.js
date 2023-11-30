let notes0 = [];
let notes1 = [];
let notes2 = [];
let notes3 = [];

let notes = [notes0, notes1, notes2, notes3];

class Game {
    constructor(num) {
        this.num = num;
        this.notes = notes[num];
    }

    display() {

    }

    checkHit(lane) { //key가 눌려지면 실행
        //hit 또는 miss 반환
    }
}