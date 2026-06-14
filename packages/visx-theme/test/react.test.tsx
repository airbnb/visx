import { render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { defineTheme, lightTheme } from '../src';
import { ThemeProvider, useTheme } from '../src/react';

function ThemeProbe({ onTheme }: { onTheme: (theme: ReturnType<typeof useTheme>) => void }) {
  const theme = useTheme();
  onTheme(theme);

  return <span data-color={theme.colors.categorical[0]}>chart</span>;
}

describe('@visx/theme/react', () => {
  it('uses auto runtime defaults outside a provider', () => {
    const onTheme = vi.fn();

    render(<ThemeProbe onTheme={onTheme} />);

    expect(onTheme).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'auto',
        colors: expect.objectContaining({
          background: 'var(--background, #ffffff)',
        }),
      }),
    );
  });

  it('provides auto runtime values and emits no generated variables in auto mode', () => {
    const onTheme = vi.fn();
    const { container } = render(
      <ThemeProvider theme="auto">
        <ThemeProbe onTheme={onTheme} />
      </ThemeProvider>,
    );
    const wrapper = container.firstElementChild as HTMLElement;

    expect(wrapper.tagName).toBe('DIV');
    expect(wrapper.style.getPropertyValue('--chart-1')).toBe('');
    expect(onTheme).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'auto',
        colors: expect.objectContaining({
          categorical: expect.arrayContaining(['var(--chart-1, #3b82f6)']),
        }),
      }),
    );
  });

  it('renders no wrapper in auto mode with as={false}', () => {
    const { container } = render(
      <ThemeProvider theme="auto" as={false}>
        <span>chart</span>
      </ThemeProvider>,
    );

    expect(container.innerHTML).toBe('<span>chart</span>');
  });

  it('provides dark runtime values and emits dark CSS variables', () => {
    const onTheme = vi.fn();
    const { container } = render(
      <ThemeProvider theme="dark">
        <ThemeProbe onTheme={onTheme} />
      </ThemeProvider>,
    );
    const wrapper = container.firstElementChild as HTMLElement;

    expect(wrapper.style.getPropertyValue('--chart-1')).toBe('#60a5fa');
    expect(onTheme).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'dark',
        colors: expect.objectContaining({
          categorical: expect.arrayContaining(['var(--chart-1, #60a5fa)']),
        }),
      }),
    );
  });

  it('provides custom JS-only layout values from an object theme', () => {
    const onTheme = vi.fn();
    const denseTheme = defineTheme({
      name: 'dense',
      axis: {
        tickLength: 3,
      },
      spacing: {
        margin: {
          left: 32,
        },
      },
    });

    render(
      <ThemeProvider theme={denseTheme}>
        <ThemeProbe onTheme={onTheme} />
      </ThemeProvider>,
    );

    expect(onTheme).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'dense',
        axis: expect.objectContaining({
          tickLength: 3,
        }),
        spacing: expect.objectContaining({
          margin: expect.objectContaining({
            left: 32,
          }),
        }),
      }),
    );
  });

  it('renders during server rendering without DOM APIs', () => {
    const html = renderToString(
      <ThemeProvider theme="light">
        <ThemeProbe onTheme={() => {}} />
      </ThemeProvider>,
    );

    expect(html).toContain('--chart-1:#3b82f6');
    expect(html).toContain(`data-color="var(--chart-1, ${lightTheme.colors.categorical[0]})"`);
  });
});
