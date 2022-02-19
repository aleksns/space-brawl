/* Barrage props */

/*90 angle,  directions -   _\|   */
//--------------
//angle: 270,
//angleModifier: -10,
//angleMin: 180,
//angleMax: 270,
//--------------

/**90 angle,  directions -   |/_   */
//--------------
//angle: 180,
//angleModifier: -10,
//angleMin: 90,
//angleMax: 180,
//--------------

/*90 angle,  directions -   ‾/|   */
//--------------
//angle: 360,
//angleModifier: -10,
//angleMin: 270,
//angleMax: 360,
//--------------

/**90 angle,  directions -   |\‾   */
//--------------
//angle: 180,
//angleModifier: -10,
//angleMin: 90,
//angleMax: 180,
//--------------

/*180 angle,  directions -  _\|/_ */
//--------------
//angle: 270,
//angleModifier: -10,
//angleMin: 90,
//angleMax: 270,
//--------------

/*180 angle,  directions -  ‾/|\‾ */
//--------------
//angle: 270,
//angleModifier: 10,
//angleMin: 90,
//angleMax: 270,
//--------------
/* < Player > */
export const playerGunsDamageProps = {
  laserT1: 14,
  laserT2: 7,
  laserT3: 3,
  default: 10,
  barrage: 10,
  rotating: 7,
}
export const getPlayerSingleFront = {
  projectileSpeed: 10, ///25
  projectileAcceleration: 3, //12

  atkSpeed: 1.1,
  rateOfFire: 0.1,

  isRotating: false,
  isBarrage: false,
  angle: 180,
  angleModifier: 0,
  angleMin: 0,
  angleMax: 180, 

  numOfRoundsBurst: 3, ///
  isLaserGun: false,
};

export const getPlayerDoubleFront = {
  projectileSpeed: 10,
  projectileAcceleration: 2,

  atkSpeed: 0.3,
  rateOfFire: 0.3,

  isRotating: false,
  isBarrage: false,
  angle: 180,
  angleModifier: 0,
  angleMin: 0,
  angleMax: 0,

  numOfRoundsBurst: 1,
  isLaserGun: false,
};

export const getPlayerTripleFront = {
  projectileSpeed: 10,
  projectileAcceleration: 2,

  atkSpeed: 0.3,
  rateOfFire: 0.3,

  isRotating: false,
  isBarrage: false,
  angle: 180,
  angleModifier: 0,
  angleMin: 0,
  angleMax: 0,

  numOfRoundsBurst: 1,
  isLaserGun: false,
};

export const getPlayerBarrage360Angle = {
  projectileSpeed: 8, ///25
  projectileAcceleration: 2, //12

  atkSpeed: 2.1,
  rateOfFire: 0.1,

  isRotating: false,
  isBarrage: true,
  angle: 360,
  angleModifier: -10,
  angleMin: 0, 
  angleMax: 360,

  numOfRoundsBurst: 5, ///
  isLaserGun: false,
};

export const getPlayerBarrage180Angle = {
  projectileSpeed: 8, ///25
  projectileAcceleration: 2, //12

  atkSpeed: 2.1,
  rateOfFire: 0.1,

  isRotating: false,
  isBarrage: true,

  // ‾/|\‾
  angle: 270,
  angleModifier: 10,
  angleMin: 90,
  angleMax: 270, 

  numOfRoundsBurst: 2, ///
  isLaserGun: false,
};

export const getPlayerBarrageLeft90Angle = {
  projectileSpeed: 8, ///25
  projectileAcceleration: 2, //12

  atkSpeed: 2.1,
  rateOfFire: 0.1,

  isRotating: false,
  isBarrage: true,
  angle: 270,
  angleModifier: -10,
  angleMin: 180,
  angleMax: 270,

  numOfRoundsBurst: 2, ///
  isLaserGun: false,
};

export const getPlayerRotating = {
  projectileSpeed: 7,
  projectileAcceleration: 3,

  atkSpeed: 0.02,
  rateOfFire: 0.01,

  isRotating: true,
  isBarrage: false,
  angle: 360,
  angleModifier: -1,
  angleMin: 180,
  angleMax: 360,

  numOfRoundsBurst: 1,
  isLaserGun: false,
};

export const getPlayerT1LaserGun = {
  projectileSpeed: 0,
  projectileAcceleration: 0,

  atkSpeed: 1000.0,
  rateOfFire: 1000.0,

  isRotating: false,
  isBarrage: false,
  angle: -360,
  angleModifier: 0,
  angleMin: -360,
  angleMax: 0,

  numOfRoundsBurst: 1,
  isLaserGun: true,
};

