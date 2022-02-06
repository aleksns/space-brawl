/* < Player > */
export const getPlayerT445AngleGunProps = {
  projectileSpeed: 30,
  projectileAcceleration: 15,

  atkSpeed: 0.08,
  atkSpeedCap: 0.01,

  rateOfFire: 0.01,
  rateOfFireCap: 0.01,

  damage: 10,
  numOfRounds: 30,
  isLaser: false,
};

export const getPlayerT4SingleFrontGunProps = {
    projectileSpeed: 30,
    projectileAcceleration: 15,
  
    atkSpeed: 0.2,
    atkSpeedCap: 0.02,
  
    rateOfFire: 0.2,
    rateOfFireCap: 0.2,
  
    damage: 10,
    numOfRounds: 1,
    isLaser: false,
  };

  export const getPlayerLaserGunProps = {
    projectileSpeed: 0,
    projectileAcceleration: 0,
  
    atkSpeed: 1000.0,
    atkSpeedCap: 1000.0,
  
    rateOfFire: 1000.0,
    rateOfFireCap: 1000.0,
  
    damage: 3,
    numOfRounds: 1,
    isLaser: true,
  };  
/* < /Player > */

/* < Enemies > */
export const getEnemyT4GunProps = {
  projectileSpeed: 15,
  projectileAcceleration: 5,

  atkSpeed: 1.0,
  atkSpeedCap: 0.5,

  rateOfFire: 1.0,
  rateOfFireCap: 1.0,

  damage: 3,
  numOfRounds: 1,
  isLaser: false,
};
/* < /Enemies > */

/* < Boss > */
export const getBossT4TripleBurstGunProps = {
  projectileSpeed: 15,
  projectileAcceleration: 5,

  atkSpeed: 0.7,
  atkSpeedCap: 0.2,

  rateOfFire: 0.03,
  rateOfFireCap: 0.03,

  damage: 1,
  numOfRounds: 10,
  isLaser: false,
};

/* < /Boss >*/
