export default function applyBase(scale, config) {
  if ('base' in scale && 'base' in config && typeof config.base !== 'undefined') {
    scale.base(config.base);
  }
}