import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import { Portal } from '../src';

const PortalWithContainer = () => {
  // useState rather than useRef so it will react to the ref being available for testing purposes
  const [portalContainer, setPortalContainer] = React.useState<HTMLDivElement | null>(null);
  const onRefChange = React.useCallback(
    (node) => {
      setPortalContainer(node);
    },
    []
  );
  return (
    <>
      <div data-testid='inner-div' ref={onRefChange} />
      {portalContainer && (
        <Portal container={portalContainer}>
          <div data-testid='element-in-portal'></div>
        </Portal>
      )}
    </>
  )
};

describe('Portal', () => {
  test('it should be defined', () => {
    expect(Portal).toBeDefined();
  });

  it('should render children at the document root', async () => {
    render(
      <>
        <div data-testid='inner-div' />
        <Portal>
          <div data-testid='element-in-portal'></div>
        </Portal>
      </>,
    );
    const elementInPortal = await screen.findByTestId('element-in-portal');
    expect(elementInPortal).toBeInTheDocument();
    expect(within(screen.getByTestId('inner-div')).queryByTestId('element-in-portal')).not.toBeInTheDocument();
  });

  it('should render children in the provided portal container', async () => {
    render(<PortalWithContainer />);
    const elementInPortal = await screen.findByTestId('element-in-portal');
    expect(elementInPortal).toBeInTheDocument();
    expect(within(screen.getByTestId('inner-div')).getByTestId('element-in-portal')).toBeInTheDocument();
  });
});
