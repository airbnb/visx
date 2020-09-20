import debounce from 'lodash/debounce';
import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export type ParentSizeProps = {
  /** Optional `className` to add to the parent `div` wrapper used for size measurement. */
  className?: string;
  /** Child render updates upon resize are delayed until `debounceTime` milliseconds _after_ the last resize event is observed. */
  debounceTime?: number;
  /** Optional flag to toggle leading debounce calls. When set to true this will ensure that the component always renders immediately. (defaults to true) */
  enableDebounceLeadingCall?: boolean;
  /** Optional `style` object to apply to the parent `div` wrapper used for size measurement. */
  parentSizeStyles?: React.CSSProperties;
  /** Child render function `({ width, height, top, left, ref, resize }) => ReactNode`. */
  children: (
    args: {
      ref: HTMLDivElement | null;
      resize: (state: ParentSizeState) => void;
    } & ParentSizeState,
  ) => React.ReactNode;
};

type ParentSizeState = {
  width: number;
  height: number;
  top: number;
  left: number;
};

export type ParentSizeProvidedProps = ParentSizeState;

export default class ParentSize extends React.Component<
  ParentSizeProps & Omit<JSX.IntrinsicElements['div'], keyof ParentSizeProps>,
  ParentSizeState
> {
  static defaultProps = {
    debounceTime: 300,
    enableDebounceLeadingCall: true,
    parentSizeStyles: { width: '100%', height: '100%' },
  };
  animationFrameID: number = 0;
  resizeObserver: ResizeObserver | undefined;
  target: HTMLDivElement | null = null;

  state = {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  };

  componentDidMount() {
    this.resizeObserver = new ResizeObserver((entries = [] /** , observer */) => {
      entries.forEach(entry => {
        const { left, top, width, height } = entry.contentRect;
        this.animationFrameID = window.requestAnimationFrame(() => {
          this.resize({ width, height, top, left });
        });
      });
    });
    if (this.target) this.resizeObserver.observe(this.target);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrameID);
    if (this.resizeObserver) this.resizeObserver.disconnect();
    this.resize.cancel();
  }

  resize = debounce(
    ({ width, height, top, left }: ParentSizeState) => {
      this.setState(() => ({ width, height, top, left }));
    },
    this.props.debounceTime,
    { leading: this.props.enableDebounceLeadingCall },
  );

  setTarget = (ref: HTMLDivElement | null) => {
    this.target = ref;
  };

  render() {
    const {
      className,
      children,
      debounceTime,
      parentSizeStyles,
      enableDebounceLeadingCall,
      ...restProps
    } = this.props;

    return (
      <div style={parentSizeStyles} ref={this.setTarget} className={className} {...restProps}>
        {children({
          ...this.state,
          ref: this.target,
          resize: this.resize,
        })}
      </div>
    );
  }
}
