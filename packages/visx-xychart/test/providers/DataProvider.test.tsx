import React, { useContext, useEffect } from 'react';
import { mount } from 'enzyme';
import { DataProvider, DataContext } from '../../src';
import { DataProviderProps } from '../../lib/providers/DataProvider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getWrapper = (consumer: React.ReactNode, props?: DataProviderProps<any, any>) => {
  mount(
    <DataProvider xScale={{ type: 'linear' }} yScale={{ type: 'linear' }} {...props}>
      {consumer}
    </DataProvider>,
  );
};
describe('<DataProvider />', () => {
  it('should be defined', () => {
    expect(DataProvider).toBeDefined();
  });

  it('should provide a XYChartTheme', () => {
    expect.assertions(1);

    const DataConsumer = () => {
      const data = useContext(DataContext);
      expect(data.theme).toBeDefined();

      return null;
    };

    getWrapper(<DataConsumer />);
  });

  it('should provide dimensions', () => {
    expect.assertions(5);

    const DataConsumer = () => {
      const data = useContext(DataContext);
      expect(data.width).toEqual(expect.any(Number));
      expect(data.height).toEqual(expect.any(Number));
      expect(data.innerWidth).toEqual(expect.any(Number));
      expect(data.innerHeight).toEqual(expect.any(Number));
      expect(data.margin).toMatchObject({
        top: expect.any(Number),
        right: expect.any(Number),
        bottom: expect.any(Number),
        left: expect.any(Number),
      });

      return null;
    };

    getWrapper(<DataConsumer />);
  });

  it('should provide scales', () => {
    expect.assertions(3);

    const DataConsumer = () => {
      const { xScale, yScale, colorScale, registerData } = useContext(DataContext);

      // some data needs to be registered for valid scales to be available
      useEffect(() => {
        if (registerData) {
          registerData({
            key: 'visx',
            xAccessor: (d) => d.x,
            yAccessor: (d) => d.y,
            data: [
              { x: 0, y: 1 },
              { x: 5, y: 7 },
            ],
          });
        }
      }, [registerData]);

      useEffect(() => {
        if (xScale && yScale && colorScale) {
          expect(xScale).toBeDefined();
          expect(yScale).toBeDefined();
          expect(colorScale).toBeDefined();
        }
      }, [xScale, yScale, colorScale]);

      return null;
    };

    getWrapper(<DataConsumer />);
  });
});
