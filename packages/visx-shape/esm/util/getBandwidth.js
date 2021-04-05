export default function getBandwidth(scale) {
  if ('bandwidth' in scale) {
    return scale.bandwidth();
  }

  var range = scale.range();
  var domain = scale.domain();
  return Math.abs(range[range.length - 1] - range[0]) / domain.length;
}