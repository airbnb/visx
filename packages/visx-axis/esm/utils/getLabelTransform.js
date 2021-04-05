import Orientation from '../constants/orientation';
export default function getLabelTransform(_ref) {
  var labelOffset = _ref.labelOffset,
      labelProps = _ref.labelProps,
      orientation = _ref.orientation,
      range = _ref.range,
      tickLabelFontSize = _ref.tickLabelFontSize,
      tickLength = _ref.tickLength;
  var sign = orientation === Orientation.left || orientation === Orientation.top ? -1 : 1;
  var x;
  var y;
  var transform;

  if (orientation === Orientation.top || orientation === Orientation.bottom) {
    var yBottomOffset = orientation === Orientation.bottom && typeof labelProps.fontSize === 'number' ? labelProps.fontSize : 0;
    x = (Number(range[0]) + Number(range[range.length - 1])) / 2;
    y = sign * (tickLength + labelOffset + tickLabelFontSize + yBottomOffset);
  } else {
    x = sign * ((Number(range[0]) + Number(range[range.length - 1])) / 2);
    y = -(tickLength + labelOffset);
    transform = "rotate(" + sign * 90 + ")";
  }

  return {
    x: x,
    y: y,
    transform: transform
  };
}