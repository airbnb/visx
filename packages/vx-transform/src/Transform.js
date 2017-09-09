import {
  decompose,
  identity,
  scale,
  transform,
  translate,
  applyToPoint,
  inverse,
  toString
} from 'transformation-matrix';

class Transform {
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

  decompose() {
    const { a, d, e, f } = this.matrix;
    return {
      scaleX: a,
      scaleY: d,
      translateX: e,
      translateY: f
    };
  }

  translate(translateX, translateY) {
    this.matrix = transform(this.matrix, translate(translateX, translateY));
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

export default Transform;