export const getPlayerT2LaserGun = {
  projectileSpeed: 0,
  projectileAcceleration: 0,

  atkSpeed: 1000.0,
  rateOfFire: 1000.0,

  isRotating: false,
  isBarrage: false,
  angle: -360,
  angleModifier: 0,
  angleMin: -360,
  angleMax: 0,

  numOfRoundsBurst: 1,
  isLaserGun: true,
};

export const getPlayerT3LaserGun = {
  projectileSpeed: 0,
  projectileAcceleration: 0,

  atkSpeed: 1000.0,
  rateOfFire: 1000.0,

  isRotating: false,
  isBarrage: false,
  isBarrage: false,
  angle: 0,
  angleModifier: 0,
  angleMin: 0,
  angleMax: 0,

  numOfRoundsBurst: 1,
  isLaserGun: true,
};
/* < /Player > */

/* < Enemies > */
export const enemyGunsDamageProps = {
  t4Target: 4,
  t5Front: 3,
  t3Barrage: 2,
  t3Target: 4,
  t0Target: 3,
  t0Burst: 2,
  t0Rotating: 3,
  t0Barrage: 3
}

export const getT5Front = {
  projectileSpeed: 6,
  projectileAcceleration: 1,

  atkSpeed: 2.0,
  rateOfFire: 2.0,

  isRotating: false,
  isBarrage: false,
  angle: 0,
  angleModifier: 0,
  angleMin: 0,
  angleMax: 0,

  numOfRoundsBurst: 1,
  isLaserGun: false,
};

export const getT4Target = {
  projectileSpeed: 5,
  projectileAcceleration: 3,

  atkSpeed: 2.0,
  rateOfFire: 2.0,

  isRotating: false,
  isBarrage: false,
  isBarrage: false,
  angle: 0,
  angleModifier: 0,
  angleMin: 0,
  angleMax: 0,

  numOfRoundsBurst: 1,
  isLaserGun: false,
};

export const getT3Target = {
  projectileSpeed: 8,
  projectileAcceleration: 4,

  atkSpeed: 1.5,
  rateOfFire: 0.5,

  isRotating: false,
  isBarrage: false,
  angle: 0,
  angleModifier: 0,
  angleMin: 0,
  angleMax: 0,

  numOfRoundsBurst: 5,
  isLaserGun: false,
};

export const getT3Barrage = {
  projectileSpeed: 12,
  projectileAcceleration: 4,

  atkSpeed: 2.5,
  rateOfFire: 0.5,

  isRotating: false,
  isBarrage: false,
  angle: 0,
  angleModifier: 0,
  angleMin: 0,
  angleMax: 0,

  numOfRoundsBurst: 2,
  isLaserGun: false,
};
/* < /Enemies > */

/* < Boss > */
export const getT0Target = {
  projectileSpeed: 8,
  projectileAcceleration: 4,

  atkSpeed: 1.5,
  rateOfFire: 0.5,

  isRotating: false,
  isBarrage: false,
  angle: 0,
  angleModifier: 0,
  angleMin: 0,
  angleMax: 0,

  numOfRoundsBurst: 5,
  isLaserGun: false,
};

export const getT0Burst = {
  projectileSpeed: 9,
  projectileAcceleration: 4,

  atkSpeed: 2.5,
  rateOfFire: 0.1,

  isRotating: false,
  isBarrage: false,
  angle: 0,
  angleModifier: 0,
  angleMin: 0,
  angleMax: 0,

  numOfRoundsBurst: 10,
  isLaserGun: false,
};

export const getT0BurstCentered = {
  projectileSpeed: 4,
  projectileAcceleration: 2,

  atkSpeed: 8.0,
  rateOfFire: 0.1,

  isRotating: false,
  isBarrage: false,
  angle: 90,
  angleModifier: 0,
  angleMin: 0,
  angleMax: 0,

  numOfRoundsBurst: 20,
  isLaserGun: false,
};

export const getT0Rotating = {
  projectileSpeed: 4,
  projectileAcceleration: 3,

  atkSpeed: 0.2,
  rateOfFire: 0.2,

  isRotating: true,
  isBarrage: false,
  angle: 360,
  angleModifier: -3,
  angleMin: 0,
  angleMax: 360,

  numOfRoundsBurst: 1,
  isLaserGun: false,
};

export const getT0BarrageSouth180Angle = {
  projectileSpeed: 6, ///25
  projectileAcceleration: 4, //12

  atkSpeed: 2.1,
  rateOfFire: 0.1,

  isRotating: false,
  isBarrage: true,

  //‾/|\‾
  angle: 270,
  angleModifier: 10,
  angleMin: 90,
  angleMax: 270,

  numOfRoundsBurst: 1,
  isLaserGun: false,
};

/* < /Boss >*/
