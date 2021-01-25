import getSeededRandom from './getSeededRandom';

export interface DateValue {
  date: Date;
  value: number;
}

export default function genDateValue(
  length: number,
  /** Optional random seed in the interval [0, 1). */
  seed?: number,
  /** Optional start time in ms UTC. */
  startTimeMs?: number,
): DateValue[] {
  const random = seed == null ? Math.random : getSeededRandom(seed);
  const startDateMs = startTimeMs == null ? Date.now() : new Date(startTimeMs).valueOf();
  return new Array(length).fill(1).map((_, idx: number) => {
    return {
      date: new Date(startDateMs - idx * 3600000),
      // eslint-disable-next-line no-bitwise
      value: (random() * 3000) | 0,
    };
  });
}
