export interface DateValue {
  date: Date;
  value: number;
}

export default function genDateValue(length: number): DateValue[] {
  return new Array(length).fill(1).map((_, idx: number) => {
    return {
      date: new Date(Date.now() - idx * 3600000),
      // eslint-disable-next-line no-bitwise
      value: Math.max(250, (Math.random() * 3000) | 0),
    };
  });
}
