import { useEffect } from 'react';
import { useSize, WithSizeProps, WithSizeProvidedProps } from './useSize';

export function useScreenSize<BaseComponentProps extends WithSizeProps = {}>(
  props: BaseComponentProps & WithSizeProvidedProps,
) {
  const { resize, eleHeight, eleWidth } = useSize(props, true);

  useEffect(() => {
    window.addEventListener('resize', resize, false);
    resize();
    return () => {
      window.removeEventListener('resize', resize, false);
      resize.cancel();
    };
  }, [resize]);

  return [eleWidth == null || eleHeight == null, eleWidth, eleHeight];
}
