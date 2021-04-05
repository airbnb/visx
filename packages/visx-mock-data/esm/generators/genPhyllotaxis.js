export default function genPhyllotaxis(_ref) {
  var radius = _ref.radius,
      width = _ref.width,
      height = _ref.height;
  var theta = Math.PI * (3 - Math.sqrt(5));
  return function (idx) {
    var r = radius * Math.sqrt(idx);
    var a = theta * idx;
    return {
      x: width / 2 + r * Math.cos(a),
      y: height / 2 + r * Math.sin(a)
    };
  };
}