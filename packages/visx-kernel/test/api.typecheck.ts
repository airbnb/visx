import {
  createPath,
  formatNumber,
  normalizeAccessor,
  toPath2D,
  useDomain,
  useLatestRef,
  useStableId,
  useStableCallback,
  useStructuralMemo,
} from '../src';

type Datum = {
  category: 'a' | 'b';
  date: Date;
  value: number;
};

const data = [
  { category: 'a', date: new Date('2024-01-01'), value: 4 },
  { category: 'b', date: new Date('2024-01-02'), value: 10 },
] as const satisfies readonly Datum[];

const valueAccessor = normalizeAccessor<Datum, number>('value');
const value: number = valueAccessor(data[0], 0, data);
const pathString: string = createPath(2).moveTo(0, 0).lineTo(1.25, 3.5).toString();
const path: Path2D = toPath2D(pathString);
const formatted: string = formatNumber(value, { maximumFractionDigits: 1 });

export function KernelApiTypecheck() {
  const memoizedOptions: { tickCount: number } = useStructuralMemo({ tickCount: 5 }, 1);
  const clipId: string = useStableId('clip');
  const latestDataRef = useLatestRef(data);
  const stableFormatter: (prefix: string) => string = useStableCallback(
    (prefix: string) => `${prefix}${latestDataRef.current.length}`,
  );
  const linearDomain: readonly [number, number] = useDomain({
    data,
    accessor: 'value',
    type: 'linear',
  });
  const timeDomain: readonly [Date, Date] = useDomain({
    data,
    accessor: (datum: Datum) => datum.date,
    type: 'time',
  });
  const bandDomain: readonly string[] = useDomain({
    data,
    accessor: 'category',
    type: 'band',
  });

  return {
    bandDomain,
    clipId,
    formatted,
    linearDomain,
    memoizedOptions,
    path,
    stableFormatter,
    timeDomain,
  };
}
