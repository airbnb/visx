import ORIENT from '../constants/orientation';

export default function labelTransform({
  tickLength,
  labelOffset,
  tickLabelFontSize,
  labelComponent,
  orientation,
  range,
}) {
  if (!labelComponent || !labelComponent.props) return {};
  const sign = orientation === ORIENT.left || orientation === ORIENT.top ? -1 : 1;
  const { fontSize = 10 } = labelComponent.props;

  let x, y, transform = null;
  if (orientation === ORIENT.top || orientation === ORIENT.bottom) {
    x = Math.max(...range) / 2;
    y = sign * (tickLength + labelOffset + tickLabelFontSize +
      (orientation === ORIENT.bottom ? fontSize : 0));
  } else {
    x = sign * (Math.max(...range) / 2);
    y = -(tickLength + labelOffset);
    transform = `rotate(${sign * 90})`;
  }

  return { x, y, transform };
}
