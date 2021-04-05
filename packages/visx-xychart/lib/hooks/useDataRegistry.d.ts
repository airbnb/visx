import { AxisScale } from '@visx/axis';
import { DataContextType } from '../types';
/** Hook that returns an API equivalent to DataRegistry but which updates as needed for use as a hook. */
export default function useDataRegistry<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>(): DataContextType<XScale, YScale, Datum>['dataRegistry'];
//# sourceMappingURL=useDataRegistry.d.ts.map