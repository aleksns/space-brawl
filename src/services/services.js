
export const directions = ["up", "down", "left", "right"];

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

export const projectileEnemyDefault = {
  w: 15,
  h: 15,
  color: colors.red,
  speed: 5
}

export const projectilePlayerDefault = {
  w: 15,
  h: 15,
  color: colors.blue,
  speed: 20
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

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function getRandomDirection() {
  let randomDirectionIndex = getRandomInt(directions.length);
  return directions[randomDirectionIndex];
}

export function getRandomEnemyPosition(max) {
  return getRandomInt(max);
}
