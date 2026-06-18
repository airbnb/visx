import {
  FloatingArrow,
  FloatingDelayGroup,
  FloatingPortal,
  type FloatingPortalProps as FloatingUiPortalProps,
} from '@floating-ui/react';
import React from 'react';
import { FloatingTooltipContextProvider, useFloatingTooltipContext } from './context';
import useFloatingTooltip from './useFloatingTooltip';
import type {
  FloatingTooltipArrowProps,
  FloatingTooltipArrowState,
  FloatingTooltipContentProps,
  FloatingTooltipContentState,
  FloatingTooltipPortalProps,
  FloatingTooltipPositionerProps,
  FloatingTooltipPositionerState,
  FloatingTooltipProviderProps,
  FloatingTooltipRootProps,
  FloatingTooltipRootState,
  FloatingTooltipTriggerProps,
} from './types';

type RenderElementProps<ElementProps, State> = {
  defaultElement: React.ReactElement;
  props: ElementProps;
  render?: React.ReactElement | ((props: ElementProps, state: State) => React.ReactElement);
  state: State;
};

type FloatingCssVariables = React.CSSProperties & {
  '--visx-tooltip-transform-origin'?: string;
  '--visx-tooltip-arrow-x'?: string;
  '--visx-tooltip-arrow-y'?: string;
};

type FloatingDataAttributes = {
  [key: `data-${string}`]: string | undefined;
};

type FloatingReferenceProps = React.HTMLProps<Element> & FloatingDataAttributes;
type FloatingDivProps = React.HTMLProps<HTMLDivElement> & FloatingDataAttributes;
type FloatingSvgProps = React.SVGProps<SVGSVGElement> & FloatingDataAttributes;

function renderElement<ElementProps, State>({
  defaultElement,
  props,
  render,
  state,
}: RenderElementProps<ElementProps, State>) {
  if (typeof render === 'function') return render(props, state);

  if (React.isValidElement(render)) {
    return React.cloneElement(render, props as Partial<unknown> & React.Attributes);
  }

  return React.cloneElement(defaultElement, props as Partial<unknown> & React.Attributes);
}

function getTransformOrigin(state: FloatingTooltipRootState) {
  const arrowX = state.middlewareData.arrow?.x;
  const arrowY = state.middlewareData.arrow?.y;

  switch (state.side) {
    case 'top':
      return `${arrowX == null ? '50%' : `${arrowX}px`} bottom`;
    case 'bottom':
      return `${arrowX == null ? '50%' : `${arrowX}px`} top`;
    case 'left':
      return `right ${arrowY == null ? '50%' : `${arrowY}px`}`;
    case 'right':
      return `left ${arrowY == null ? '50%' : `${arrowY}px`}`;
    default:
      return '50% 50%';
  }
}

function getFloatingCssVariables(state: FloatingTooltipRootState): FloatingCssVariables {
  const arrowX = state.middlewareData.arrow?.x;
  const arrowY = state.middlewareData.arrow?.y;

  return {
    '--visx-tooltip-transform-origin': getTransformOrigin(state),
    '--visx-tooltip-arrow-x': arrowX == null ? undefined : `${arrowX}px`,
    '--visx-tooltip-arrow-y': arrowY == null ? undefined : `${arrowY}px`,
  };
}

function getPortalRoot(container: FloatingTooltipPortalProps['container']) {
  if (!container) return undefined;
  if ('current' in container) return container.current;
  return container;
}

function Provider({
  children,
  closeDelay = 0,
  delay = 600,
  skipDelay = 400,
}: FloatingTooltipProviderProps) {
  const floatingDelay =
    typeof delay === 'number'
      ? { open: delay, close: closeDelay }
      : { open: delay.open ?? 600, close: delay.close ?? closeDelay };

  return (
    <FloatingDelayGroup delay={floatingDelay} timeoutMs={skipDelay}>
      {children}
    </FloatingDelayGroup>
  );
}

function Root<TData = unknown>({
  children,
  forceMount = false,
  ...options
}: FloatingTooltipRootProps<TData>) {
  const tooltip = useFloatingTooltip<TData>(options);
  const state = {
    ...tooltip,
    mounted: tooltip.open || forceMount,
  };

  return (
    <FloatingTooltipContextProvider value={state}>
      {typeof children === 'function' ? children(state) : children}
    </FloatingTooltipContextProvider>
  );
}

