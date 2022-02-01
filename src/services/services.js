export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;
//export const GAME_WIDTH = 1536;
//export const GAME_HEIGHT = 734;

export function getPlayerT0Dimension() {
  let dimension = {
    w: GAME_WIDTH / 12,
    h: GAME_HEIGHT / 9,
  };
  return dimension;
}

export function getEnemyT0Dimension() {
  let dimension = {
    w: GAME_WIDTH / 2,
    h: GAME_HEIGHT / 3,
  };
  return dimension;
}

export function getEnemyT4Dimension() {
  let dimension = {
    w: GAME_WIDTH / 9,
    h: GAME_HEIGHT / 9,
  };
  return dimension;
}

export function getEnemyT5Dimension() {
  let dimension = {
    w: GAME_WIDTH / 16,
    h: GAME_HEIGHT / 8,
  };
  return dimension;
}

export const colors = {
  green: "#00FF2D",
  yellow: "#FFAD00",
  red: "#FF0000",
  blue: "#2F60FF",
  hitRegColor: "#ffffff",
  scoreColor: "#8BE0FF",
  uiOrange: "#FFAA00",
  uiBlue: "#3498DB",
  uiBlueDark: "#000657",
  uiBlueDarkLighter: "#1a2298",
  uiGreen: "#2ECC71",
  uiRed: "#CB4335",
  uiRedDark: "#C0392B",
  uiPurple: "#7700ff",
  uiPurpleDark: "#4d00a5",
  uiGrey: "#3B3B3B",
  projectileYellow: "#FFEB00",
  projectileYellowDark: "#FFD000",
  projectileRed: "#FF1800",
  projectileRedDark: "#CF1300",
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

export const itemBuffProps = {
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
  atkSpeed: 7.0,   ///9.0
};

export const getBuffsDuration = {
  atkSpeed: 10.0,
  slow: 4.0,
};

export const getPlayerDefaultStats = {
  damage: 10,
  health: 100,
  maxHealth: 100,
  speed: 25,   //25
  accelerationMod: 10,
  rammingDmg: 0.1,
  atkSpeed: 0.15, //default was 0.2 -> 0.15
  atkSpeedCap: 0.04,
  projectileSpeedModifier: 20.0, //20
};

export const getEnemyT0DefaultStats = {
  damage: 4,
  health: 1000,
  maxHealth: 1000,
  speed: 2,
  accelerationMod: 60,
  rammingDmg: 0.1,
  atkSpeed: 0.6,
  atkSpeedCap: 0.3,
  projectileSpeedModifier: 6.5,
  scorePoints: 500,
};

export const getEnemyT4DefaultStats = {
  damage: 4,
  health: 100,
  maxHealth: 100,
  speed: 4,
  accelerationMod: 40,
  rammingDmg: 0.1,
  atkSpeed: 1.0,   //1.0
  atkSpeedCap: 0.5,
  projectileSpeedModifier: 5.0,
  scorePoints: 25,
};

export const getEnemyT5DefaultStats = {
  damage: 3,
  health: 75,
  maxHealth: 75,
  speed: 1,
  accelerationMod: 60,
  rammingDmg: 0.1,
  atkSpeed: 2.5,
  atkSpeedCap: 1.5,
  projectileSpeedModifier: 6.5,
  scorePoints: 15,
};

// s - speed
export const getDefaultPlayerProjectile = {
  w: 20,
  h: 20,
  color: "#47FFFB",
  isFill: true,
};
// s - speed
export const getDefaultEnemyProjectile = {
  w: 20,
  h: 20,
  color: colors.red,
  isFill: true,
};

export function getSingleGunPosition(object, projectileW) {
  //projectile width
  var toReturn = [];

  var centerPosition = {
    x: object.x + object.w / 2 - projectileW / 2,
    y: object.y + object.h / 2,
  };
  toReturn.push(centerPosition);
  return toReturn;
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
  var centerPosition = getSingleGunPosition(object, projectileW)[0];
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

// north, east, south, and west, northeast (NE), southeast (SE), southwest (SW), and northwest (NW).
export const directions = ["N", "E", "S", "W", "NE", "SE", "SW", "NW"];

export function getRandomDirection() {
  let randomDirectionIndex = getRandomInt(0, directions.length);
  return directions[randomDirectionIndex];
}

export function getDeadZoneDimensionForObject(object) {
  let deadDimension = {
    x0: 0 - object.w,
    x1: GAME_WIDTH + object.w,
    y0: 0 - object.h,
    y1: GAME_HEIGHT + object.h,
  };
  return deadDimension;
}
