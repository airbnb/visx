import React from 'react';
import { Chord, ChordSubgroup } from 'd3-chord';
declare type NumAccessor = (d: ChordSubgroup) => number;
export declare type RibbonProps = {
    /** Chord for which to render a ribbon. */
    chord: Chord;
    /** Sets the source accessor (defaults to chord.source). */
    source?: (d: Chord) => ChordSubgroup;
    /** Sets the target accessor (defaults to chord.source). */
    target?: (d: Chord) => ChordSubgroup;
    /** Sets the radius or radius accessor for the ribbon generator. */
    radius?: number | NumAccessor;
    /** Sets the start angle or start angle accessor for the ribbon generator. */
    startAngle?: number | NumAccessor;
    /** Sets the end angle or end angle accessor for the ribbon generator. */
    endAngle?: number | NumAccessor;
    /** Override the default rendering of a chord `<path />`. */
    children?: ({ path }: {
        path: string | null;
    }) => string | undefined;
    /** Classname to apply to the rendered `<path />`. */
    className?: string;
};
export default function Ribbon({ chord, source, target, radius, startAngle, endAngle, children, className, ...restProps }: Omit<React.SVGProps<SVGPathElement>, keyof RibbonProps> & RibbonProps): JSX.Element;
export {};
//# sourceMappingURL=Ribbon.d.ts.map