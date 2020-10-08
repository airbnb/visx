import React, { useContext } from 'react';
import { mount } from 'enzyme';
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

    mount(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
  });
});
