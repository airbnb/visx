import Point from '@vx/point/build/Point';

export default class ZoomTransform {
  constructor({ k = 1, x = 0, y = 0 }) {
    this.k = k;
    this.x = x;
    this.y = y;
  }

  scale(k) {
    return new ZoomTransform({
      k: this.k * k,
      x: this.x,
      y: this.y,
    });
  }

  translate({ x, y }) {
    return new ZoomTransform({
      k: this.k,
      x: this.x + this.k * x,
      y: this.y + this.k * y,
    });
  }

  apply({ x, y }) {
    return new Point({ x: this.applyX(x), y: this.applyY(y) });
  }

  applyX(x) {
    return x * this.k + this.x;
  }

  applyY(y) {
    return y * this.k + this.y;
  }

  invert({ x, y }) {
    return new Point({ x: this.invertX(x), y: this.invertY(y) });
  }

  invertX(x) {
    return (x - this.x) / this.k;
  }

  invertY(y) {
    return (y - this.y) / this.k;
  }

  toString() {
    return `translate(${this.x}, ${this.y}) scale(${this.k})`;
  }
}
