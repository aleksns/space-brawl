
//export const directions = ["left", "right", "up", "down"];
export const directions = ["left", "right"];

export const colors = {
  green: "#00FF2D",
  yellow: "#FCFF00",
  red: "#FF0000",
  blue: "#2F60FF",
  hitRegColor: "#ffffff",
  scoreColor: "#8BE0FF",
};

export function getObjectCenterPosition(object) {
  var centerPosition = {
    x: Math.floor(object.x + (object.w / 2)),
    y: Math.floor(object.y + (object.h / 2)),
  }
  return centerPosition;
}

export function getHPColor(health) {
  if (health >= 70) {
    return colors.green;
  } else if (health >= 35 && health < 70) {
    return colors.yellow;
  } else if (health < 35) {
    return colors.red;
  }
}

export function getTrueBasedOnChance(chance) {
  let foo = Math.random() * 100;

  if(foo < chance) {
    return true;
  }
  else {
    return false;
  }
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomDirection() {
  let randomDirectionIndex = getRandomInt(0, directions.length-1);
  return directions[randomDirectionIndex];
}
