import GameBoard from "./GameBoard";

export default class Collision {
  constructor(game) {
    this.game = game;
    this.gameBoard = new GameBoard();
    this.boardWidth = this.gameBoard.boardWidth;    ///exists in services. 
    this.boardHeight = this.gameBoard.boardHeight;   ///exists in services

    this.allowedX = this.gameBoard.allowedX;
    this.allowedY = this.gameBoard.allowedY;
    console.log(">> Collison Constructor")
  }

  rectsColliding(r1, r2) {
    return !(
      r1.x > r2.x + r2.w ||
      r1.x + r1.w < r2.x ||
      r1.y > r2.y + r2.h ||
      r1.y + r1.h < r2.y
    );
  }

  /* Adjust player's position if collision is detected */

  adjustPlayerPositionOnBordersCollision(rect) {
    if (this.isCollisionBorderUp(rect, 0)) {
      rect.y = this.allowedY.y0;
    }
    if (this.isCollisionBorderDown(rect, 0)) {
      rect.y = this.allowedY.y1 - rect.h;
    }
    if (this.isCollisionBorderLeft(rect, 0)) {
      rect.x = this.allowedX.x0;
    }
    if (this.isCollisionBorderRight(rect, 0)) {
      rect.x = this.allowedX.x1 - rect.w;
    }
  }

  /* Rrectangle | Borders Collision functions */

  isCollisionWithAnyBorder(rect, offStep) {
    return (
      this.isCollisionBorderUp(rect, offStep) ||
      this.isCollisionBorderDown(rect, offStep) ||
      this.isCollisionBorderLeft(rect, offStep) ||
      this.isCollisionBorderRight(rect, offStep)
    );
  }

  isCollisionBorderUp(rect, offStep) {
    return rect.y <= this.allowedY.y0 + offStep;
  }

  isCollisionBorderDown(rect, offStep) {
    return rect.y + rect.h >= this.allowedY.y1 - offStep;
  }

  isCollisionBorderLeft(rect, offStep) {
    return rect.x <= this.allowedX.x0 + offStep;
  }

  isCollisionBorderRight(rect, offStep) {
    return rect.x + rect.w >= this.allowedX.x1 - offStep;
  }

  rectCircleColliding(rect, circle) {
    var distX = Math.abs(circle.x - rect.x - rect.w / 2);
    var distY = Math.abs(circle.y - rect.y - rect.h / 2);

    if (distX > rect.w / 2 + circle.r) {
      return false;
    }
    if (distY > rect.h / 2 + circle.r) {
      return false;
    }

    if (distX <= rect.w / 2) {
      return true;
    }
    if (distY <= rect.h / 2) {
      return true;
    }

    var dx = distX - rect.w / 2;
    var dy = distY - rect.h / 2;
    return dx * dx + dy * dy <= circle.r * circle.r;
  }
}
