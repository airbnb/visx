import { render } from '@testing-library/react';
import { useVoronoi } from '../src/react';

type Datum = { x: number; y: number };

const x = (datum: Datum) => datum.x;
const y = (datum: Datum) => datum.y;

function VoronoiProbe({
  onVoronoi,
}: {
  onVoronoi: (layout: ReturnType<typeof useVoronoi<Datum>>) => void;
}) {
  onVoronoi(useVoronoi({ width: 10, height: 20, x, y }));

  return null;
}

function StringAccessorVoronoiProbe({
  onVoronoi,
}: {
  onVoronoi: (layout: ReturnType<typeof useVoronoi<Datum>>) => void;
}) {
  onVoronoi(useVoronoi<Datum>({ width: 10, height: 20, x: 'x', y: 'y' }));

  return null;
}

describe('useVoronoi', () => {
  it('creates a configured voronoi layout', () => {
    const onVoronoi = vi.fn();

    render(<VoronoiProbe onVoronoi={onVoronoi} />);

    const layout = onVoronoi.mock.calls[0][0] as ReturnType<typeof useVoronoi<Datum>>;
    expect(layout.x()({ x: 3, y: 4 })).toBe(3);
    expect(layout.y()({ x: 3, y: 4 })).toBe(4);
    expect(layout.extent()?.[1]).toEqual([11, 21]);
  });

  it('normalizes string accessors and keeps equal configs stable', () => {
    const onVoronoi = vi.fn();
    const { rerender } = render(<StringAccessorVoronoiProbe onVoronoi={onVoronoi} />);

    rerender(<StringAccessorVoronoiProbe onVoronoi={onVoronoi} />);

    const layout = onVoronoi.mock.calls[0][0] as ReturnType<typeof useVoronoi<Datum>>;
    expect(layout.x()({ x: 3, y: 4 })).toBe(3);
    expect(layout.y()({ x: 3, y: 4 })).toBe(4);
    expect(onVoronoi.mock.calls[1][0]).toBe(layout);
  });
});