function Trigger({ disabled = false, render }: FloatingTooltipTriggerProps) {
  const state = useFloatingTooltipContext('FloatingTooltip.Trigger');
  const setTriggerReference = React.useCallback(
    (node: Element | null) => {
      if (disabled) {
        state.refs.setPositionReference(node);
        state.refs.setReference(null);
        return;
      }

      state.refs.setReference(node);
    },
    [disabled, state.refs],
  );
  const triggerState = {
    open: state.open,
    side: state.side,
    align: state.align,
  };
  const referenceProps: FloatingReferenceProps = {
    'aria-disabled': disabled || undefined,
    'data-disabled': disabled ? '' : undefined,
    'data-state': state.open ? 'open' : 'closed',
    'data-visx-tooltip-trigger': '',
    ref: setTriggerReference,
  };
  const triggerProps = disabled ? referenceProps : state.getReferenceProps(referenceProps);

  if (typeof render === 'function') return render(triggerProps, triggerState);

  return React.cloneElement(render, triggerProps as Partial<unknown> & React.Attributes);
}

function Portal({ children, container, disabled = false }: FloatingTooltipPortalProps) {
  const state = useFloatingTooltipContext('FloatingTooltip.Portal');

  if (!state.mounted) return null;
  if (disabled) return children;

  return (
    <FloatingPortal root={getPortalRoot(container) as FloatingUiPortalProps['root']}>
      {children}
    </FloatingPortal>
  );
}

function Positioner({ children, id, render, style, ...restProps }: FloatingTooltipPositionerProps) {
  const state = useFloatingTooltipContext('FloatingTooltip.Positioner');

  if (!state.mounted) return null;

  const anchorHidden = Boolean(state.middlewareData.hide?.referenceHidden);
  const basePositionerProps: FloatingDivProps = {
    ...restProps,
    children,
    'data-anchor-hidden': anchorHidden ? '' : undefined,
    'data-align': state.align,
    'data-side': state.side,
    'data-state': state.open ? 'open' : 'closed',
    'data-visx-tooltip': '',
    ...(id === undefined ? null : { id }),
    ref: state.refs.setFloating,
    style: {
      ...state.floatingStyles,
      ...getFloatingCssVariables(state),
      ...style,
    },
  };
  const positionerProps = state.getFloatingProps(basePositionerProps);

  return renderElement<React.HTMLProps<HTMLDivElement>, FloatingTooltipPositionerState>({
    defaultElement: <div />,
    props: positionerProps,
    render,
    state,
  });
}

function Content({ children, render, ...restProps }: FloatingTooltipContentProps) {
  const state = useFloatingTooltipContext('FloatingTooltip.Content');

  if (!state.mounted) return null;

  const contentProps: FloatingDivProps = {
    ...restProps,
    children,
    'data-state': state.open ? 'open' : 'closed',
    'data-visx-tooltip-content': '',
  };

  return renderElement<React.HTMLProps<HTMLDivElement>, FloatingTooltipContentState>({
    defaultElement: <div />,
    props: contentProps,
    render,
    state,
  });
}

function Arrow({
  height = 7,
  padding: _padding,
  render,
  tipRadius = 0,
  width = 14,
  ...restProps
}: FloatingTooltipArrowProps) {
  const state = useFloatingTooltipContext('FloatingTooltip.Arrow');

  if (!state.mounted) return null;

  if (render) {
    const baseArrowProps: FloatingSvgProps = {
      ...restProps,
      height,
      'data-visx-tooltip-arrow': '',
      ref: state.arrowRef,
      width,
    };
    const arrowProps = state.getArrowProps(baseArrowProps);

    return renderElement<React.SVGProps<SVGSVGElement>, FloatingTooltipArrowState>({
      defaultElement: <svg />,
      props: arrowProps,
      render,
      state,
    });
  }

  return (
    <FloatingArrow
      {...restProps}
      data-visx-tooltip-arrow=""
      ref={state.arrowRef}
      context={state.context}
      width={width}
      height={height}
      tipRadius={tipRadius}
    />
  );
}

const FloatingTooltip = {
  Arrow,
  Content,
  Portal,
  Positioner,
  Provider,
  Root,
  Trigger,
};

export default FloatingTooltip;
