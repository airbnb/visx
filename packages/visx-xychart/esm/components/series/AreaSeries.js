import React from 'react';
import BaseAreaSeries from './private/BaseAreaSeries';
export default function AreaSeries(props) {
  // @TODO currently generics for non-SeriesProps are not passed correctly in withRegisteredData HOC
  // @ts-expect-error
  return /*#__PURE__*/React.createElement(BaseAreaSeries, props);
}