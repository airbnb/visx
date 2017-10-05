import {
  decompose,
  identity,
  scale,
  transform,
  translate,
  applyToPoint,
  inverse,
  toString,
} from 'transformation-matrix';

export default class Transform {
  constructor(matrix) {
    this.matrix = matrix || identity();
  }

  scale(scaleX, scaleY) {
    this.matrix = transform(this.matrix, scale(scaleX, scaleY));
    return this;
  }

  getScale() {
    const { scaleX, scaleY } = this.decompose();
    return { scaleX, scaleY };
  }

  rescale(scale, invert) {
    const newDomain = scale
      .range()
      .map(invert.bind(this))
      .map(scale.invert);
    return scale.copy().domain(newDomain);
  }

  rescaleX(scale) {
    return this.rescale(scale, this.invertX);
  }

  rescaleY(scale) {
    return this.rescale(scale, this.invertY);
  }

  invert(x, y) {
    return [this.invertX(x), this.invertY(y)];
  }

  invertY(y) {
    const { translateY, scaleY } = this.decompose();
    return (y - translateY) / scaleY;
  }

  invertX(x) {
    const { translateX, scaleX } = this.decompose();
    return (x - translateX) / scaleX;
  }

  decompose() {
    const { a, d, e, f } = this.matrix;
    return {
      scaleX: a,
      scaleY: d,
      translateX: e,
      translateY: f,
    };
  }

  translate(translateX, translateY) {
    this.matrix = transform(
      this.matrix,
      translate(translateX, translateY),
    );
    return this;
  }

  getTranslate() {
    const { translateX, translateY } = this.decompose();
    return { translateX, translateY };
  }

  transformPoint(x, y) {
    return applyToPoint(inverse(this.matrix), { x, y });
  }

  toString() {
    return toString(this.matrix);
  }
}
