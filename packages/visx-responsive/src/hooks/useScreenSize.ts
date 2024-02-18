import debounce from 'lodash/debounce';
import { useEffect, useMemo, useState } from 'react';
import { DebounceSettings } from '../types/index';

interface ScreenSize {
  width: number;
  height: number;
}

export type UseScreenSizeConfig = DebounceSettings;

const useScreenSize = ({
  debounceTime = 300,
  enableDebounceLeadingCall = true,
}: UseScreenSizeConfig = {}) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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
    window.addEventListener('resize', handleResize, false);
    return () => {
      window.removeEventListener('resize', handleResize, false);
      handleResize.cancel();
    };
  }, [handleResize]);

  return screenSize;
};

export default useScreenSize;
