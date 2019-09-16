import React from 'react';
import Legend, { LegendProps } from '../legend/Legend';

// LegendSize.propTypes = {
//   scale: PropTypes.func.isRequired,
//   domain: PropTypes.array,
//   steps: PropTypes.number,
//   labelFormat: PropTypes.func,
//   labelTransform: PropTypes.func,
// };

export default function LegendSize({
  scale,
  domain: inputDomain,
  steps = 5,
  labelFormat = x => x,
  labelTransform = defaultTransform,
  ...restProps
}) {
  const domain = inputDomain || defaultDomain({ steps, scale });
  return (
    <Legend
      scale={scale}
      domain={domain}
      labelFormat={labelFormat}
      labelTransform={labelTransform}
      {...restProps}
    />
  );
}

function defaultDomain({ steps, scale }) {
  const domain = scale.domain();
  const start = domain[0];
  const end = domain[domain.length - 1];
  const step = (end - start) / (steps - 1);
  return new Array(steps).fill(1).reduce((acc, cur, i) => {
    acc.push(start + i * step);
    return acc;
  }, []);
}

function defaultTransform({ scale, labelFormat }) {
  return (d, i) => {
    return {
      text: `${labelFormat(d, i)}`,
      value: scale(d),
      datum: d,
      index: i,
    };
  };
}
