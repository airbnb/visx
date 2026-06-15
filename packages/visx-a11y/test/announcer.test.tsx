import { render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';

import { ChartA11yAnnouncer } from '../src/react';

describe('ChartA11yAnnouncer', () => {
  it('renders a visually hidden polite live region by default', () => {
    const { container } = render(<ChartA11yAnnouncer message="Revenue updated" />);
    const region = container.querySelector('[role="status"]') as HTMLElement | null;

    expect(region?.getAttribute('aria-live')).toBe('polite');
    expect(region?.getAttribute('aria-atomic')).toBe('true');
    expect(region?.style.position).toBe('absolute');
    expect(region?.textContent).toBe('Revenue updated');
  });

  it('can render an assertive live region from children', () => {
    const { container } = render(
      <ChartA11yAnnouncer politeness="assertive">Selection changed</ChartA11yAnnouncer>,
    );
    const region = container.querySelector('[role="alert"]');

    expect(region?.getAttribute('aria-live')).toBe('assertive');
    expect(region?.textContent).toBe('Selection changed');
  });

  it('can render visibly during server rendering', () => {
    const html = renderToString(
      <ChartA11yAnnouncer visible id="chart-announcer" message="Ready" />,
    );

    expect(html).toContain('id="chart-announcer"');
    expect(html).toContain('role="status"');
    expect(html).toContain('Ready');
    expect(html).not.toContain('position:absolute');
  });
});
