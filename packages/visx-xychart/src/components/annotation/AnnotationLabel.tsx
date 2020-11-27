import React, { useContext } from 'react';
import { Label as BaseLabel } from '@visx/annotation';
import { LabelProps as BaseLabelProps } from '@visx/annotation/lib/components/Label';
import DataContext from '../../context/DataContext';

export type AnnotationLabelProps = BaseLabelProps;

const defaultBackgroundProps = { fillOpacity: 0.7 };

/** AnnotationLabel which provides text styles from theme. */
export default function AnnotationLabel(props: AnnotationLabelProps) {
  const { theme } = useContext(DataContext);
  const titleProps = theme?.svgLabelBig;
  const subtitleProps = theme?.svgLabelSmall;
  return (
    <BaseLabel
      anchorLineStroke={theme?.axisStyles.x.bottom.axisLine.stroke}
      backgroundFill={theme?.backgroundColor}
      backgroundProps={defaultBackgroundProps}
      showAnchorLine
      subtitleFontSize={subtitleProps?.fontSize}
      subtitleFontWeight={subtitleProps?.fontWeight}
      subtitleProps={subtitleProps}
      titleFontSize={titleProps?.fontSize}
      titleFontWeight={titleProps?.fontWeight}
      titleProps={titleProps}
      {...props}
    />
  );
}
