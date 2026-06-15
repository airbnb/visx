import { render } from '@testing-library/react';
import { usePie } from '../src/react';

const pieValue = (datum: number) => datum;

function PieProbe({
  data = [1, 2],
  onPie,
  outerRadius = 20,
}: {
  data?: number[];
  onPie: (pie: ReturnType<typeof usePie<number>>) => void;
  outerRadius?: number;
}) {
  onPie(
    usePie({
      data,
      pieValue,
      innerRadius: 5,
      outerRadius,
      pieSortValues: null,
    }),
  );

  return null;
}

describe('usePie', () => {
  it('returns configured pie arcs and arc path generator', () => {
    const onPie = vi.fn();

    render(<PieProbe onPie={onPie} />);

    const result = onPie.mock.calls[0][0] as ReturnType<typeof usePie<number>>;
    expect(result.arcs).toHaveLength(2);
    expect(result.arcs[0]).toMatchObject({ value: 1, index: 0 });
    expect(result.arcs[1]).toMatchObject({ value: 2, index: 1 });
    expect(result.path.innerRadius()(result.arcs[0])).toBe(5);
    expect(result.path.outerRadius()(result.arcs[0])).toBe(20);
  });

  it('updates arcs when a stable data array is mutated before rerender', () => {
    const onPie = vi.fn();
    const data = [1, 2];
    const { rerender } = render(<PieProbe data={data} onPie={onPie} />);

    data[0] = 10;
    rerender(<PieProbe data={data} onPie={onPie} />);

    const result = onPie.mock.calls[1][0] as ReturnType<typeof usePie<number>>;
    expect(result.arcs[0]).toMatchObject({ value: 10, index: 0 });
    expect(result.arcs[1]).toMatchObject({ value: 2, index: 1 });
  });

  it('does not leak render-prop generator mutations across renders', () => {
    const onPie = vi.fn();
    const data = [1, 2];
    const { rerender } = render(<PieProbe data={data} onPie={onPie} outerRadius={20} />);
    const firstResult = onPie.mock.calls[0][0] as ReturnType<typeof usePie<number>>;

    firstResult.path.outerRadius(99);
    rerender(<PieProbe data={data} onPie={onPie} outerRadius={20} />);

    const secondResult = onPie.mock.calls[1][0] as ReturnType<typeof usePie<number>>;
    expect(secondResult.path.outerRadius()(secondResult.arcs[0])).toBe(20);
  });
});
