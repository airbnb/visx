import { render } from '@testing-library/react';
import { createRuntimeTheme, defineTheme, lightTheme } from '../src';
import {
  ThemeProvider,
  useAxisStyle,
  useCategoricalScale,
  useColor,
  useColorScale,
  useGridStyle,
} from '../src/react';

function ColorProbe({ onColors }: { onColors: (colors: string[]) => void }) {
  onColors([
    useColor('background'),
    useColor('textMuted'),
    useColor(0),
    useColor(12),
    useColor(-1),
  ]);

  return null;
}

function FractionalColorProbe({ onColor }: { onColor: (color: string) => void }) {
  onColor(useColor(1.9));

  return null;
}

function NonFiniteColorProbe({ onColor }: { onColor: (color: string) => void }) {
  onColor(useColor(Number.NaN));

  return null;
}

function CategoricalScaleProbe({ onColors }: { onColors: (colors: string[]) => void }) {
  const colorFor = useCategoricalScale([
    'alpha',
    'beta',
    'gamma',
    'delta',
    'epsilon',
    'zeta',
    'eta',
    'theta',
    'iota',
    'kappa',
    'lambda',
    'mu',
    'nu',
  ] as const);

  onColors([colorFor('alpha'), colorFor('beta'), colorFor('nu')]);

  return null;
}

function UnknownCategoricalProbe({ onColor }: { onColor: (color: string) => void }) {
  const colorFor = useCategoricalScale(['alpha'] as const);

  onColor(colorFor('missing' as never));

  return null;
}

function ColorScaleProbe({ onColors }: { onColors: (colors: string[]) => void }) {
  const colorFor = useColorScale(['alpha', 'beta', 'gamma'] as const, {
    range: ['red', 'green'],
  });

  onColors([colorFor('alpha'), colorFor('beta'), colorFor('gamma')]);

  return null;
}

function UnknownColorScaleProbe({ onColor }: { onColor: (color: string) => void }) {
  const colorFor = useColorScale(['alpha'] as const);

  onColor(colorFor('missing' as never));

  return null;
}

function AxisStyleProbe({
  onStyle,
  orientation,
}: {
  onStyle: (style: ReturnType<typeof useAxisStyle>) => void;
  orientation: Parameters<typeof useAxisStyle>[0];
}) {
  onStyle(useAxisStyle(orientation));

  return null;
}

function GridStyleProbe({
  onStyle,
}: {
  onStyle: (style: ReturnType<typeof useGridStyle>) => void;
}) {
  onStyle(useGridStyle());

  return null;
}

describe('@visx/theme/react hooks', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns CSS-ready color values by token name and categorical index', () => {
    const onColors = vi.fn();
    const theme = createRuntimeTheme('auto');

    render(<ColorProbe onColors={onColors} />);

    expect(onColors).toHaveBeenCalledWith([
      theme.colors.background,
      theme.colors.textMuted,
      theme.colors.categorical[0],
      theme.colors.categorical[0],
      theme.colors.categorical[11],
    ]);
  });

  it('warns and truncates fractional categorical color indexes', () => {
    const onColor = vi.fn();
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(<FractionalColorProbe onColor={onColor} />);

    expect(onColor).toHaveBeenCalledWith('var(--chart-2, #10b981)');
    expect(warn).toHaveBeenCalledWith(
      '[@visx/theme] useColor received a fractional categorical color index; truncating to 1.',
    );

    warn.mockRestore();
  });

  it('warns and falls back for non-finite categorical color indexes', () => {
    const onColor = vi.fn();
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(<NonFiniteColorProbe onColor={onColor} />);

    expect(onColor).toHaveBeenCalledWith('var(--chart-1, #3b82f6)');
    expect(warn).toHaveBeenCalledWith(
      '[@visx/theme] useColor received a non-finite categorical color index; using index 0.',
    );

    warn.mockRestore();
  });

  it('creates a deterministic categorical accessor from domain order', () => {
    const onColors = vi.fn();

    render(<CategoricalScaleProbe onColors={onColors} />);

    expect(onColors).toHaveBeenCalledWith([
      'var(--chart-1, #3b82f6)',
      'var(--chart-2, #10b981)',
      'var(--chart-1, #3b82f6)',
    ]);
  });

  it('warns and falls back for categorical keys outside the domain', () => {
    const onColor = vi.fn();
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(<UnknownCategoricalProbe onColor={onColor} />);

    expect(onColor).toHaveBeenCalledWith('var(--chart-1, #3b82f6)');
    expect(warn).toHaveBeenCalledWith(
      '[@visx/theme] useCategoricalScale received "missing" outside its domain; using index 0.',
    );

    warn.mockRestore();
  });

  it('creates a deterministic color accessor from an explicit range', () => {
    const onColors = vi.fn();

    render(<ColorScaleProbe onColors={onColors} />);

    expect(onColors).toHaveBeenCalledWith(['red', 'green', 'red']);
  });

  it('warns and falls back for color scale keys outside the domain', () => {
    const onColor = vi.fn();
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(<UnknownColorScaleProbe onColor={onColor} />);

    expect(onColor).toHaveBeenCalledWith('var(--chart-1, #3b82f6)');
    expect(warn).toHaveBeenCalledWith(
      '[@visx/theme] useColorScale received "missing" outside its domain; using index 0.',
    );

    warn.mockRestore();
  });

  it('returns axis prop bundles aligned to the requested orientation', () => {
    const onStyle = vi.fn();
    const theme = createRuntimeTheme('auto');

    render(<AxisStyleProbe orientation="left" onStyle={onStyle} />);

    expect(onStyle).toHaveBeenCalledWith({
      stroke: theme.colors.axisStroke,
      strokeWidth: lightTheme.axis.strokeWidth,
      tickLength: lightTheme.axis.tickLength,
      tickStroke: theme.colors.axisTickStroke,
      tickLabelProps: {
        dx: '-0.25em',
        dy: '0.25em',
        fill: theme.colors.textMuted,
        fontFamily: theme.typography.fontFamily,
        fontSize: lightTheme.typography.fontSizeTick,
        textAnchor: 'end',
      },
      labelProps: {
        dx: '-1.25em',
        fill: theme.colors.textPrimary,
        fontFamily: theme.typography.fontFamily,
        fontSize: lightTheme.typography.fontSizeLabel,
        textAnchor: 'middle',
      },
    });
  });

  it('returns axis and grid values from custom theme numeric tokens', () => {
    const onAxisStyle = vi.fn();
    const onGridStyle = vi.fn();
    const theme = createRuntimeTheme('auto');
    const denseTheme = defineTheme({
      name: 'dense',
      axis: {
        strokeWidth: 2,
        tickLength: 3,
      },
      grid: {
        strokeWidth: 0.5,
      },
    });

    render(
      <ThemeProvider theme={denseTheme}>
        <AxisStyleProbe orientation="bottom" onStyle={onAxisStyle} />
        <GridStyleProbe onStyle={onGridStyle} />
      </ThemeProvider>,
    );

    expect(onAxisStyle).toHaveBeenCalledWith(
      expect.objectContaining({
        strokeWidth: 2,
        tickLength: 3,
        tickLabelProps: expect.objectContaining({
          dy: '0.25em',
          textAnchor: 'middle',
        }),
        labelProps: expect.objectContaining({
          dy: '-0.25em',
          textAnchor: 'middle',
        }),
      }),
    );
    expect(onGridStyle).toHaveBeenCalledWith({
      stroke: theme.colors.gridStroke,
      strokeWidth: 0.5,
    });
  });
});
