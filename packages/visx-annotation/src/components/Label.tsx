import React, { useContext, useMemo } from 'react';
import cx from 'classnames';
import Group from '@visx/group/lib/Group';
import Text, { TextProps } from '@visx/text/lib/Text';
import useMeasure from 'react-use-measure';
import AnnotationContext from '../context/AnnotationContext';

// @TODO
// vertical / horizontal anchors
// vertical / horizontal line

export type LabelProps = {
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
  /** Whether the label is horizontally anchored to the left, middle, or right of its x position. */
  horizontalAnchor?: 'left' | 'middle' | 'right';
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
  /** Whether the label is vertically anchored to the top, middle, or bottom of its x position. */
  verticalAnchor?: 'top' | 'middle' | 'bottom';
  /** Width of annotation, including background, for text wrapping. */
  width?: number;
  /** Left offset of entire AnnotationLabel. */
  x?: number;
  /** Top offset of entire AnnotationLabel. */
  y?: number;
};

const DEFAULT_PADDING = { top: 12, right: 12, bottom: 12, left: 12 };

function getCompletePadding(padding: LabelProps['backgroundPadding']) {
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
  horizontalAnchor,
  subtitle,
  subtitleDy: initialSubtitleDy,
  subtitleProps,
  title,
  titleProps,
  verticalAnchor,
  width = 125,
  x: propsX,
  y: propsY,
}: LabelProps) {
  // we must measure the rendered title + subtitle to compute container height
  const [titleRef, titleBounds] = useMeasure();
  const [subtitleRef, subtitleBounds] = useMeasure();

  const padding = useMemo(() => getCompletePadding(backgroundPadding), [backgroundPadding]);

  // if props are provided, they take precedence over context
  const { x, y, dx, dy } = useContext(AnnotationContext);
  const containerHeight =
    padding.top + padding.bottom + (titleBounds.height ?? 0) + (subtitleBounds.height ?? 0);

  const containerCoords = useMemo(() => {
    let adjustedX: number = propsX == null ? (x ?? 0) + (dx ?? 0) : propsX;
    let adjustedY: number = propsY == null ? (y ?? 0) + (dy ?? 0) : propsY;

    if (horizontalAnchor) {
      if (horizontalAnchor === 'middle') adjustedX -= width / 2;
      if (horizontalAnchor === 'right') adjustedX -= width;
    } else if (dx != null && dx < 0) {
      adjustedX -= width; // right align
    }

    if (verticalAnchor) {
      if (verticalAnchor === 'middle') adjustedY -= containerHeight / 2;
      if (verticalAnchor === 'bottom') adjustedY -= containerHeight;
    } else if (dy != null && dy < 0) {
      adjustedY -= containerHeight; // bottom align
    }

    return { x: adjustedX, y: adjustedY };
  }, [propsX, x, dx, propsY, y, dy, horizontalAnchor, verticalAnchor, width, containerHeight]);

  const subtitleDy = title
    ? initialSubtitleDy ??
      (typeof subtitleProps?.fontSize === 'number' ? subtitleProps.fontSize : 8)
    : 0;

  return !title && !subtitle ? null : (
    <Group
      top={containerCoords.y}
      left={containerCoords.x}
      pointerEvents="none"
      className={cx('visx-annotationlabel', className)}
      opacity={titleBounds.height === 0 && subtitleBounds.height === 0 ? 0 : 1}
    >
      <rect
        fill={backgroundFill}
        x={0}
        y={0}
        rx={4}
        ry={4}
        {...backgroundProps}
        width={width}
        height={containerHeight}
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
