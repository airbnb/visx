import React from "react";

import BrushChart from "./BrushChart";

const Chart = ({ width, height }: { width: number; height: number }) => {
  return <BrushChart width={width} height={height} />;
};

export default Chart;
