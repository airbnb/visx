"use strict";

exports.__esModule = true;
exports.arc = arc;
exports.area = area;
exports.line = line;
exports.pie = pie;
exports.radialLine = radialLine;
exports.stack = stack;

var _d3Shape = require("d3-shape");

var _setNumberOrNumberAccessor = _interopRequireDefault(require("./setNumberOrNumberAccessor"));

var _stackOrder = _interopRequireDefault(require("./stackOrder"));

var _stackOffset = _interopRequireDefault(require("./stackOffset"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function arc(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      innerRadius = _ref.innerRadius,
      outerRadius = _ref.outerRadius,
      cornerRadius = _ref.cornerRadius,
      startAngle = _ref.startAngle,
      endAngle = _ref.endAngle,
      padAngle = _ref.padAngle,
      padRadius = _ref.padRadius;

  var path = (0, _d3Shape.arc)();
  if (innerRadius != null) (0, _setNumberOrNumberAccessor.default)(path.innerRadius, innerRadius);
  if (outerRadius != null) (0, _setNumberOrNumberAccessor.default)(path.outerRadius, outerRadius);
  if (cornerRadius != null) (0, _setNumberOrNumberAccessor.default)(path.cornerRadius, cornerRadius);
  if (startAngle != null) (0, _setNumberOrNumberAccessor.default)(path.startAngle, startAngle);
  if (endAngle != null) (0, _setNumberOrNumberAccessor.default)(path.endAngle, endAngle);
  if (padAngle != null) (0, _setNumberOrNumberAccessor.default)(path.padAngle, padAngle);
  if (padRadius != null) (0, _setNumberOrNumberAccessor.default)(path.padRadius, padRadius);
  return path;
}

function area(_temp2) {
  var _ref2 = _temp2 === void 0 ? {} : _temp2,
      x = _ref2.x,
      x0 = _ref2.x0,
      x1 = _ref2.x1,
      y = _ref2.y,
      y0 = _ref2.y0,
      y1 = _ref2.y1,
      defined = _ref2.defined,
      curve = _ref2.curve;

  var path = (0, _d3Shape.area)();
  if (x) (0, _setNumberOrNumberAccessor.default)(path.x, x);
  if (x0) (0, _setNumberOrNumberAccessor.default)(path.x0, x0);
  if (x1) (0, _setNumberOrNumberAccessor.default)(path.x1, x1);
  if (y) (0, _setNumberOrNumberAccessor.default)(path.y, y);
  if (y0) (0, _setNumberOrNumberAccessor.default)(path.y0, y0);
  if (y1) (0, _setNumberOrNumberAccessor.default)(path.y1, y1);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  return path;
}

function line(_temp3) {
  var _ref3 = _temp3 === void 0 ? {} : _temp3,
      x = _ref3.x,
      y = _ref3.y,
      defined = _ref3.defined,
      curve = _ref3.curve;

  var path = (0, _d3Shape.line)();
  if (x) (0, _setNumberOrNumberAccessor.default)(path.x, x);
  if (y) (0, _setNumberOrNumberAccessor.default)(path.y, y);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  return path;
}

function pie(_temp4) {
  var _ref4 = _temp4 === void 0 ? {} : _temp4,
      startAngle = _ref4.startAngle,
      endAngle = _ref4.endAngle,
      padAngle = _ref4.padAngle,
      value = _ref4.value,
      sort = _ref4.sort,
      sortValues = _ref4.sortValues;

  var path = (0, _d3Shape.pie)(); // ts can't distinguish between these method overloads

  if (sort === null) path.sort(sort);else if (sort != null) path.sort(sort);
  if (sortValues === null) path.sortValues(sortValues);else if (sortValues != null) path.sortValues(sortValues);
  if (value != null) path.value(value);
  if (padAngle != null) (0, _setNumberOrNumberAccessor.default)(path.padAngle, padAngle);
  if (startAngle != null) (0, _setNumberOrNumberAccessor.default)(path.startAngle, startAngle);
  if (endAngle != null) (0, _setNumberOrNumberAccessor.default)(path.endAngle, endAngle);
  return path;
}

function radialLine(_temp5) {
  var _ref5 = _temp5 === void 0 ? {} : _temp5,
      angle = _ref5.angle,
      radius = _ref5.radius,
      defined = _ref5.defined,
      curve = _ref5.curve;

  var path = (0, _d3Shape.radialLine)();
  if (angle) (0, _setNumberOrNumberAccessor.default)(path.angle, angle);
  if (radius) (0, _setNumberOrNumberAccessor.default)(path.radius, radius);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  return path;
}

function stack(_ref6) {
  var keys = _ref6.keys,
      value = _ref6.value,
      order = _ref6.order,
      offset = _ref6.offset;
  var path = (0, _d3Shape.stack)();
  if (keys) path.keys(keys);
  if (value) (0, _setNumberOrNumberAccessor.default)(path.value, value);
  if (order) path.order((0, _stackOrder.default)(order));
  if (offset) path.offset((0, _stackOffset.default)(offset));
  return path;
}