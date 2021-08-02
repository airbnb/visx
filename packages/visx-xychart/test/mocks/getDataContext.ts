/* eslint-disable @typescript-eslint/no-explicit-any */
import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { DataContextType, lightTheme } from '../../src';
import DataRegistry from '../../lib/classes/DataRegistry';

const width = 10;
const height = 10;
const margin = { top: 0, right: 0, bottom: 0, left: 0 };
const noOp = () => {};

function getDataContext(entries?: Parameters<typeof DataRegistry.prototype.registerData>[0]) {
  const dataRegistry = new DataRegistry();
  if (entries) dataRegistry.registerData(entries);

  const mockContext: DataContextType<any, any, any> = {
    dataRegistry,
    registerData: (data) => {
      dataRegistry.registerData(data);
    },
    unregisterData: (keys) => {
      dataRegistry.unregisterData(keys);
    },
    xScale: scaleLinear({ domain: [0, 10], range: [0, width] }),
    yScale: scaleLinear({ domain: [0, 10], range: [0, height] }),
    colorScale: scaleOrdinal({ domain: ['sf', 'ny', 'la'], range: ['purple', 'violet', 'grape'] }),
    width,
    height,
    margin,
    innerWidth: width,
    innerHeight: height,
    theme: lightTheme,
    setDimensions: noOp,
    horizontal: false,
  };

  return mockContext;
}

export default getDataContext;
