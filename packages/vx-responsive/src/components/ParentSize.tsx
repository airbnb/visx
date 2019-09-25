import debounce from 'lodash/debounce';
import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export type ParentSizeProps = {
  className?: string;
  debounceTime?: number;
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

export default class ParentSize extends React.Component<
  ParentSizeProps & JSX.IntrinsicElements['div'],
  ParentSizeState
> {
  static defaultProps = {
    debounceTime: 300,
  };

  animationFrameID: number | null;
  ro: ResizeObserver | undefined;
  target: HTMLDivElement | null = null;

  constructor(props: ParentSizeProps) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    };
    this.resize = debounce(this.resize.bind(this), props.debounceTime);
    this.setTarget = this.setTarget.bind(this);
    this.animationFrameID = null;
  }

  componentDidMount() {
    this.ro = new ResizeObserver((entries = [] /** , observer */) => {
      entries.forEach(entry => {
        const { left, top, width, height } = entry.contentRect;
        this.animationFrameID = window.requestAnimationFrame(() => {
          this.resize({ width, height, top, left });
        });
      });
    });
    if (this.target) this.ro.observe(this.target);
  }

  componentWillUnmount() {
    if (this.animationFrameID) window.cancelAnimationFrame(this.animationFrameID);
    if (this.ro) this.ro.disconnect();
  }

  resize({ width, height, top, left }: ParentSizeState) {
    this.setState(() => ({ width, height, top, left }));
  }

  setTarget(ref: HTMLDivElement | null) {
    this.target = ref;
  }

  render() {
    const { className, children, debounceTime, ...restProps } = this.props;
    return (
      <div
        style={{ width: '100%', height: '100%' }}
        ref={this.setTarget}
        className={className}
        {...restProps}
      >
        {children({
          ...this.state,
          ref: this.target,
          resize: this.resize,
        })}
      </div>
    );
  }
}
export { ParentSizeState as ParentSizeProvidedProps };
