import { PatternLines } from '../src';

describe('<PatternLines />', () => {
  beforeEach(() => {
    global.console.error = jest.fn();
  });

  test('it should be defined', () => {
    expect(PatternLines).toBeDefined();
  });

  test('it should require an id prop', () => {
    const wrapper = mount(<PatternLines width={4} height={4} />);
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0]).toEqual(
      'Warning: Failed prop type: The prop `id` is marked as required in `PatternLines`, but its value is `undefined`.\n    in PatternLines'
    );
  });

  test('it should require a width prop', () => {
    const wrapper = mount(<PatternLines id="test" height={4} />);
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0]).toEqual(
      'Warning: Failed prop type: The prop `width` is marked as required in `PatternLines`, but its value is `undefined`.\n    in PatternLines'
    );
  });

  test('it should require a height prop', () => {
    const wrapper = mount(<PatternLines id="test" width={4} />);
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0]).toEqual(
      'Warning: Failed prop type: The prop `height` is marked as required in `PatternLines`, but its value is `undefined`.\n    in PatternLines'
    );
  });

  test('it should render a rect background if background prop defined', () => {
    const wrapper = mount(<PatternLines id="test" height={4} width={4} background="blue" />);
    expect(wrapper.find('rect').length).toEqual(1);
  });

  test('it should not render a rect background if no background prop', () => {
    const wrapper = mount(<PatternLines id="test" height={4} width={4} />);
    expect(wrapper.find('rect').length).toEqual(0);
  });
});
