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

/* Negative angleModifier for south related barrage only (with 360-0 angle mark)*/


/* < Player > */

export const playerGunsDamageProps = {
  laserT1: 15,
  laserT2: 9,
  laserT3: 4,
  default: 10,
  barrage: 10,
  rotating: 7,
}

export const getPlayerSingleDefault = {
  projectileSpeed: 10, ///25
  projectileAcceleration: 3, //12

  atkSpeed: 0.4,
  rateOfFire: 0.1,

  isRotating: false,
  isBarrage: false,
  angle: 180,
  angleModifier: 0,
  angleMin: 0,
  angleMax: 180, 

  numOfRoundsBurst: 1, ///
  isLaserGun: false,
};

export const getPlayerDoubleDefault = {
  projectileSpeed: 10, ///25
  projectileAcceleration: 3, //12

  atkSpeed: 0.38,
  rateOfFire: 0.1,

  isRotating: false,
  isBarrage: false,
  angle: 180,
  angleModifier: 0,
  angleMin: 0,
  angleMax: 180, 

  numOfRoundsBurst: 2, ///
  isLaserGun: false,
};

export const getPlayerTripleDefault = {
  projectileSpeed: 10, ///25
  projectileAcceleration: 3, //12

  atkSpeed: 0.36,
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

export const getPlayerBarrage40Angle = {
  projectileSpeed: 11,
  projectileAcceleration: 2,

  atkSpeed: 2.1,
  rateOfFire: 0.1,

  isRotating: false,
  isBarrage: true,

  angle: 200,
  angleModifier: -10,
  angleMin: 160,
  angleMax: 200, 

  numOfRoundsBurst: 1,
  isLaserGun: false,
};

export const getPlayerBarrage80Angle = {
  projectileSpeed: 12,
  projectileAcceleration: 3,

  atkSpeed: 2.1,
  rateOfFire: 0.1,

  isRotating: false,
  isBarrage: true,

  angle: 220,
  angleModifier: -10,
  angleMin: 140,
  angleMax: 220, 

  numOfRoundsBurst: 2,
  isLaserGun: false,
};

export const getPlayerBarrage120Angle = {
  projectileSpeed: 13,
  projectileAcceleration: 4,

  atkSpeed: 2.1,
  rateOfFire: 0.1,

  isRotating: false,
  isBarrage: true,

  angle: 240,
  angleModifier: -10,
  angleMin: 120,
  angleMax: 240, 

  numOfRoundsBurst: 3,
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
  t5Front: 3,
  t4Target: 3,
  t3Burst: 3,
  t2Barrage: 3,
  t2Target: 4,
  t0Target: 4,
  t0Burst: 3,
  t0Rotating: 3,
  t0Barrage: 3
}

export const getT5Front = {
  projectileSpeed: 6,
  projectileAcceleration: 1,

  atkSpeed: 1.5,
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

  atkSpeed: 1.2,
  rateOfFire: 2.0,

  isRotating: false,
  isBarrage: false,
  isBarrage: false,
  angle: 0,
  angleModifier: 0,
  angleMin: 0,
  angleMax: 0,

  numOfRoundsBurst: 2,
  isLaserGun: false,
};

export const getT3TargetBurst = {
  projectileSpeed: 5,
  projectileAcceleration: 3,

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

export const getT2Target = {
  projectileSpeed: 6,
  projectileAcceleration: 3,

  atkSpeed: 1.5,
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

export const getT2Barrage = {
  projectileSpeed: 5,
  projectileAcceleration: 3,

  atkSpeed: 3.5,  //4.5
  rateOfFire: 0.4,  //0.6

  isRotating: false,
  isBarrage: true,
  angle: 360,
  angleModifier: -20,
  angleMin: 0,
  angleMax: 360,

  numOfRoundsBurst: 3,
  isLaserGun: false,
};
/* < /Enemies > */

/* < Boss > */
export const getT0Target = {
  projectileSpeed: 5,
  projectileAcceleration: 2,

  atkSpeed: 1.8,
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

export const getT0Burst = {
  projectileSpeed: 9,
  projectileAcceleration: 4,

  atkSpeed: 3.5,
  rateOfFire: 0.1,

  isRotating: false,
  isBarrage: false,
  angle: 0,
  angleModifier: 0,
  angleMin: 0,
  angleMax: 0,

  numOfRoundsBurst: 8,
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

export const getT0Barrage360 = {
  projectileSpeed: 3,
  projectileAcceleration: 2,

  atkSpeed: 2.5,
  rateOfFire: 0.8,

  isRotating: false,
  isBarrage: true,

  //‾/|\‾
  angle: 360,
  angleModifier: -20,
  angleMin: 0,
  angleMax: 360,

  numOfRoundsBurst: 2,
  isLaserGun: false,
};

/* < /Boss >*/
