export default class Point {
  constructor({ x = 0, y = 0 }) {
    this.x = x;
    this.y = y;
  }

  value() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  toArray() {
    return [this.x, this.y];
  }
}
