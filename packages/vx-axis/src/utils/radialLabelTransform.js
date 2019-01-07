export default function radialLabelTransform({
  labelOffset,
  labelOrientation,
  labelProps,
  radius,
  tickLabelFontSize,
  tickLength
}) {
  let x = 0;
  let y = 0;
  let textAnchor = 'middle';

  const offset =
    tickLength +
    labelOffset +
    tickLabelFontSize +
    (labelOrientation === 'bottom' ? labelProps.fontSize : 0);

  if (labelOrientation === 'top') {
    y = -radius - offset;
  } else if (labelOrientation === 'right') {
    x = radius + offset;
    textAnchor = 'start';
  } else if (labelOrientation === 'bottom') {
    y = radius + offset;
  } else if (labelOrientation === 'left') {
    x = -radius - offset;
    textAnchor = 'end';
  }

  return { x, y, textAnchor };
}
