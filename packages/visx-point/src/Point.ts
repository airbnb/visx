export default class Point {
  public x: number = 0;
  public y: number = 0;

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
