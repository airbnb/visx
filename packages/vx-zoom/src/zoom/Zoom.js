import zoomIdentity from '../util/zoomIdenity';

class Zoom {
  constructor({ transform, extent }) {
    this.transform = transform || zoomIdenity;
    this.extent = extent || [0, Infinity];
  }

  constrain(transform, extent) {
    const e = extent || this.extent;
  }

  scaleBy(k) {
    this.transform.scale(k);
  }

  toString() {
    return `${this.transform}`;
  }
}
