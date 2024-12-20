import debounce from 'lodash/debounce';
import { useEffect, useMemo, useState } from 'react';
import type { DebounceSettings } from '../types/index';

interface ScreenSize {
  width: number;
  height: number;
}

const defaultInitialSize: ScreenSize = {
  width: 0,
  height: 0,
};

export type UseScreenSizeConfig = {
  /** Initial size before measuring the screen. */
  initialSize?: ScreenSize;
} & DebounceSettings;

const useScreenSize = ({
  initialSize = defaultInitialSize,
  debounceTime = 300,
  enableDebounceLeadingCall = true,
}: UseScreenSizeConfig = {}) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(initialSize);

  const handleResize = useMemo(
    () =>
      debounce(
        () => {
          setScreenSize(() => ({
            width: window.innerWidth,
            height: window.innerHeight,
          }));
        },
        debounceTime,
        { leading: enableDebounceLeadingCall },
      ),
    [debounceTime, enableDebounceLeadingCall],
  );

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize, false);
    return () => {
      window.removeEventListener('resize', handleResize, false);
      handleResize.cancel();
    };
  }, [handleResize]);

  return screenSize;
};

export default useScreenSize;
