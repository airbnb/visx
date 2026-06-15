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

describe('useVoronoi', () => {
  it('creates a configured voronoi layout', () => {
    const onVoronoi = vi.fn();

    render(<VoronoiProbe onVoronoi={onVoronoi} />);

    const layout = onVoronoi.mock.calls[0][0] as ReturnType<typeof useVoronoi<Datum>>;
    expect(layout.x()).toBe(x);
    expect(layout.y()).toBe(y);
    expect(layout.extent()?.[1]).toEqual([11, 21]);
  });
});
