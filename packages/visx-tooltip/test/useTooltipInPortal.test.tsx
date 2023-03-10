import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import { shallow } from 'enzyme';
import { ResizeObserver } from '@juggle/resize-observer';
import { useTooltipInPortal } from '../src';
import { UseTooltipPortalOptions } from '../src/hooks/useTooltipInPortal';

interface TooltipWithZIndexProps {
  zIndexOption?: UseTooltipPortalOptions['zIndex'];
  zIndexProp?: UseTooltipPortalOptions['zIndex'];
}

const TooltipWithZIndex = ({ zIndexOption, zIndexProp }: TooltipWithZIndexProps) => {
  const { TooltipInPortal } = useTooltipInPortal({
    polyfill: ResizeObserver,
    zIndex: zIndexOption,
  });
  return <TooltipInPortal zIndex={zIndexProp}>Hello</TooltipInPortal>;
};

interface TooltipWithPortalContainerProps {
  shouldUsePortalContainer: boolean;
}

const TooltipWithPortalContainer = ({
  shouldUsePortalContainer,
}: TooltipWithPortalContainerProps) => {
  // useState rather than useRef so it will react to the ref being available for testing purposes
  const [portalContainer, setPortalContainer] = React.useState<HTMLDivElement | null>(null);
  const onRefChange = React.useCallback((node) => {
    setPortalContainer(node);
  }, []);

  const { TooltipInPortal } = useTooltipInPortal({
    polyfill: ResizeObserver,
    portalContainer: shouldUsePortalContainer ? portalContainer ?? undefined : undefined,
  });

  return (
    <div data-testid="inner-div" ref={shouldUsePortalContainer ? onRefChange : undefined}>
      <TooltipInPortal>
        <div data-testid="element-in-tooltip" />
      </TooltipInPortal>
    </div>
  );
};

describe('useTooltipInPortal()', () => {
  test('it should be defined', () => {
    expect(useTooltipInPortal).toBeDefined();
  });

  describe('zIndex', () => {
    it('should pass zIndex prop from options to Portal', () => {
      const wrapper = shallow(<TooltipWithZIndex zIndexOption={1} />, {
        disableLifecycleMethods: true,
      }).dive();
      const zIndex = wrapper.find('Portal').prop('zIndex');
      expect(zIndex).toBe(1);
    });

    it('should pass zIndex prop from component to Portal', () => {
      const wrapper = shallow(
        <TooltipWithZIndex zIndexOption={1} zIndexProp="var(--tooltip-zindex)" />,
        {
          disableLifecycleMethods: true,
        },
      ).dive();
      const zIndex = wrapper.find('Portal').prop('zIndex');
      expect(zIndex).toBe('var(--tooltip-zindex)');
    });
  });

  describe('portalContainer', () => {
    it('should render tooltip at the document root', async () => {
      render(<TooltipWithPortalContainer shouldUsePortalContainer={false} />);
      const elementInPortal = await screen.findByTestId('element-in-tooltip');
      expect(elementInPortal).toBeInTheDocument();
      expect(
        within(screen.getByTestId('inner-div')).queryByTestId('element-in-tooltip'),
      ).not.toBeInTheDocument();
    });

    it('should render tooltip in the provided portal container', async () => {
      render(<TooltipWithPortalContainer shouldUsePortalContainer />);
      const elementInPortal = await screen.findByTestId('element-in-tooltip');
      expect(elementInPortal).toBeInTheDocument();
      expect(
        within(screen.getByTestId('inner-div')).getByTestId('element-in-tooltip'),
      ).toBeInTheDocument();
    });
  });
});
