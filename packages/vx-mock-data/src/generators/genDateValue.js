export default function genDateValue(n) {
  return new Array(n).fill(1).map((d, i) => {
    return {
      date: new Date(Date.now() - i * 3600000),
      // eslint-disable-next-line no-bitwise
      value: Math.max(250, (Math.random() * 3000) | 0),
    };
  });
}
