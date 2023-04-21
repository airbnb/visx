var Point = /*#__PURE__*/function () {
  function Point(_ref) {
    var _ref$x = _ref.x,
      x = _ref$x === void 0 ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === void 0 ? 0 : _ref$y;
    this.x = 0;
    this.y = 0;
    this.x = x;
    this.y = y;
  }
  var _proto = Point.prototype;
  _proto.value = function value() {
    return {
      x: this.x,
      y: this.y
    };
  };
  _proto.toArray = function toArray() {
    return [this.x, this.y];
  };
  return Point;
}();
export { Point as default };