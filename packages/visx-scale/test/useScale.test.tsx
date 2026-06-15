import { render } from '@testing-library/react';
import { useScale } from '../src/react';

type UseScaleConfig = Parameters<typeof useScale>[0];

function ScaleProbe({
  config,
  onScale,
}: {
  config: UseScaleConfig;
  onScale: (scale: ReturnType<typeof useScale>) => void;
}) {
  onScale(useScale(config));

  return null;
}

describe('useScale', () => {
  it('creates a typed d3 scale from config', () => {
    const onScale = vi.fn();

    render(
      <ScaleProbe
        config={{ type: 'band', domain: ['a', 'b'], range: [0, 20], padding: 0 }}
        onScale={onScale}
      />,
    );

    const scale = onScale.mock.calls[0][0];
    expect(scale('a')).toBe(0);
    expect(scale.bandwidth()).toBe(10);
  });

  it('preserves scale identity when config identity is stable', () => {
    const onScale = vi.fn();
    const config: UseScaleConfig = { type: 'linear', domain: [0, 10], range: [0, 100] };
    const { rerender } = render(<ScaleProbe config={config} onScale={onScale} />);
    const firstScale = onScale.mock.calls[0][0];

    rerender(<ScaleProbe config={config} onScale={onScale} />);

    expect(onScale.mock.calls[1][0]).toBe(firstScale);
  });
});
