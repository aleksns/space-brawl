import shieldOrb1 from "../images/animations-images/shieldOrb-images/shieldOrb1.png";
import shieldOrb2 from "../images/animations-images/shieldOrb-images/shieldOrb2.png";
import shieldOrb3 from "../images/animations-images/shieldOrb-images/shieldOrb3.png";
import shieldOrb4 from "../images/animations-images/shieldOrb-images/shieldOrb4.png";
import shieldOrb5 from "../images/animations-images/shieldOrb-images/shieldOrb5.png";
import shieldOrb6 from "../images/animations-images/shieldOrb-images/shieldOrb6.png";
import shieldOrb7 from "../images/animations-images/shieldOrb-images/shieldOrb7.png";
import shieldOrb8 from "../images/animations-images/shieldOrb-images/shieldOrb8.png";
import shieldOrb9 from "../images/animations-images/shieldOrb-images/shieldOrb9.png";
import shieldOrb10 from "../images/animations-images/shieldOrb-images/shieldOrb10.png";
import shieldOrb11 from "../images/animations-images/shieldOrb-images/shieldOrb11.png";
import shieldOrb12 from "../images/animations-images/shieldOrb-images/shieldOrb12.png";
import shieldOrb13 from "../images/animations-images/shieldOrb-images/shieldOrb13.png";
import shieldOrb14 from "../images/animations-images/shieldOrb-images/shieldOrb14.png";
import shieldOrb15 from "../images/animations-images/shieldOrb-images/shieldOrb15.png";
import shieldOrb16 from "../images/animations-images/shieldOrb-images/shieldOrb16.png";
import shieldOrb17 from "../images/animations-images/shieldOrb-images/shieldOrb17.png";


import coin0Deg from "../images/animations-images/coin-images/coin0Deg.png";
import coin25Deg from "../images/animations-images/coin-images/coin25Deg.png";
import coin50Deg from "../images/animations-images/coin-images/coin50Deg.png";
import coin65Deg from "../images/animations-images/coin-images/coin65Deg.png";
import coin80Deg from "../images/animations-images/coin-images/coin80Deg.png";
import coin90Deg from "../images/animations-images/coin-images/coin90Deg.png";
import coin100Deg from "../images/animations-images/coin-images/coin100Deg.png";
import coin115Deg from "../images/animations-images/coin-images/coin115Deg.png";
import coin130Deg from "../images/animations-images/coin-images/coin130Deg.png";
import coin155Deg from "../images/animations-images/coin-images/coin155Deg.png";

const shieldOrbFrames = [];

export function initAnimationFrames() {
    initShieldOrbFrames();

}


function initShieldOrbFrames() {
    // var img1 = new Image();
    // img1.src = shieldOrb1;
    
    var img2 = new Image();
    img2.src = shieldOrb2;
   
    var img3 = new Image();
    img3.src = shieldOrb3;
  
    var img4 = new Image();
    img4.src = shieldOrb4;
   
    var img5 = new Image();
    img5.src = shieldOrb5;
  
    var img6 = new Image();
    img6.src = shieldOrb6;

    var img7 = new Image();
    img7.src = shieldOrb7;
    
    var img8 = new Image();
    img8.src = shieldOrb8;

    var img9 = new Image();
    img9.src = shieldOrb9;
    
    var img10 = new Image();
    img10.src = shieldOrb10;
   
    var img11 = new Image();
    img11.src = shieldOrb11;
  
    var img12 = new Image();
    img12.src = shieldOrb12;
   
    var img13 = new Image();
    img13.src = shieldOrb13;
  
    var img14 = new Image();
    img14.src = shieldOrb14;

    var img15 = new Image();
    img15.src = shieldOrb15;
    
    var img16 = new Image();
    img16.src = shieldOrb16;

    var img17 = new Image();
    img17.src = shieldOrb17;

   // shieldOrbFrames.push(img1);
    shieldOrbFrames.push(img2);
    shieldOrbFrames.push(img3);
    shieldOrbFrames.push(img4);
    shieldOrbFrames.push(img5);
    shieldOrbFrames.push(img6);
    shieldOrbFrames.push(img7);
    shieldOrbFrames.push(img8);
    shieldOrbFrames.push(img9);
    shieldOrbFrames.push(img10);
    shieldOrbFrames.push(img11);
    shieldOrbFrames.push(img12);
    shieldOrbFrames.push(img13);
    shieldOrbFrames.push(img14);
    shieldOrbFrames.push(img15);
    shieldOrbFrames.push(img16);
    shieldOrbFrames.push(img17);
}


export function getShieldOrbFrames() {
    return shieldOrbFrames;
}

