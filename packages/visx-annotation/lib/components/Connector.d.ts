import React from 'react';
import { AnnotationContextType } from '../types';
export declare type ConnectorProps = Pick<AnnotationContextType, 'x' | 'y' | 'dx' | 'dy'> & {
    /** Optional className to apply to container in addition to 'visx-annotation-connector'. */
    className?: string;
    /** Connector type. */
    type?: 'line' | 'elbow';
    /** Color of the connector line. */
    stroke?: string;
    /** Optional additional props. */
    pathProps?: React.SVGProps<SVGPathElement>;
};
export default function Connector({ className, x: propsX, y: propsY, dx: propsDx, dy: propsDy, type, stroke, pathProps, }: ConnectorProps): JSX.Element;
//# sourceMappingURL=Connector.d.ts.map