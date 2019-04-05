import { Pattern } from '../';

describe('<Pattern />', () => {
  beforeEach(() => {
    global.console.error = jest.fn();
  });

  test('it should be defined', () => {
    expect(Pattern).toBeDefined();
  });

  test('it should require an id prop', () => {
    const wrapper = mount(
      <Pattern width={4} height={4}>
        <rect />
      </Pattern>
    );
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0].startsWith('Warning: Failed prop type:')).toEqual(true);
  });

  test('it should require a width prop', () => {
    const wrapper = mount(
      <Pattern id="test" height={4}>
        <rect />
      </Pattern>
    );
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0].startsWith('Warning: Failed prop type:')).toEqual(true);
  });

  test('it should require a height prop', () => {
    const wrapper = mount(
      <Pattern id="test" width={4}>
        <rect />
      </Pattern>
    );
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0].startsWith('Warning: Failed prop type:')).toEqual(true);
  });

  test('it should require children', () => {
    const wrapper = mount(<Pattern id="test" width={4} />);
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0].startsWith('Warning: Failed prop type:')).toEqual(true);
  });
});
