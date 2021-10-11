import { AxisScale } from '@visx/axis';
import { scaleBand, scaleLinear } from '@visx/scale';
import { PositionScale } from '@visx/shape/lib/types';

import findNearestDatumX from '../../src/utils/findNearestDatumX';
import findNearestDatumY from '../../src/utils/findNearestDatumY';
import findNearestDatumXY from '../../src/utils/findNearestDatumXY';
import findNearestDatumSingleDimension from '../../src/utils/findNearestDatumSingleDimension';
import findNearestStackDatum from '../../src/utils/findNearestStackDatum';
import findNearestGroupDatum from '../../src/utils/findNearestGroupDatum';
import { BarStackDatum, NearestDatumArgs } from '../../src';

type Datum = { xVal: number; yVal: string };

const params: NearestDatumArgs<AxisScale, AxisScale, Datum> = {
  dataKey: 'visx',
  width: 10,
  height: 10,
  point: { x: 3, y: 8 },
  data: [
    { xVal: 0, yVal: '0' },
    { xVal: 8, yVal: '8' },
  ],
  xAccessor: (d) => d.xVal,
  yAccessor: (d) => d.yVal,
  xScale: scaleLinear({ domain: [0, 10], range: [0, 10] }),
  yScale: scaleBand({ domain: ['0', '8'], range: [0, 10] }),
};

describe('findNearestDatumX', () => {
  it('should be defined', () => {
    expect(findNearestDatumX).toBeDefined();
  });

  it('should find the nearest datum', () => {
    expect(
      findNearestDatumX({
        ...params,
      })!.datum,
    ).toEqual({ xVal: 0, yVal: '0' });
  });
});

describe('findNearestDatumY', () => {
  it('should be defined', () => {
    expect(findNearestDatumY).toBeDefined();
  });
  it('should find the nearest datum', () => {
    expect(
      findNearestDatumY({
        ...params,
      })!.datum,
    ).toEqual({ xVal: 8, yVal: '8' });
  });
});

describe('findNearestDatumXY', () => {
  it('should be defined', () => {
    expect(findNearestDatumXY).toBeDefined();
  });

  it('should find the nearest datum', () => {
    expect(
      findNearestDatumXY({
        ...params,
        point: { x: 3, y: 3 },
      })!.datum,
    ).toEqual({ xVal: 0, yVal: '0' });
  });
});

describe('findNearestDatumSingleDimension', () => {
  it('should be defined', () => {
    expect(findNearestDatumSingleDimension).toBeDefined();
  });

  it('should find the nearest datum for scaleLinear', () => {
    expect(
      findNearestDatumSingleDimension({
        scale: params.xScale,
        accessor: params.xAccessor,
        data: params.data,
        scaledValue: 3,
      })!.datum,
    ).toEqual({ xVal: 0, yVal: '0' });

    expect(
      findNearestDatumSingleDimension({
        scale: params.xScale,
        accessor: params.xAccessor,
        data: params.data,
        scaledValue: 7,
      })!.datum,
    ).toEqual({ xVal: 8, yVal: '8' });
  });

  it('should find the nearest datum for scaleBand', () => {
    expect(
      findNearestDatumSingleDimension({
        scale: params.yScale,
        accessor: params.yAccessor,
        data: params.data,
        scaledValue: 3,
      })!.datum,
    ).toEqual({ xVal: 0, yVal: '0' });

    expect(
      findNearestDatumSingleDimension({
        scale: params.yScale,
        accessor: params.yAccessor,
        data: params.data,
        scaledValue: 8,
      })!.datum,
    ).toEqual({ xVal: 8, yVal: '8' });
  });
});

describe('findNearestStackDatum', () => {
  it('should be defined', () => {
    expect(findNearestStackDatum).toBeDefined();
  });

  it('should find the nearest datum', () => {
    const d1 = { yVal: '🍌' };
    const d2 = { yVal: '🚀' };
    expect(
      findNearestStackDatum(
        {
          ...params,
          // type is not technically correct, but coerce for test
        } as unknown as NearestDatumArgs<AxisScale, AxisScale, BarStackDatum<AxisScale, AxisScale>>,
        [d1, d2],
        true,
      )!.datum,
    ).toEqual(d2); // nearest datum index=1
  });
});

describe('findNearestGroupDatum', () => {
  it('should be defined', () => {
    expect(findNearestGroupDatum).toBeDefined();
  });

  it('should find the nearest datum', () => {
    expect(
      findNearestGroupDatum(
        {
          ...params,
        } as NearestDatumArgs<PositionScale, PositionScale, Datum>,
        scaleBand({ domain: [params.dataKey], range: [0, 10] }),
      )!.datum,
    ).toEqual({ xVal: 0, yVal: '0' }); // non-horizontal means nearest x value
  });

  it('should set distance to 0', () => {
    expect(
      findNearestGroupDatum(
        {
          ...params,
        } as NearestDatumArgs<PositionScale, PositionScale, Datum>,
        scaleBand({ domain: [params.dataKey], range: [0, 10] }),
        true,
      )!.distanceY,
    ).toEqual(0);
  });
});
