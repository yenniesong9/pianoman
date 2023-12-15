class Button {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.w = 150;
      this.h = 75;
      this.default = buttonDefault;
      this.click = buttonClick;
      this.title = "untitle";
    }
    over() {
      if (this.x < mouseX && mouseX < this.x + this.w 
      && this.y < mouseY && mouseY < this.y + this.h || keyIsDown(32)) {
        return true;
      } else {
        return false;
      }
    }
    show() {
      if (this.over()) image(this.click, this.x, this.y);
      else image(this.default, this.x, this.y);
      fill(20);
      textSize(16);
      text(this.title, this.x + this.default.width/2, this.y + this.default.height/2-2);
    }
    setTitle(title) {
      this.title = title;
    }
  }
