// @flow

export default function genDateValue(n: number) {
  return Array(n).fill(1).map((d: number, i: number) => {
    return {
      date: new Date(Date.now() - (i * 3600000)),
      value: Math.max(250, Math.random() * 3000 | 0),
    };
  });
}
