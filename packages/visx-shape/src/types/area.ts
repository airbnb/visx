import { Area } from 'd3-shape';
import { ReactNode, Ref } from 'react';
import { AreaPathConfig } from './D3ShapeConfig';

export type BaseAreaProps<Datum> = {
  /** Override render function which is passed the configured area generator as input. */
  children?: (args: { path: Area<Datum> }) => ReactNode;
  /** Classname applied to path element. */
  className?: string;
  /** Array of data for which to generate an area shape. */
  data?: Datum[];
  /** React RefObject passed to the path element. */
  innerRef?: Ref<SVGPathElement>;
} & AreaPathConfig<Datum>;
