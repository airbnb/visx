import React, { useContext } from 'react';
import { mount } from 'enzyme';
import { DataProvider, DataContext } from '../src';
import { DataProviderProps } from '../lib/providers/DataProvider';

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
      const data = useContext(DataContext);
      expect(data.xScale).toBeDefined();
      expect(data.yScale).toBeDefined();
      expect(data.colorScale).toBeDefined();

      return null;
    };

    getWrapper(<DataConsumer />);
  });
});
