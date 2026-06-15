import type { CSSProperties, ReactNode } from 'react';

import { VISUALLY_HIDDEN_STYLE } from '../utils/table';

export type ChartA11yLivePoliteness = 'polite' | 'assertive';

export type ChartA11yAnnouncerProps = {
  id?: string;
  message?: ReactNode;
  children?: ReactNode;
  politeness?: ChartA11yLivePoliteness;
  atomic?: boolean;
  visible?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function ChartA11yAnnouncer({
  id,
  message,
  children,
  politeness = 'polite',
  atomic = true,
  visible = false,
  className,
  style,
}: ChartA11yAnnouncerProps) {
  const liveRegionStyle = visible ? style : { ...VISUALLY_HIDDEN_STYLE, ...style };

  return (
    <div
      id={id}
      role={politeness === 'assertive' ? 'alert' : 'status'}
      aria-live={politeness}
      aria-atomic={atomic}
      className={className}
      style={liveRegionStyle}
    >
      {children ?? message}
    </div>
  );
}
