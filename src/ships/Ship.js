// import React from "react";
// import "../App.css";
// import GameBoard from "./components/GameBoard";

// export default class Ship {
//   constructor(x, y, contextRef) {
//     this.x = x;
//     this.y = y;
//     this.contextRef = contextRef;
//     this.moveDistance = 10;
//     this.gameBoard = new GameBoard();
//   }

//   draw() {
//     switch (shipType) {
//       case "player":
//         contextRef.current.fillStyle = "blue";
//         contextRef.current.beginPath();
//         contextRef.current.arc(500, 500, 50, 0, 2 * Math.PI);
//         contextRef.current.fill();
//         contextRef.current.closePath();
//         break;
//       case "enemy":
//         this.contextRef.current.fillStyle = "#A776D8";
//         this.contextRef.current.beginPath();
//         this.contextRef.current.arc(this.x, this.y, 50, 0, 2 * Math.PI);
//         this.contextRef.current.fill();
//         this.contextRef.current.closePath();
//         break;
//       default:
//         console.log("Error occurred handling 'draw' method in 'Ship' class");
//     }
//   }

//   move() {
//     if (this.gameBoard.isOutOfBoundries(this.x, this.y)) {
//       console.log("Yep, its out of boundries")
//     } 

//     //this.x += this.moveDistance;
//   }
// }