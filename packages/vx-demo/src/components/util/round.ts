export default (value: number, precision?: number) => {
  const multiplier = 10 ** (precision || 0);
  return Math.round(value * multiplier) / multiplier;
};
