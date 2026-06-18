import type React from 'react';
import type {
  Boundary,
  Delay,
  FlipOptions,
  HideOptions,
  Middleware,
  MiddlewareData,
  OffsetOptions,
  OpenChangeReason,
  Padding,
  Placement,
  ReferenceElement,
  ShiftOptions,
  SizeOptions,
  Strategy,
  UseDismissProps,
  UseFloatingOptions,
  UseFloatingReturn,
  UseFocusProps,
  UseHoverProps,
  UseRoleProps,
  VirtualElement,
} from '@floating-ui/react';

export type TooltipPlacement = Placement;
export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';
export type TooltipAlign = 'start' | 'center' | 'end';
export type TooltipCoordinateSpace = 'client' | 'page';
export type TooltipVirtualElement = VirtualElement;

export type TooltipAnchor =
  | { type: 'element'; element: Element | null }
  | { type: 'point'; x: number; y: number; coordinateSpace?: TooltipCoordinateSpace }
  | { type: 'container-point'; x: number; y: number; container: Element | null }
  | { type: 'svg-point'; x: number; y: number; svg: SVGSVGElement | SVGGraphicsElement | null }
  | { type: 'rect'; getRect: () => DOMRect | ClientRect; contextElement?: Element | null }
  | { type: 'virtual'; element: TooltipVirtualElement };

export type FloatingTooltipOffset = OffsetOptions;
export type FloatingTooltipPadding = Padding;
export type FloatingTooltipBoundary = Boundary;
export type FloatingTooltipFlipOptions = FlipOptions;
export type FloatingTooltipShiftOptions = ShiftOptions;
export type FloatingTooltipSizeOptions = SizeOptions;
export type FloatingTooltipHideOptions = HideOptions;

export type FloatingTooltipArrowOptions = {
  padding?: FloatingTooltipPadding;
};

export type FloatingTooltipInteractions =
  | boolean
  | {
      hover?: boolean | UseHoverProps;
      focus?: boolean | UseFocusProps;
      dismiss?: boolean | UseDismissProps;
      role?: boolean | UseRoleProps;
    };

export type FloatingTooltipOpenChangeDetails<TData = unknown> = {
  data: TData | undefined;
  anchor: TooltipAnchor | null;
  event?: Event;
  reason?: OpenChangeReason;
};

export type UseFloatingTooltipOptions<TData = unknown> = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (
    open: boolean,
    details: FloatingTooltipOpenChangeDetails<TData>,
  ) => void;

  anchor?: TooltipAnchor | null;
  defaultAnchor?: TooltipAnchor | null;
  data?: TData;
  defaultData?: TData;

  placement?: TooltipPlacement;
  strategy?: Strategy;
  offset?: number | FloatingTooltipOffset;
  collisionPadding?: FloatingTooltipPadding;
  collisionBoundary?: FloatingTooltipBoundary;
  flip?: boolean | FloatingTooltipFlipOptions;
  shift?: boolean | FloatingTooltipShiftOptions;
  size?: boolean | FloatingTooltipSizeOptions;
  hideWhenDetached?: boolean | FloatingTooltipHideOptions;
  arrow?: boolean | FloatingTooltipArrowOptions;
  trackCursorAxis?: 'none' | 'x' | 'y' | 'both';

  interactions?: FloatingTooltipInteractions;
  middleware?: Middleware[];
  middlewareMode?: 'append' | 'replace';
  whileElementsMounted?: UseFloatingOptions['whileElementsMounted'];

  id?: string;
  role?: 'tooltip' | 'label' | 'description';
  disabled?: boolean;
};

export type UseFloatingTooltipReturn<TData = unknown> = {
  open: boolean;
  mounted: boolean;
  data: TData | undefined;
  anchor: TooltipAnchor | null;
  placement: TooltipPlacement;
  side: TooltipSide;
  align: TooltipAlign;
  strategy: Strategy;
  x: number | null;
  y: number | null;
  floatingStyles: React.CSSProperties;
  middlewareData: MiddlewareData;

  refs: UseFloatingReturn<ReferenceElement>['refs'];
  context: UseFloatingReturn<ReferenceElement>['context'];
  arrowRef: React.RefCallback<SVGSVGElement>;

  setAnchor: (anchor: TooltipAnchor | null) => void;
  setData: (data: TData | undefined) => void;
  update: () => void;
  openTooltip: (data?: TData, anchor?: TooltipAnchor | null) => void;
  closeTooltip: () => void;

  getReferenceProps: <TProps extends React.HTMLProps<Element>>(props?: TProps) => TProps;
  getFloatingProps: <TProps extends React.HTMLProps<HTMLElement>>(props?: TProps) => TProps;
  getArrowProps: <TProps extends React.SVGProps<SVGSVGElement>>(props?: TProps) => TProps;
};

export type FloatingTooltipProviderProps = {
  delay?: Delay;
  closeDelay?: number;
  skipDelay?: number;
  children: React.ReactNode;
};

export type FloatingTooltipRootState<TData = unknown> = UseFloatingTooltipReturn<TData>;

export type FloatingTooltipRootProps<TData = unknown> = UseFloatingTooltipOptions<TData> & {
  forceMount?: boolean;
  children:
    | React.ReactNode
    | ((state: FloatingTooltipRootState<TData>) => React.ReactNode);
};

export type FloatingTooltipTriggerState = {
  open: boolean;
  side: TooltipSide;
  align: TooltipAlign;
};

export type FloatingTooltipTriggerProps = {
  render:
    | React.ReactElement
    | ((props: React.HTMLProps<Element>, state: FloatingTooltipTriggerState) => React.ReactElement);
  disabled?: boolean;
};

export type FloatingTooltipPortalProps = {
  container?: HTMLElement | ShadowRoot | React.RefObject<HTMLElement | ShadowRoot | null> | null;
  disabled?: boolean;
  children: React.ReactNode;
};

export type FloatingTooltipPositionerState = FloatingTooltipRootState;

export type FloatingTooltipPositionerProps = React.HTMLAttributes<HTMLDivElement> & {
  render?:
    | React.ReactElement
    | ((
        props: React.HTMLProps<HTMLDivElement>,
        state: FloatingTooltipPositionerState,
      ) => React.ReactElement);
};

export type FloatingTooltipContentState = FloatingTooltipRootState;

export type FloatingTooltipContentProps = React.HTMLAttributes<HTMLDivElement> & {
  render?:
    | React.ReactElement
    | ((
        props: React.HTMLProps<HTMLDivElement>,
        state: FloatingTooltipContentState,
      ) => React.ReactElement);
};

export type FloatingTooltipArrowState = FloatingTooltipRootState;

export type FloatingTooltipArrowProps = Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
  width?: number;
  height?: number;
  padding?: number;
  render?:
    | React.ReactElement
    | ((
        props: React.SVGProps<SVGSVGElement>,
        state: FloatingTooltipArrowState,
      ) => React.ReactElement);
};
