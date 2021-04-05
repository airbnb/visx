import { DefaultOutput } from '../types/Base';
import { LinearScaleConfig, PowScaleConfig, QuantizeScaleConfig, ScaleConfig, SqrtScaleConfig, SymlogScaleConfig } from '../types/ScaleConfig';
declare type ZeroableScaleConfigs<Output = DefaultOutput> = LinearScaleConfig<Output> | PowScaleConfig<Output> | SqrtScaleConfig<Output> | SymlogScaleConfig<Output> | QuantizeScaleConfig<Output>;
export default function scaleCanBeZeroed<Output = DefaultOutput>(scaleConfig: ScaleConfig<Output>): scaleConfig is ZeroableScaleConfigs<Output>;
export {};
//# sourceMappingURL=scaleCanBeZeroed.d.ts.map