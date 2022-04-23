export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;
export const font = "audiowide";
//export const GAME_WIDTH = 1536;
//export const GAME_HEIGHT = 734;

export function getPlayerT1Dimension() {
  let dimension = {
    w: GAME_HEIGHT / 4,
    h: GAME_HEIGHT / 6.5,
  };
  return dimension;
}

export function getPlayerT2Dimension() {
  let dimension = {
    w: GAME_HEIGHT / 4.5,
    h: GAME_HEIGHT / 7,
  };
  return dimension;
}

export function getPlayerT3Dimension() {
  let dimension = {
    // w: GAME_WIDTH / 12,
    // h: GAME_HEIGHT / 9,
    w: GAME_HEIGHT / 6,
    h: GAME_HEIGHT / 8,
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

export function getEnemyT2Dimension() {
  let dimension = {
    w: GAME_WIDTH / 4.5,
    h: GAME_HEIGHT / 4.5,
  };
  return dimension;
}

export function getEnemyT3Dimension() {
  let dimension = {
    w: GAME_WIDTH / 7,
    h: GAME_HEIGHT / 7,
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
    h: GAME_HEIGHT / 7,
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
  uiOrangeDark: "#db6a00",
  uiOrangeLight: "#ffc94b",
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
  x: GAME_WIDTH - 400,
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

export const getBuffsSpawnDelay = {
  medkit: 4.0,
  atkSpeed: 8.0,   ///9.0
};

export const getPlayerDefaultStats = {
  health: 200,
  maxHealth: 200,
  speed: 25,   //25
  accelerationMod: 10,
  rammingDmg: 0.1,
};

export const getEnemyT0DefaultStats = {
  damage: 4,
  health: 7500,
  maxHealth: 7500,
  speed: 1.6,
  accelerationMod: 60,
  rammingDmg: 1,
  scorePoints: 1000,
};

export const getEnemyT2DefaultStats = {
  damage: 4,
  health: 2000,
  maxHealth: 2000,
  speed: 2,
  accelerationMod: 20,
  rammingDmg: 0.1,
  scorePoints: 250,
};

export const getEnemyT3DefaultStats = {
  damage: 3,
  health: 350,
  maxHealth: 350,
  speed: 1,
  accelerationMod: 10,
  rammingDmg: 0.1,
  scorePoints: 50,
};

export const getEnemyT4DefaultStats = {
  damage: 4,
  health: 100,
  maxHealth: 100,
  speed: 2,
  accelerationMod: 20,
  rammingDmg: 0.1,
  scorePoints: 25,
};

export const getEnemyT5DefaultStats = {
  damage: 3,
  health: 50,
  maxHealth: 50,
  speed: 1,
  accelerationMod: 30,
  rammingDmg: 0.1,
  scorePoints: 20,
};

export const getDefaultPlayerProjectile = {
  w: 20,
  h: 20,
  color: "#47FFFB",
  isFill: true,
};

export const getBigPlayerProjectile = {
  w: 30,
  h: 30,
  color: "#47FFFB",
  isFill: true,
};

export const getDefaultEnemyProjectile = {
  w: 20,
  h: 20,
  color: colors.red,
  isFill: true,
};

export const getBigEnemyProjectile = {
  w: 35,
  h: 35,
  color: colors.red,
  isFill: true,
};

export const getVeryBigEnemyProjectile = {
  w: 45,
  h: 45,
  color: colors.red,
  isFill: true,
};

export const getPlayerLaser = {
  w: 40,
  h: GAME_HEIGHT,
  color: "#47FFFB",
  isFill: true,
};

export const getEnemyLaser = {
  w: 20,
  h: 20,
  color: colors.red,
  isFill: true,
};

export function centerSingleGunWithProjectile(gun, projectileW) {
  var centeredGunPos = {
    x: gun.x + gun.w / 2 - projectileW / 2,
    y: gun.y + gun.h / 2,
  };
  return centeredGunPos;
}

export function getSingleGunPosition(gun, projectileW) {
    var centerPosition = {
    x: centerSingleGunWithProjectile(gun, projectileW).x,
    y: centerSingleGunWithProjectile(gun, projectileW).y,
  };

  return centerPosition;
}

export function getDoubleGunPosition(gun, projectileW) {
  var toReturn = [];

  var leftPosition = {
    x: gun.x,
    y: gun.y + gun.h / 2,
  };

  var rightPosition = {
    x: gun.x + gun.w - projectileW,
    y: gun.y + gun.h / 2,
  };
  toReturn.push(leftPosition);
  toReturn.push(rightPosition);

  return toReturn;
}

export function getTripleGunPosition(gun, projectileW) {
  var toReturn = [];

  var leftPosition = getDoubleGunPosition(gun, projectileW)[0];
  var centerPosition = getSingleGunPosition(gun, projectileW);
  var rightPosition = getDoubleGunPosition(gun, projectileW)[1];

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
  let foo = roundDecimalHundreds(Math.random());
  if (foo < chance) {
    return true;
  } else {
    return false;
  }
}

export function roundDecimalHundreds(decimal) {
  return Math.round((decimal + Number.EPSILON) * 100) / 100;
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomDecimal(min, max) {
  let randomDecimal = Math.random() * (max - min + 0.01) + min;
  randomDecimal = roundDecimalHundreds(randomDecimal);
  return randomDecimal;
}

// north, east, south, and west, northeast (NE), southeast (SE), southwest (SW), and northwest (NW).
export const directions = ["N", "E", "S", "W", "NE", "SE", "SW", "NW"];

export function getRandomDirection() {
  let randomDirectionIndex = getRandomIntInclusive(0, directions.length);
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
