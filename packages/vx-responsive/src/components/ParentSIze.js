import React from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';

export default class ParentSize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.resize = this.resize.bind(this);
    this.setTarget = this.setTarget.bind(this);
  }
  componentDidMount() {
    this.ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const { left, top, width, height } = entry.contentRect;
        this.resize({
          width,
          height,
          top,
          left,
        });
      }
    });
    this.ro.observe(this.target);
  }
  componentWillUnmount() {
    this.ro.disconnect();
  }
  resize({ width, height, top, left }) {
    this.setState(() => ({
      width,
      height,
      top,
      left,
    }));
  }
  setTarget(ref) {
    this.target = ref;
  }
  render() {
    const { className, children } = this.props;
    return (
      <div ref={this.setTarget} className={className}>
        {children({
          ...this.state,
          ref: this.target,
          resize: this.resize,
        })}
      </div>
    );
  }
}

ParentSize.propTypes = {
  className: PropTypes.string,
  children: PropTypes.func.isRequired,
};
