import { useEffect, useState, useCallback } from 'react';
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

export function useScreenSize<BaseComponentProps extends WithSizeProps = {}>(
  props: BaseComponentProps & WithSizeProvidedProps,
) {
  const { debounceTime = 300, enableDebounceLeadingCall = true, initWidth, initHeight } = props;
  const [eleWidth, setEleWidth] = useState<number | undefined>(undefined);
  const [eleHeight, setEleHeight] = useState<number | undefined>(undefined);
  const resize = useCallback(
    debounce(
      () => {
        setEleWidth(window.innerWidth);
        setEleHeight(window.innerHeight);
      },
      debounceTime,
      { leading: enableDebounceLeadingCall },
    ),
    [],
  );

  useEffect(() => {
    window.addEventListener('resize', resize, false);
    resize();
    return () => {
      window.removeEventListener('resize', resize, false);
      resize.cancel();
    };
  }, [resize]);

  return [eleWidth || initWidth, eleHeight || initHeight];
}
