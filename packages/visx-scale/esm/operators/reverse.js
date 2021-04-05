export default function applyReverse(scale, config) {
  if (config.reverse) {
    var reversedRange = scale.range().slice().reverse();

    if ('padding' in scale) {
      // point and band scales
      scale.range(reversedRange);
    } else {
      // the rest
      scale.range(reversedRange);
    }
  }
}