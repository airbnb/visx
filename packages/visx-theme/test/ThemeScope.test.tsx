import { render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ThemeScope, defineTheme, lightTheme } from '../src';

describe('ThemeScope', () => {
  it('renders an auto wrapper without generated CSS variables', () => {
    const html = renderToString(
      <ThemeScope theme="auto" className="chart-theme">
        <span>chart</span>
      </ThemeScope>,
    );

    expect(html).toContain('<div class="chart-theme">');
    expect(html).toContain('<span>chart</span>');
    expect(html).not.toContain('--chart-1');
  });

  it('renders no wrapper for auto mode with as={false}', () => {
    const { container } = render(
      <ThemeScope theme="auto" as={false}>
        <span>chart</span>
      </ThemeScope>,
    );

    expect(container.innerHTML).toBe('<span>chart</span>');
  });

  it('supports custom wrapper elements in auto mode', () => {
    const { container } = render(
      <ThemeScope theme="auto" as="section" className="chart-theme">
        <span>chart</span>
      </ThemeScope>,
    );

    expect(container.firstElementChild?.tagName).toBe('SECTION');
    expect(container.firstElementChild?.className).toBe('chart-theme');
  });

  it('emits light CSS variables for light mode', () => {
    const { container } = render(
      <ThemeScope theme="light">
        <span>chart</span>
      </ThemeScope>,
    );
    const wrapper = container.firstElementChild as HTMLElement;

    expect(wrapper.style.getPropertyValue('--chart-1')).toBe(lightTheme.colors.categorical[0]);
    expect(wrapper.style.getPropertyValue('--background')).toBe(lightTheme.colors.background);
    expect(wrapper.style.getPropertyValue('--visx-axis-stroke')).toBe(lightTheme.colors.axisStroke);
  });

  it('emits object theme CSS variables on the wrapper', () => {
    const brandTheme = defineTheme({
      name: 'brand',
      colors: {
        categorical: ['#111111', '#222222', '#333333'],
        background: '#101010',
      },
    });
    const { container } = render(
      <ThemeScope theme={brandTheme} as="section">
        <span>chart</span>
      </ThemeScope>,
    );
    const wrapper = container.firstElementChild as HTMLElement;

    expect(wrapper.tagName).toBe('SECTION');
    expect(wrapper.style.getPropertyValue('--chart-1')).toBe('#111111');
    expect(wrapper.style.getPropertyValue('--background')).toBe('#101010');
  });

  it('lets user styles override generated CSS variables', () => {
    const { container } = render(
      <ThemeScope theme="light" style={{ '--chart-1': 'var(--brand-accent)' }}>
        <span>chart</span>
      </ThemeScope>,
    );
    const wrapper = container.firstElementChild as HTMLElement;

    expect(wrapper.style.getPropertyValue('--chart-1')).toBe('var(--brand-accent)');
  });

  it('warns and renders a wrapper when non-auto as={false} is reached at runtime', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { container } = render(
      <ThemeScope theme="dark" as={false as never}>
        <span>chart</span>
      </ThemeScope>,
    );

    expect(warn).toHaveBeenCalledWith(
      '[@visx/theme] ThemeScope requires a wrapper element for non-auto themes.',
    );
    expect(container.firstElementChild?.tagName).toBe('DIV');

    warn.mockRestore();
  });
});
