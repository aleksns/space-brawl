export default class ShieldOrb {
  constructor(game, owner) {
    this.game = game;
    this.owner = owner;

    this.brightness = 100;
    this.brightnessModifier = 2;
    this.brightnessMin = 60;
    this.brightnessMax = 130;
    this.offStep = 25;

    this.props = {
      x: this.owner.x - this.offStep,
      y: this.owner.y - this.offStep,
      w: this.owner.w + this.offStep * 2,
      h: this.owner.h + this.offStep * 2,
      filter: `brightness(${this.brightness}%)`,
      image: undefined,
      opacity: 1.0,
      opacityMax: 1.0
    };
    this.props.image = this.game.media.shieldOrbImg;
  }

  reset() {
    this.brightness = 100;
    this.brightnessModifier = 2;
    this.props.opacity = 1.0;
    this.filter = `brightness(${this.brightness}%)`;
  }

  update() {
    // this.props.image = this.game.animations.propsAnimation.image;

    this.props.x = this.owner.x - this.offStep;
    this.props.y = this.owner.y - this.offStep;
    this.props.w = this.owner.w + this.offStep * 2;
    this.props.h = this.owner.h + this.offStep * 2;

    this.updatePropsFilter();
  }

  updatePropsFilter() {
    this.brightness += this.brightnessModifier;

    if (
      this.brightness >= this.brightnessMax ||
      this.brightness < this.brightnessMin
    ) {
      this.brightnessModifier = -this.brightnessModifier;
    }

    this.props.filter = `brightness(${this.brightness}%)`;
  }

  setOpacity(value) {
      this.props.opacity = value;
  }
}
