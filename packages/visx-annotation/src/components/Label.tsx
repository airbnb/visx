import React, { useContext, useMemo } from 'react';
import cx from 'classnames';
import Group from '@visx/group/lib/Group';
import Text, { TextProps } from '@visx/text/lib/Text';
import useMeasure, { Options as UseMeasureOptions } from 'react-use-measure';
import AnnotationContext from '../context/AnnotationContext';

export type LabelProps = {
  /** Stroke color of anchor line. */
  anchorLineStroke?: string;
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
  /** Optionally inject a ResizeObserver polyfill, else this *must* be globally available. */
  resizeObserverPolyfill?: UseMeasureOptions['polyfill'];
  /** Whether to render a line indicating label text anchor. */
  showAnchorLine?: boolean;
  /** Whether to render a label background. */
  showBackground?: boolean;
  /** Optional subtitle. */
  subtitle?: string;
  /** Optional title font size. */
  subtitleFontSize?: number;
  /** Optional title font weight. */
  subtitleFontWeight?: number;
  /** The vertical offset of the subtitle from the title. */
  subtitleDy?: number;
  /** Optional subtitle Text props (to override color, etc.). */
  subtitleProps?: Partial<TextProps>;
  /** Optional title. */
  title?: string;
  /** Optional title font size. */
  titleFontSize?: number;
  /** Optional title font weight. */
  titleFontWeight?: number;
  /** Optional title Text props (to override color, etc.). */
  titleProps?: Partial<TextProps>;
  /** Whether the label is vertically anchored to the top, middle, or bottom of its x position. */
  verticalAnchor?: 'top' | 'middle' | 'bottom';
  /** Width of annotation, including background, for text wrapping. */
  width?: number;
  /** Left offset of entire AnnotationLabel, if not specified uses x + dx from Annotation. */
  x?: number;
  /** Top offset of entire AnnotationLabel, if not specified uses y + dy from Annotation. */
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
  anchorLineStroke,
  backgroundFill = '#eaeaea',
  backgroundPadding,
  backgroundProps,
  className,
  fontColor = '#222',
  horizontalAnchor: propsHorizontalAnchor,
  resizeObserverPolyfill,
  showAnchorLine = true,
  showBackground = true,
  subtitle,
  subtitleDy = 4,
  subtitleFontSize = 12,
  subtitleFontWeight = 200,
  subtitleProps,
  title,
  titleFontSize = 16,
  titleFontWeight = 600,
  titleProps,
  verticalAnchor: propsVerticalAnchor,
  width = 125,
  x: propsX,
  y: propsY,
}: LabelProps) {
  // we must measure the rendered title + subtitle to compute container height
  const [titleRef, titleBounds] = useMeasure({ polyfill: resizeObserverPolyfill });
  const [subtitleRef, subtitleBounds] = useMeasure({ polyfill: resizeObserverPolyfill });

  const padding = useMemo(() => getCompletePadding(backgroundPadding), [backgroundPadding]);

  // if props are provided, they take precedence over context
  const { x = 0, y = 0, dx = 0, dy = 0 } = useContext(AnnotationContext);
  const height = Math.floor(
    padding.top + padding.bottom + (titleBounds.height ?? 0) + (subtitleBounds.height ?? 0),
  );
  const innerWidth = width - padding.left - padding.right;

  // offset container position based on horizontal + vertical anchor
  const horizontalAnchor =
    propsHorizontalAnchor || (Math.abs(dx) < Math.abs(dy) ? 'middle' : dx > 0 ? 'left' : 'right');
  const verticalAnchor =
    propsVerticalAnchor || (Math.abs(dx) > Math.abs(dy) ? 'middle' : dy > 0 ? 'top' : 'bottom');

  const containerCoords = useMemo(() => {
    let adjustedX: number = propsX == null ? x + dx : propsX;
    let adjustedY: number = propsY == null ? y + dy : propsY;

    if (horizontalAnchor === 'middle') adjustedX -= width / 2;
    if (horizontalAnchor === 'right') adjustedX -= width;
    if (verticalAnchor === 'middle') adjustedY -= height / 2;
    if (verticalAnchor === 'bottom') adjustedY -= height;

    return { x: adjustedX, y: adjustedY };
  }, [propsX, x, dx, propsY, y, dy, horizontalAnchor, verticalAnchor, width, height]);

  const titleStyle = useMemo(
    () => ({
      fontSize: titleFontSize,
      fontWeight: titleFontWeight,
    }),
    [titleFontSize, titleFontWeight],
  );

  const subtitleStyle = useMemo(
    () => ({
      fontSize: subtitleFontSize,
      fontWeight: subtitleFontWeight,
    }),
    [subtitleFontSize, subtitleFontWeight],
  );

  const anchorLineOrientation = Math.abs(dx) > Math.abs(dy) ? 'vertical' : 'horizontal';

  const backgroundOutline = showAnchorLine ? { stroke: anchorLineStroke, strokeWidth: 2 } : null;

  return !title && !subtitle ? null : (
    <Group
      top={containerCoords.y}
      left={containerCoords.x}
      pointerEvents="none"
      className={cx('visx-annotationlabel', className)}
      opacity={titleBounds.height === 0 && subtitleBounds.height === 0 ? 0 : 1}
    >
      {showBackground && (
        <rect
          fill={backgroundFill}
          x={0}
          y={0}
          width={width}
          height={height}
          {...backgroundProps}
        />
      )}
      {showAnchorLine && (
        <>
          {anchorLineOrientation === 'horizontal' && verticalAnchor === 'top' && (
            <line {...backgroundOutline} x1={0} x2={width} y1={0} y2={0} />
          )}
          {anchorLineOrientation === 'horizontal' && verticalAnchor === 'bottom' && (
            <line {...backgroundOutline} x1={0} x2={width} y1={height} y2={height} />
          )}
          {anchorLineOrientation === 'vertical' && horizontalAnchor === 'left' && (
            <line {...backgroundOutline} x1={0} x2={0} y1={0} y2={height} />
          )}
          {anchorLineOrientation === 'vertical' && horizontalAnchor === 'right' && (
            <line {...backgroundOutline} x1={width} x2={width} y1={0} y2={height} />
          )}
        </>
      )}
      {title && (
        <Text
          // @ts-ignore useMeasure expects HTML ref
          innerRef={titleRef}
          fill={fontColor}
          verticalAnchor="start"
          x={padding.left}
          y={padding.top}
          width={innerWidth}
          capHeight={titleFontSize} // capHeight should match fontSize, used for first line line height
          style={titleStyle} // used for size calculation
          {...titleProps}
        >
          {title}
        </Text>
      )}
      {subtitle && (
        <Text
          // @ts-ignore useMeasure expects HTML ref
          innerRef={subtitleRef}
          fill={fontColor}
          verticalAnchor="start"
          x={padding.left}
          y={padding.top + (titleBounds.height ?? 0)}
          dy={title ? subtitleDy : 0}
          width={innerWidth}
          capHeight={subtitleFontSize} // capHeight should match fontSize, used for first line line height
          style={subtitleStyle} // used for size calculation
          {...subtitleProps}
        >
          {subtitle}
        </Text>
      )}
    </Group>
  );
}
