export const aimFrontPlayer = -360;
export const aimFrontEnemy = 0;

/* < Player > */
export const getPlayerT4SingleFront = {
  projectileSpeed: 30,
  projectileAcceleration: 15,

  atkSpeed: 0.2,
  rateOfFire: 0.2,

  isRotating: false,
  angle: aimFrontPlayer,
  angleModifier: 0,
  angleMin: aimFrontPlayer,
  angleMax: 0,

  damage: 10,
  numOfRounds: 1,
  isLaserGun: false,
};

export const getPlayerT4DoubleFront = {
  projectileSpeed: 30,
  projectileAcceleration: 15,

  atkSpeed: 0.15,
  rateOfFire: 0.15,

  isRotating: false,
  angle: aimFrontPlayer,
  angleModifier: 0,
  angleMin: aimFrontPlayer,
  angleMax: 0,

  damage: 10,
  numOfRounds: 1,
  isLaserGun: false,
};

export const getPlayerT4TripleFront = {
  projectileSpeed: 30,
  projectileAcceleration: 15,

  atkSpeed: 0.15,
  rateOfFire: 0.15,

  isRotating: false,
  angle: aimFrontPlayer,
  angleModifier: 0,
  angleMin: aimFrontPlayer,
  angleMax: 0,

  damage: 10,
  numOfRounds: 1,
  isLaserGun: false,
};

export const getPlayerT4Double45AngleStationary = {
  projectileSpeed: 30,
  projectileAcceleration: 15,

  atkSpeed: 0.1,
  rateOfFire: 0.1,

  isRotating: false,
  angle: -255,
  angleModifier: 0,
  angleMin: -255,
  angleMax: 0,

  damage: 10,
  numOfRounds: 1,
  isLaserGun: false,
};

export const getPlayerT4Rotating = {
  projectileSpeed: 30,
  projectileAcceleration: 15,

  atkSpeed: 0.05,
  rateOfFire: 0.01,

  isRotating: true,
  angle: -360,
  angleModifier: 3,
  angleMin: -360,
  angleMax: 0,

  damage: 10,
  numOfRounds: 1,
  isLaserGun: false,
};

  export const getPlayerLaserGun = {
    projectileSpeed: 0,
    projectileAcceleration: 0,
  
    atkSpeed: 1000.0,
    rateOfFire: 1000.0,

    isRotating: false,
    angle: aimFrontPlayer,
    angleModifier: 0,
    angleMin: aimFrontPlayer,
    angleMax: 0,
  
    damage: 3,
    numOfRounds: 1,
    isLaserGun: true,
  };  
/* < /Player > */

/* < Enemies > */
export const getEnemyT4GunProps = {
  projectileSpeed: 15,
  projectileAcceleration: 5,

  atkSpeed: 1.0,
  rateOfFire: 1.0,

  damage: 3,
  numOfRounds: 1,
  isLaserGun: false,
};
/* < /Enemies > */

/* < Boss > */
export const getBossT4TripleTarget = {
  projectileSpeed: 8,
  projectileAcceleration: 4,

  atkSpeed: 1.5,
  rateOfFire: 0.5,

  isRotating: false,
  angle: 0,
  angleModifier: 0,
  angleMin: 0,
  angleMax: 0,

  damage: 3,
  numOfRounds: 5,
  isLaserGun: false,
};

export const getBossT4TripleBurst = {
  projectileSpeed: 9,
  projectileAcceleration: 4,

  atkSpeed: 2.5,
  rateOfFire: 0.1,

  isRotating: false,
  angle: 0,
  angleModifier: 0,
  angleMin: 0,
  angleMax: 0,

  damage: 1,
  numOfRounds: 10,
  isLaserGun: false,
};

export const getBossDoubleBurstCenteredGun = {
  projectileSpeed: 4,
  projectileAcceleration: 2,

  atkSpeed: 8.0,
  rateOfFire: 0.1,

  isRotating: false,
  angle: 90,
  angleModifier: 0,
  angleMin: 0,
  angleMax: 0,

  damage: 1,
  numOfRounds: 20,
  isLaserGun: false,
};

export const getBossT4DoubleSpray = {
  projectileSpeed: 4,
  projectileAcceleration: 2,

  atkSpeed: 1.5,
  rateOfFire: 0.1,

  isRotating: true,
  angle: 0,
  angleModifier: -5,
  angleMin: -150,
  angleMax: 50,

  damage: 1,
  numOfRounds: 50,
  isLaserGun: false,
};

/* < /Boss >*/
