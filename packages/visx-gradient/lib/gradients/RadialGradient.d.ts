import React from 'react';
import { LinearGradientProps } from './LinearGradient';
export declare type RadialGradientProps = Pick<LinearGradientProps, 'id' | 'from' | 'to' | 'fromOffset' | 'fromOpacity' | 'toOffset' | 'toOpacity' | 'rotate' | 'transform' | 'children'> & React.SVGProps<SVGRadialGradientElement>;
export default function RadialGradient({ children, id, from, to, fromOffset, fromOpacity, toOffset, toOpacity, rotate, transform, ...restProps }: RadialGradientProps): JSX.Element;
//# sourceMappingURL=RadialGradient.d.ts.map