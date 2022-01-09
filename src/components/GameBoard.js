import React from "react";
import "../App.css";
import Enemy from "../ships/Enemy";
import { GAME_WIDTH, GAME_HEIGHT } from "../services/services";

// const GAME_WIDTH = window.innerWidth;
// const GAME_HEIGHT = window.innerHeight;

export default class GameBoard {
  constructor() {
    this.boardWidth = GAME_WIDTH;
    this.boardHeight = GAME_HEIGHT;
    this.allowedX = {x0: 5, x1: this.boardWidth - 5}
    this.allowedY = {y0: 50, y1: this.boardHeight - 5}
    
  }

  isOutOfBoundries(x, y) {
    return x <= 0 || x >= this.width || y <= 0 || y >= this.height;
  }

  changeHorizontalDirection(x) {
    return 
  }

  //requestAnimationFrame(runLoop);
}
