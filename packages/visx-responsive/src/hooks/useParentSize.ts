import { RefObject, useRef, useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { useSize, WithSizeProps, WithSizeProvidedProps } from './useSize';

export function useParentSize<BaseComponentProps extends WithSizeProps = {}>(
  props: BaseComponentProps & WithSizeProvidedProps,
  ref: RefObject<HTMLElement>,
) {
  const animationFrameID = useRef(0);
  const { resize, eleHeight, eleWidth } = useSize(props, true);

  const resizeObserver = useRef(
    new ResizeObserver((entries /** , observer */) => {
      entries.forEach(entry => {
        const { width, height } = entry.contentRect;
        animationFrameID.current = window.requestAnimationFrame(() => {
          resize({
            width,
            height,
          });
        });
      });
    }),
  );

  useEffect(() => {
    if (ref.current) resizeObserver.current.observe(ref.current);
    const refSave = ref.current;
    const resizeSave = resizeObserver.current;
    return () => {
      if (refSave) resizeSave.unobserve(refSave);
    };
  }, [ref]);

  return [eleWidth != null && eleHeight != null, eleWidth, eleHeight];
}
