import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export default class ParentSize extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, top: 0, left: 0 };
    this.resize = debounce(this.resize.bind(this), props.debounceTime);
    this.setTarget = this.setTarget.bind(this);
    this.animationFrameID = null;
  }
  componentDidMount() {
    this.ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const { left, top, width, height } = entry.contentRect;
        this.animationFrameID = window.requestAnimationFrame(() => {
          this.resize({
            width,
            height,
            top,
            left
          });
        });
      }
    });
    this.ro.observe(this.target);
  }
  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrameID);
    this.ro.disconnect();
  }
  resize({ width, height, top, left }) {
    this.setState(() => ({
      width,
      height,
      top,
      left
    }));
  }
  setTarget(ref) {
    this.target = ref;
  }
  render() {
    const { className, children } = this.props;
    return (
      <div style={{ width: '100%', height: '100%' }} ref={this.setTarget} className={className}>
        {children({
          ...this.state,
          ref: this.target,
          resize: this.resize
        })}
      </div>
    );
  }
}

ParentSize.defaultProps = {
  debounceTime: 300
};

ParentSize.propTypes = {
  className: PropTypes.string,
  children: PropTypes.func.isRequired,
  debounceTime: PropTypes.number
};
