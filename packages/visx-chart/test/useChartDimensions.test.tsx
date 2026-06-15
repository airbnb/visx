import { render } from '@testing-library/react';
import { useChartDimensions } from '../src';

function DimensionsProbe({
  onDimensions,
  ...options
}: Parameters<typeof useChartDimensions>[0] & {
  onDimensions: (dimensions: ReturnType<typeof useChartDimensions>) => void;
}) {
  onDimensions(useChartDimensions(options));

  return null;
}

describe('useChartDimensions', () => {
  it('normalizes margins and clamps inner dimensions at zero', () => {
    const onDimensions = vi.fn();

    render(
      <DimensionsProbe
        width={100}
        height={80}
        margin={{ top: 10, right: 20, bottom: 30, left: 40 }}
        onDimensions={onDimensions}
      />,
    );

    expect(onDimensions).toHaveBeenCalledWith({
      width: 100,
      height: 80,
      margin: { top: 10, right: 20, bottom: 30, left: 40 },
      innerWidth: 40,
      innerHeight: 40,
      xMax: 40,
      yMax: 40,
    });
  });

  it('returns stable objects when equivalent margin objects are passed', () => {
    const onDimensions = vi.fn();
    const { rerender } = render(
      <DimensionsProbe width={10} height={10} margin={{ left: 1 }} onDimensions={onDimensions} />,
    );
    const firstDimensions = onDimensions.mock.calls[0][0];
    const firstMargin = firstDimensions.margin;

    rerender(
      <DimensionsProbe width={10} height={10} margin={{ left: 1 }} onDimensions={onDimensions} />,
    );

    expect(onDimensions.mock.calls[1][0]).toBe(firstDimensions);
    expect(onDimensions.mock.calls[1][0].margin).toBe(firstMargin);
  });

  it('falls back to zero for invalid dimensions', () => {
    const onDimensions = vi.fn();

    render(<DimensionsProbe width={Number.NaN} height={Infinity} onDimensions={onDimensions} />);

    expect(onDimensions).toHaveBeenCalledWith({
      width: 0,
      height: 0,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      innerWidth: 0,
      innerHeight: 0,
      xMax: 0,
      yMax: 0,
    });
  });
});
