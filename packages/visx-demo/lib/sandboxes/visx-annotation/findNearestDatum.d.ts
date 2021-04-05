import { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import { scaleLinear, scaleTime } from '@visx/scale';
export default function findNearestDatum({ value, scale, accessor, data, }: {
    value: number;
    scale: ReturnType<typeof scaleLinear | typeof scaleTime>;
    accessor: (d: AppleStock) => number;
    data: AppleStock[];
}): AppleStock;
//# sourceMappingURL=findNearestDatum.d.ts.map