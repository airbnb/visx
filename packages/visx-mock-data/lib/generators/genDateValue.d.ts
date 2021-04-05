export interface DateValue {
    date: Date;
    value: number;
}
export default function genDateValue(length: number, 
/** Optional random seed in the interval [0, 1). */
seed?: number, 
/** Optional start time in ms UTC. */
startTimeMs?: number): DateValue[];
//# sourceMappingURL=genDateValue.d.ts.map