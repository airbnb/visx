const has = Object.prototype.hasOwnProperty;

export default function updateScale(scale, { ...args }) {
  const nextScale = scale.copy();
  Object.keys(args).forEach(key => {
    if (has.call(nextScale, key)) nextScale[key](args[key]);
  });
  return nextScale;
}
