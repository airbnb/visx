import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

export type WithSizeProps = {
  debounceTime?: number;
  enableDebounceLeadingCall?: boolean;
};

export type WithSizeProvidedProps = {
  width?: number;
  height?: number;
  initWidth?: number;
  initHeight?: number;
};

type ResizeParams = {
  width: number;
  height: number;
};

function assertParams(isWindow: boolean, params: ResizeParams | UIEvent): params is UIEvent {
  return isWindow;
}

export function useSize<BaseComponentProps extends WithSizeProps = {}>(
  props: BaseComponentProps & WithSizeProvidedProps,
  isWindow: boolean,
) {
  const { debounceTime = 300, enableDebounceLeadingCall = true, initWidth, initHeight } = props;
  const [eleWidth, setEleWidth] = useState<number | undefined>(undefined);
  const [eleHeight, setEleHeight] = useState<number | undefined>(undefined);
  const resize = useCallback(
    debounce(
      (params?: { width: number; height: number } | UIEvent) => {
        if (assertParams(isWindow, params!)) {
          setEleWidth(window.innerWidth);
          setEleHeight(window.innerHeight);
        } else {
          setEleWidth(params?.width);
          setEleHeight(params?.height);
        }
      },
      debounceTime,
      { leading: enableDebounceLeadingCall },
    ),
    [isWindow],
  );

  return {
    resize,
    eleWidth: eleWidth || initWidth,
    eleHeight: eleHeight || initHeight,
  };
}
