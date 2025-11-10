import debounce from 'lodash/debounce';
import { Component } from 'react';
import type { ComponentType } from 'react';
import type { Simplify, DebounceSettings } from '../types';

type WithScreenSizeConfig = {
  /** @deprecated use `debounceTime` instead */
  windowResizeDebounceTime?: number;
} & DebounceSettings;

/**
 * @deprecated
 * @TODO remove in the next major version - exported for backwards compatibility
 */
export type WithParentSizeProps = Omit<WithScreenSizeConfig, 'debounceTime'>;

type WithScreenSizeState = {
  screenWidth?: number;
  screenHeight?: number;
};

export type WithScreenSizeProvidedProps = WithScreenSizeState;

type WithScreenSizeComponentProps<P extends WithScreenSizeProvidedProps> = Simplify<
  Omit<P, keyof WithScreenSizeProvidedProps> & WithScreenSizeConfig
>;

export default function withScreenSize<P extends WithScreenSizeProvidedProps>(
  BaseComponent: ComponentType<P>,
): ComponentType<WithScreenSizeComponentProps<P>> {
  return class WrappedComponent extends Component<
    WithScreenSizeComponentProps<P>,
    WithScreenSizeState
  > {
    displayName = `withScreenSize(${
      BaseComponent.displayName ?? BaseComponent.name ?? 'Component'
    })`;
    state = {
      screenWidth: undefined,
      screenHeight: undefined,
    };

    componentDidMount() {
      window.addEventListener('resize', this.resize, false);
      this.resize();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.resize, false);
      this.resize.cancel();
    }

    resize = debounce(
      // eslint-disable-next-line unicorn/consistent-function-scoping
      () => {
        this.setState((/** prevState, props */) => ({
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
        }));
      },
      this.props.debounceTime ?? this.props.windowResizeDebounceTime ?? 300,
      { leading: this.props.enableDebounceLeadingCall ?? true },
    );

    render() {
      const { screenWidth, screenHeight } = this.state;
      return screenWidth == null || screenHeight == null ? null : (
        <BaseComponent
          screenWidth={screenWidth}
          screenHeight={screenHeight}
          {...(this.props as P)}
        />
      );
    }
  };
}
