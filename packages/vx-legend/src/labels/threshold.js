function format( labelFormat, value, i) {
  return labelFormat(value, i) || '';
}

export default function labelThreshold({
  scale,
  labelFormat,
  labelDelimiter = 'to',
  labelLower = 'Less than ',
  labelUpper = 'More than ',
}) {
  return scale.range().map((d, i) => {
    let [x0, x1] = scale.invertExtent(d);
    let delimiter = ` ${labelDelimiter} `;
    let value = x1;
    if (!x0) {
      delimiter = labelLower;
    }
    if (!x1) {
      value = x0;
      x1 = x0;
      x0 = undefined;
      delimiter = labelUpper;
    }
    return {
      extent: [x0, x1],
      text: `${format(labelFormat, x0, i)}${delimiter}${format(labelFormat, x1, i)}`,
      value: scale(value)
    };
  });
}