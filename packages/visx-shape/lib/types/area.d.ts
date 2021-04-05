/// <reference types="react" />
import { Area } from 'd3-shape';
import { AreaPathConfig } from './D3ShapeConfig';
export declare type BaseAreaProps<Datum> = {
    /** Override render function which is passed the configured area generator as input. */
    children?: (args: {
        path: Area<Datum>;
    }) => React.ReactNode;
    /** Classname applied to path element. */
    className?: string;
    /** Array of data for which to generate an area shape. */
    data?: Datum[];
    /** React RefObject passed to the path element. */
    innerRef?: React.Ref<SVGPathElement>;
} & AreaPathConfig<Datum>;
//# sourceMappingURL=area.d.ts.map