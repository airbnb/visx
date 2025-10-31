import React, { useContext, useEffect } from 'react';
import { render } from '@testing-library/react';
import type { TooltipData } from '../../src';
import { TooltipProvider, TooltipContext } from '../../src';

describe('<TooltipProvider />', () => {
  it('should be defined', () => {
    expect(TooltipProvider).toBeDefined();
  });

  it('should provide tooltip state', () => {
    expect.assertions(1);

    const TooltipConsumer = () => {
      const tooltipContext = useContext(TooltipContext);
      expect(tooltipContext).toMatchObject({
        tooltipOpen: expect.any(Boolean),
        showTooltip: expect.any(Function),
        updateTooltip: expect.any(Function),
        hideTooltip: expect.any(Function),
      });

      return null;
    };

    render(
      <TooltipProvider>
        <TooltipConsumer />
      </TooltipProvider>,
    );
  });

  it('showTooltip should update tooltipData.nearestDatum/datumByKey', () => {
    expect.assertions(1);

    const TooltipConsumer = () => {
      const tooltipContext = useContext(TooltipContext);
      const tooltipOpen = tooltipContext?.tooltipOpen;
      const showTooltip = tooltipContext?.showTooltip;

      useEffect(() => {
        // this triggers a re-render of the component which triggers the assertion block
        if (!tooltipOpen && showTooltip) {
          showTooltip({
            key: 'near',
            index: 0,
            distanceX: 0,
            distanceY: 0,
            datum: { hi: 'hello' },
          });
          showTooltip({
            key: 'far',
            index: 1,
            datum: { good: 'bye' },
            distanceX: NaN,
            // no distance = Infinity
          });
        }
      }, [tooltipOpen, showTooltip]);

      if (tooltipOpen) {
        expect(tooltipContext?.tooltipData).toMatchObject({
          nearestDatum: { key: 'near', index: 0, distance: 0, datum: { hi: 'hello' } },
          datumByKey: {
            near: { key: 'near', index: 0, datum: { hi: 'hello' } },
            far: { key: 'far', index: 1, datum: { good: 'bye' } },
          },
        } as TooltipData<object>);
      }

      return null;
    };

    render(
      <TooltipProvider>
        <TooltipConsumer />
      </TooltipProvider>,
    );
  });
});
