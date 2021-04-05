import { SVGProps } from 'react';
import { GridScale, GridLines, CommonGridProps } from '@visx/grid/lib/types';
import { TransitionConfig } from '../spring-configs/useLineTransitionConfig';
export declare type AnimatedGridLinesProps<Scale extends GridScale> = {
    lines: GridLines;
    lineKey: (line: GridLines[number]) => string;
    scale: Scale;
} & Omit<SVGProps<SVGLineElement>, 'ref' | 'scale'> & Pick<TransitionConfig<Scale>, 'animationTrajectory' | 'animateXOrY'> & Pick<CommonGridProps, 'stroke' | 'strokeWidth' | 'lineStyle' | 'strokeDasharray'>;
export default function AnimatedGridLines<Scale extends GridScale>({ scale, lines, animationTrajectory, animateXOrY, lineKey, lineStyle, ...lineProps }: AnimatedGridLinesProps<Scale>): JSX.Element;
//# sourceMappingURL=AnimatedGridLines.d.ts.map