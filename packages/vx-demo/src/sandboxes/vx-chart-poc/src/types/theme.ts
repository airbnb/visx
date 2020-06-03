import React from 'react';

type TextPropsToOmit = 'onCopy' | 'event';

export type TextStyles = Omit<React.SVGAttributes<SVGTextElement>, TextPropsToOmit> & {
  textAnchor: 'start' | 'middle' | 'end' | 'inherit';
};

export type LineStyles = Omit<React.SVGAttributes<SVGLineElement>, 'Key'>;

export type GridStyles = LineStyles;

/** A complete chart theme includes style definitions for all axis orientations. */
export interface XYChartTheme {
  colors: string[];
  labelStyles: TextStyles;
  gridStyles: GridStyles;

  // axes styles (line + labels)
  xAxisStyles: {
    label: {
      bottom: TextStyles;
      top: TextStyles;
    };
  } & LineStyles;
  yAxisStyles: {
    label: {
      left: TextStyles;
      right: TextStyles;
    };
  } & LineStyles;

  // tick styles (line + labels)
  xTickStyles: LineStyles & {
    tickLength: number;
    label: {
      bottom: TextStyles;
      top: TextStyles;
    };
  };
  yTickStyles: LineStyles & {
    tickLength: number;
    label: {
      left: TextStyles;
      right: TextStyles;
    };
  };
}
