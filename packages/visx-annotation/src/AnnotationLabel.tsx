import React, { useMemo } from 'react';
import cx from 'classnames';
import Group from '@visx/group/lib/Group';
import Text, { TextProps } from '@visx/text/lib/Text';
import useMeasure from 'react-use-measure';

// @TODO
// vertical / horizontal anchors
// vertical / horizontal line

export type AnnotationLabelProps = {
  /** Background color of label. */
  backgroundFill?: string;
  /** Padding of text from background. */
  backgroundPadding?: number | { top?: number; right?: number; bottom?: number; left?: number };
  /** Additional props to be passed to background SVGRectElement. */
  backgroundProps?: React.SVGProps<SVGRectElement>;
  /** Optional className to apply to container in addition to 'visx-annotation-label'. */
  className?: string;
  /** Color of title and subtitle text. */
  fontColor?: string;
  /** Left offset of entire AnnotationLabel. */
  left?: number;
  /** Optional subtitle. */
  subtitle?: string;
  /** The vertical offset of the subtitle from the title. */
  subtitleDy?: number;
  /** Optional subtitle Text props (to override color, etc.). */
  subtitleProps?: Partial<TextProps>;
  /** Optional title. */
  title?: string;
  /** Optional title Text props (to override color, etc.). */
  titleProps?: Partial<TextProps>;
  /** Top offset of entire AnnotationLabel. */
  top?: number;
  /** Required width of annotation, including background. */
  width: number;
};

const DEFAULT_PADDING = { top: 12, right: 12, bottom: 12, left: 12 };
function getCompletePadding(padding: AnnotationLabelProps['padding']) {
  if (typeof padding === 'undefined') return DEFAULT_PADDING;
  if (typeof padding === 'number') {
    return { top: padding, right: padding, bottom: padding, left: padding };
  }
  return { ...DEFAULT_PADDING, padding };
}

export default function AnnotationLabel({
  backgroundFill = '#eaeaea',
  backgroundPadding,
  backgroundProps,
  className,
  fontColor = '#222',
  left,
  subtitle,
  subtitleDy: initialSubtitleDy,
  subtitleProps,
  title,
  titleProps,
  top,
  width,
}: AnnotationLabelProps) {
  const padding = useMemo(() => getCompletePadding(backgroundPadding), [backgroundPadding]);
  const [titleRef, titleBounds] = useMeasure();
  const [subtitleRef, subtitleBounds] = useMeasure();
  const subtitleDy = title
    ? initialSubtitleDy ??
      (typeof subtitleProps?.fontSize === 'number' ? subtitleProps.fontSize : 8)
    : 0;
  return !title && !subtitle ? null : (
    <Group
      top={top}
      left={left}
      pointerEvents="none"
      className={cx('visx-annotationlabel', className)}
    >
      <rect
        fill={backgroundFill}
        x={0}
        y={0}
        rx={4}
        ry={4}
        {...backgroundProps}
        width={width}
        height={
          padding.top + padding.bottom + (titleBounds.height ?? 0) + (subtitleBounds.height ?? 0)
        }
      />
      {title && (
        <Text
          // @ts-ignore useMeasure expects HTML ref
          innerRef={titleRef}
          fontSize={14}
          fontWeight="bold"
          fill={fontColor}
          verticalAnchor="start"
          dx={padding.left}
          dy={padding.top}
          width={width}
          {...titleProps}
        >
          {title}
        </Text>
      )}
      {subtitle && (
        <Text
          // @ts-ignore useMeasure expects HTML ref
          innerRef={subtitleRef}
          fontSize={12}
          fill={fontColor}
          verticalAnchor="start"
          dx={padding.left}
          dy={padding.top + (titleBounds.height ?? 0) + subtitleDy}
          width={width}
          {...subtitleProps}
        >
          {subtitle}
        </Text>
      )}
    </Group>
  );
}
