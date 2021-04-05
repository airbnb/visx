import { arc as d3Arc, area as d3Area, line as d3Line, pie as d3Pie, radialLine as d3RadialLine, stack as d3Stack } from 'd3-shape';
import setNumberOrNumberAccessor from './setNumberOrNumberAccessor';
import stackOrder from './stackOrder';
import stackOffset from './stackOffset';
export function arc(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      innerRadius = _ref.innerRadius,
      outerRadius = _ref.outerRadius,
      cornerRadius = _ref.cornerRadius,
      startAngle = _ref.startAngle,
      endAngle = _ref.endAngle,
      padAngle = _ref.padAngle,
      padRadius = _ref.padRadius;

  var path = d3Arc();
  if (innerRadius != null) setNumberOrNumberAccessor(path.innerRadius, innerRadius);
  if (outerRadius != null) setNumberOrNumberAccessor(path.outerRadius, outerRadius);
  if (cornerRadius != null) setNumberOrNumberAccessor(path.cornerRadius, cornerRadius);
  if (startAngle != null) setNumberOrNumberAccessor(path.startAngle, startAngle);
  if (endAngle != null) setNumberOrNumberAccessor(path.endAngle, endAngle);
  if (padAngle != null) setNumberOrNumberAccessor(path.padAngle, padAngle);
  if (padRadius != null) setNumberOrNumberAccessor(path.padRadius, padRadius);
  return path;
}
export function area(_temp2) {
  var _ref2 = _temp2 === void 0 ? {} : _temp2,
      x = _ref2.x,
      x0 = _ref2.x0,
      x1 = _ref2.x1,
      y = _ref2.y,
      y0 = _ref2.y0,
      y1 = _ref2.y1,
      defined = _ref2.defined,
      curve = _ref2.curve;

  var path = d3Area();
  if (x) setNumberOrNumberAccessor(path.x, x);
  if (x0) setNumberOrNumberAccessor(path.x0, x0);
  if (x1) setNumberOrNumberAccessor(path.x1, x1);
  if (y) setNumberOrNumberAccessor(path.y, y);
  if (y0) setNumberOrNumberAccessor(path.y0, y0);
  if (y1) setNumberOrNumberAccessor(path.y1, y1);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  return path;
}
export function line(_temp3) {
  var _ref3 = _temp3 === void 0 ? {} : _temp3,
      x = _ref3.x,
      y = _ref3.y,
      defined = _ref3.defined,
      curve = _ref3.curve;

  var path = d3Line();
  if (x) setNumberOrNumberAccessor(path.x, x);
  if (y) setNumberOrNumberAccessor(path.y, y);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  return path;
}
export function pie(_temp4) {
  var _ref4 = _temp4 === void 0 ? {} : _temp4,
      startAngle = _ref4.startAngle,
      endAngle = _ref4.endAngle,
      padAngle = _ref4.padAngle,
      value = _ref4.value,
      sort = _ref4.sort,
      sortValues = _ref4.sortValues;

  var path = d3Pie(); // ts can't distinguish between these method overloads

  if (sort === null) path.sort(sort);else if (sort != null) path.sort(sort);
  if (sortValues === null) path.sortValues(sortValues);else if (sortValues != null) path.sortValues(sortValues);
  if (value != null) path.value(value);
  if (padAngle != null) setNumberOrNumberAccessor(path.padAngle, padAngle);
  if (startAngle != null) setNumberOrNumberAccessor(path.startAngle, startAngle);
  if (endAngle != null) setNumberOrNumberAccessor(path.endAngle, endAngle);
  return path;
}
export function radialLine(_temp5) {
  var _ref5 = _temp5 === void 0 ? {} : _temp5,
      angle = _ref5.angle,
      radius = _ref5.radius,
      defined = _ref5.defined,
      curve = _ref5.curve;

  var path = d3RadialLine();
  if (angle) setNumberOrNumberAccessor(path.angle, angle);
  if (radius) setNumberOrNumberAccessor(path.radius, radius);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  return path;
}
export function stack(_ref6) {
  var keys = _ref6.keys,
      value = _ref6.value,
      order = _ref6.order,
      offset = _ref6.offset;
  var path = d3Stack();
  if (keys) path.keys(keys);
  if (value) setNumberOrNumberAccessor(path.value, value);
  if (order) path.order(stackOrder(order));
  if (offset) path.offset(stackOffset(offset));
  return path;
}