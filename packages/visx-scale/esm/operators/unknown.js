export default function applyUnknown(scale, config) {
  if ('unknown' in scale && 'unknown' in config && typeof config.unknown !== 'undefined') {
    scale.unknown(config.unknown);
  }
}