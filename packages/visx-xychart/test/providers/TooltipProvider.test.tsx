import React, { useContext } from 'react';
import { mount } from 'enzyme';
import { TooltipProvider, TooltipContext } from '../../src';

describe('<TooltipProvider />', () => {
  it('should be defined', () => {
    expect(TooltipProvider).toBeDefined();
  });

  it('should provide an emitter for subscribing and emitting events', () => {
    expect.assertions(1);

    const TooltipConsumer = () => {
      const tooltipContext = useContext(TooltipContext);
      expect(tooltipContext).toBeDefined();

      return null;
    };

    mount(
      <TooltipProvider>
        <TooltipConsumer />
      </TooltipProvider>,
    );
  });
});
