var zeroableScaleTypes = new Set(['linear', 'pow', 'quantize', 'sqrt', 'symlog']);
export default function scaleCanBeZeroed(scaleConfig) {
  return zeroableScaleTypes.has(scaleConfig.type);
}