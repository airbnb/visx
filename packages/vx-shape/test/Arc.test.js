import { Arc } from '../src';
const browserUsage = [
  {
    date: '2015 Jun 15',
    'Google Chrome': '48.09',
    'Internet Explorer': '24.14',
    Firefox: '18.82',
    Safari: '7.46',
    'Microsoft Edge': '0.03',
    Opera: '1.32',
    Mozilla: '0.12',
    'Other/Unknown': '0.01'
  },
  {
    date: '2015 Jun 16',
    'Google Chrome': '48',
    'Internet Explorer': '24.19',
    Firefox: '18.96',
    Safari: '7.36',
    'Microsoft Edge': '0.03',
    Opera: '1.32',
    Mozilla: '0.12',
    'Other/Unknown': '0.01'
  }
];

const ArcWrapper = ({ ...restProps }) => shallow(<Arc data={browserUsage} {...restProps} />);
const ArcChildren = ({ children, ...restProps }) =>
  shallow(
    <Arc data={browserUsage} {...restProps}>
      {children}
    </Arc>
  );

describe('<Arc />', () => {
  test('it should be defined', () => {
    expect(Arc).toBeDefined();
  });

  test('it should have the .vx-arcs-group class', () => {
    expect(ArcWrapper().prop('className')).toBe('vx-arc');
  });

  test('it should contain paths', () => {
    expect(ArcWrapper().find('path').length).toBeGreaterThan(0);
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    const wrapper = ArcChildren({ children: fn });
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with { path }', () => {
    const fn = jest.fn();
    const wrapper = ArcChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys.includes('path')).toEqual(true);
  });

  test('it should take an innerRadius number prop', () => {
    const fn = jest.fn();
    const wrapper = ArcChildren({ children: fn, innerRadius: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.innerRadius()()).toBe(42);
  });

  test('it should take an innerRadius fn prop', () => {
    const fn = jest.fn();
    const wrapper = ArcChildren({ children: fn, innerRadius: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.innerRadius()()).toBe(42);
  });

  test('it should take an outerRadius number prop', () => {
    const fn = jest.fn();
    const wrapper = ArcChildren({ children: fn, outerRadius: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.outerRadius()()).toBe(42);
  });

  test('it should take an outerRadius fn prop', () => {
    const fn = jest.fn();
    const wrapper = ArcChildren({ children: fn, outerRadius: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.outerRadius()()).toBe(42);
  });

  test('it should take an cornerRadius number prop', () => {
    const fn = jest.fn();
    const wrapper = ArcChildren({ children: fn, cornerRadius: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.cornerRadius()()).toBe(42);
  });

  test('it should take an cornerRadius fn prop', () => {
    const fn = jest.fn();
    const wrapper = ArcChildren({ children: fn, cornerRadius: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.cornerRadius()()).toBe(42);
  });

  test('calling path with data returns a string', () => {
    const fn = jest.fn();
    const wrapper = ArcChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    expect(typeof args.path(browserUsage)).toBe('string');
  });

  test('it should expose its ref via an innerRef prop', done => {
    const refCallback = n => {
      expect(n.tagName).toEqual('PATH');
      done();
    };
    mount(<Arc data={browserUsage} innerRef={refCallback} />);
  });
});
