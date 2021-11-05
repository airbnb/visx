import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider, ThemeContext } from '../../src';

describe('<ThemeProvider />', () => {
  it('should be defined', () => {
    expect(ThemeProvider).toBeDefined();
  });

  it('should provide a XYChartTheme', () => {
    expect.assertions(1);

    const ThemeConsumer = () => {
      const theme = useContext(ThemeContext);
      expect(theme).toBeDefined();

      return null;
    };

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
  });
});
