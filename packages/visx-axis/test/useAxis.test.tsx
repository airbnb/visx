import { render } from '@testing-library/react';
import { scaleBand, scaleLinear } from '@visx/scale';
import { useAxis } from '../src/react';
import type { AxisRendererProps } from '../src';

const linearScale = scaleLinear({
  range: [100, 0],
  domain: [0, 10],
});

function AxisProbe<Scale extends Parameters<typeof useAxis>[0]['scale']>({
  onAxis,
  ...options
}: Parameters<typeof useAxis<Scale>>[0] & {
  onAxis: (axis: AxisRendererProps<Scale>) => void;
}) {
  onAxis(useAxis(options));

  return null;
}

describe('useAxis', () => {
  it('computes renderer props from a linear scale', () => {
    const onAxis = vi.fn();

    render(
      <AxisProbe orientation="left" scale={linearScale} tickValues={[0, 10]} onAxis={onAxis} />,
    );

    expect(onAxis).toHaveBeenCalledWith(
      expect.objectContaining({
        axisFromPoint: { x: 0, y: 100.5 },
        axisToPoint: { x: 0, y: 0.5 },
        horizontal: false,
        tickSign: -1,
        ticks: [
          {
            value: 0,
            index: 0,
            from: { x: 0, y: 100 },
            to: { x: -8, y: 100 },
            formattedValue: '0',
          },
          {
            value: 10,
            index: 1,
            from: { x: 0, y: 0 },
            to: { x: -8, y: 0 },
            formattedValue: '10',
          },
        ],
      }),
    );
  });

  it('centers band-scale ticks', () => {
    const onAxis = vi.fn();
    const bandScale = scaleBand({
      range: [0, 20],
      domain: ['a', 'b'],
    });

    render(<AxisProbe orientation="bottom" scale={bandScale} tickValues={['a']} onAxis={onAxis} />);

    expect(onAxis.mock.calls[0][0].ticks[0].from).toEqual({ x: 5, y: 0 });
  });
});
