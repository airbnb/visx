import type {
  Arc as ArcType,
  PieArcDatum as PieArcDatumType,
  Pie as PieType,
} from '@visx/vendor/d3-shape';
import type { $TSFIXME, ArcPathConfig, PiePathConfig } from '../types';
import { arc as arcPath, pie as piePath } from '../util/D3ShapeFactories';

const emptyData: never[] = [];

export type PieArcDatum<Datum> = PieArcDatumType<Datum>;

export type UsePieOptions<Datum> = {
  /** Array of data to generate a pie for. */
  data?: Datum[];
  /** Invoked for each datum, returns the value for a pie segment. */
  pieValue?: PiePathConfig<Datum>['value'];
  /** Comparator function to sort arcs, overridden by pieSortValues if defined. */
  pieSort?: PiePathConfig<Datum>['sort'];
  /** Comparator function to sort arc values, overrides pieSort if defined. */
  pieSortValues?: PiePathConfig<Datum>['sortValues'];
} & Pick<PiePathConfig<Datum>, 'startAngle' | 'endAngle' | 'padAngle'> &
  Pick<
    ArcPathConfig<PieArcDatum<Datum>>,
    'innerRadius' | 'outerRadius' | 'cornerRadius' | 'padRadius'
  >;

export type UsePieResult<Datum> = {
  path: ArcType<$TSFIXME, PieArcDatum<Datum>>;
  arcs: PieArcDatum<Datum>[];
  pie: PieType<$TSFIXME, Datum>;
};

export default function usePie<Datum>({
  data = emptyData,
  innerRadius = 0,
  outerRadius,
  cornerRadius,
  startAngle,
  endAngle,
  padAngle,
  padRadius,
  pieSort,
  pieSortValues,
  pieValue,
}: UsePieOptions<Datum> = {}): UsePieResult<Datum> {
  const path = arcPath<PieArcDatum<Datum>>({
    innerRadius,
    outerRadius,
    cornerRadius,
    padRadius,
  });

  const pie = piePath<Datum>({
    startAngle,
    endAngle,
    padAngle,
    value: pieValue,
    sort: pieSort,
    sortValues: pieSortValues,
  });

  const arcs = pie(data);

  return { arcs, path, pie };
}
