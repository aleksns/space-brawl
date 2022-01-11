//export const directions = ["left", "right", "up", "down"];
//  export const GAME_WIDTH = window.innerWidth;
//  export const GAME_HEIGHT = window.innerHeight;

//export const GAME_WIDTH = 1536;
//export const GAME_HEIGHT = 754;

export const GAME_WIDTH = 1436;
export const GAME_HEIGHT = 734;

export function getPlayerT0Dimension() {
  let dimension = {
    w: GAME_WIDTH / 12,
    h: GAME_HEIGHT / 9,
  };
  return dimension;
}

export function getEnemyT0Dimension() {
  var dimension = {
    w: GAME_WIDTH / 2,
    h: GAME_HEIGHT / 2.5,
  };
  return dimension;
}

export function getEnemyT4Dimension() {
  var dimension = {
    w: GAME_WIDTH / 10,
    h: GAME_HEIGHT / 9,
    // w: 150,
    // h: 75,
  };
  return dimension;
}

export const directions = ["left", "right"];

export const colors = {
  green: "#00FF2D",
  yellow: "#FFAD00",
  red: "#FF0000",
  blue: "#2F60FF",
  hitRegColor: "#ffffff",
  scoreColor: "#8BE0FF",
  uiBlue: "#3498DB",
  uiBlueDark: "#000657",
  uiGreen: "#2ECC71",
  uiRed: "#CB4335",
  uiRedDark: "#C0392B",
};

export const getStatusEffectsBar = {
  w: 200,
  h: 75,
  x: GAME_WIDTH - 220,
  y: GAME_HEIGHT - 85,
  color: "#FFC76B",
  isFill: false,
  shadowColor: "transparent",
  shadowBlur: 0,
  opacity: 0.4,
};

export const itemBuffConfig = {
  w: 50,
  h: 50,
  color: "transparent",
  opacity: 1.0,
  shadowBlur: 20,
  isFill: false,
  s: 6, // s - speed
  a: 0.2, /// a - acceleration (6/30)
  statusEffectX: getStatusEffectsBar.x + 15,
  statusEffectY: getStatusEffectsBar.y + 10,
};

export const getGunsStats = {
  singleAtkSpeed: 0, // 0 means no modifiers added to the gun at speed
};

export const getItemsStats = {
  medkitTier1: 25,
  atkSpeedTier1: 0.2, //higher values give more atk speed
};

export const getBuffsSpawnDelay = {
  medkit: 4.0,
  atkSpeed: 9.0,
};

export const getBuffsDuration = {
  atkSpeed: 10.0,
};

export const getPlayerDefaultStats = {
  damage: 10,
  health: 100,
  maxHealth: 100,
  rammingDmg: 0.1,
  atkSpeed: 0.15, //default was 0.2
  atkSpeedCap: 0.04,
};

export const getEnemyDefaultStats = {
  damage: 4,
  health: 100,
  maxHealth: 100,
  rammingDmg: 0.1,
  atkSpeed: 1.0,
  atkSpeedCap: 0.5,
  scorePoints: 25,
};

export const getBossDefaultStats = {
  damage: 4,
  health: 8000,
  maxHealth: 8000,
  rammingDmg: 0.1,
  atkSpeed: 0.6,
  atkSpeedCap: 0.3,
  scorePoints: 100,
};

// s - speed
export const getDefaultPlayerProjectile = {
  w: 10,
  h: 10,
  color: "#47FFFB",
  s: 20,
  isFill: true,
};
// s - speed
export const getDefaultEnemyProjectile = {
  w: 10,
  h: 10,
  color: colors.red,
  s: 5,
  isFill: true,
};

export function getObjectCenterPosition(object) {
  var centerPosition = {
    x: Math.floor(object.x + object.w / 2),
    y: Math.floor(object.y + object.h / 2),
  };
  return centerPosition;
}

export function getSingleGunPosition(object, projectileW) {
  //projectile width
  var centerPosition = {
    x: object.x + object.w / 2 - projectileW / 2,
    y: object.y + object.h / 2,
    // x: object.x + object.w / 2 - projectile.w / 2,
    // y: object.y + object.h / 2,
  };
  return centerPosition;
}

export function getDoubleGunPosition(object, projectileW) {
  var toReturn = [];

  var leftPosition = {
    x: object.x,
    y: object.y + object.h / 2,
  };

  var rightPosition = {
    x: object.x + object.w - projectileW,
    y: object.y + object.h / 2,
  };
  toReturn.push(leftPosition);
  toReturn.push(rightPosition);

  return toReturn;
}

export function getTripleGunPosition(object, projectileW) {
  var toReturn = [];

  var leftPosition = getDoubleGunPosition(object, projectileW)[0];
  var centerPosition = getSingleGunPosition(object, projectileW);
  var rightPosition = getDoubleGunPosition(object, projectileW)[1];

  toReturn.push(leftPosition);
  toReturn.push(centerPosition);
  toReturn.push(rightPosition);

  return toReturn;
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

  if (foo < chance) {
    return true;
  } else {
    return false;
  }
}

export function roundDecimalHundreds(decimal) {
  return Math.round((decimal + Number.EPSILON) * 100) / 100;
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomDecimal(min, max) {
  let randomDecimal = Math.random() * (max - min) + min;
  //randomDecimal = Math.round((randomDecimal + Number.EPSILON) * 100) / 100;
  randomDecimal = roundDecimalHundreds(randomDecimal);
  return randomDecimal;
}

export function getRandomDirection() {
  let randomDirectionIndex = getRandomInt(0, directions.length - 1);
  return directions[randomDirectionIndex];
}
