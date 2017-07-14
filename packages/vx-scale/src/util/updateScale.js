export default function updateScale(scale, { ...args }) {
  const nextScale = scale.copy();
  Object.keys(args).forEach((key) => {
    if (nextScale.hasOwnProperty(key)) nextScale[key](args[key]);
  });
  return nextScale;
}
