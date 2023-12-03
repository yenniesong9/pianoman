class Button {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.title = "untitle";
    }
    over() {
      rectMode(CENTER)
      if (this.x - this.w/2 < mouseX && mouseX < this.x +this.w/2 
      && this.y - this.h/2< mouseY && mouseY < this.y + this.h/2) {
        return true;
      } else {
        return false;
      }
    }
    show() {
      if (this.over()) fill(255, 0, 0);
      else fill(255, 200, 200);
      rect(this.x, this.y, this.w, this.h);
      textAlign(CENTER, CENTER);
      fill(20);
      textSize(16);
      text(this.title, this.x, this.y);
    }
    setTitle(title) {
      this.title = title;
    }
  }
