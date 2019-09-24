// @ts-ignore ts-migrate(2307) FIXME: Cannot find module ':ts-utils/types/WithDefaultPro... Remove this comment to see the full error message
import { WithDefaultProps } from ':ts-utils/types/WithDefaultProps';
// @ts-ignore ts-migrate(1259) FIXME: Module '"/Users/sergii_rudenko/Projects/vx/node_mo... Remove this comment to see the full error message
import debounce from 'lodash/debounce';
// @ts-ignore ts-migrate(1259) FIXME: Module '"/Users/sergii_rudenko/Projects/vx/node_mo... Remove this comment to see the full error message
import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

type OwnProps = {
  className?: string;
  debounceTime?: number;
};

type State = any;

type Props = WithDefaultProps<OwnProps, typeof ParentSize.defaultProps>;

export default class ParentSize extends React.Component<Props, State> {
  static defaultProps = {
    debounceTime: 300,
  };

  animationFrameID: any;
  props: any;
  ro: any;
  setState: any;
  state: any;
  target: any;

  constructor(props: Props) {
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
    this.ro.observe(this.target);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrameID);
    this.ro.disconnect();
  }

  resize({ width, height, top, left }) {
    this.setState(() => ({ width, height, top, left }));
  }

  setTarget(ref) {
    this.target = ref;
  }

  render() {
    const { className, children, debounceTime, ...restProps } = this.props;
    return (
      // @ts-ignore ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
