import type { DefaultOutput } from '../types/Base';
import type {
  LinearScaleConfig,
  PowScaleConfig,
  QuantizeScaleConfig,
  ScaleConfig,
  ScaleType,
  SqrtScaleConfig,
  SymlogScaleConfig,
} from '../types/ScaleConfig';

type ZeroableScaleConfigs<Output = DefaultOutput> =
  | LinearScaleConfig<Output>
  | PowScaleConfig<Output>
  | SqrtScaleConfig<Output>
  | SymlogScaleConfig<Output>
  | QuantizeScaleConfig<Output>;

const zeroableScaleTypes = new Set<ScaleType>(['linear', 'pow', 'quantize', 'sqrt', 'symlog']);

export default function scaleCanBeZeroed<Output = DefaultOutput>(
  scaleConfig: ScaleConfig<Output>,
): scaleConfig is ZeroableScaleConfigs<Output> {
  return zeroableScaleTypes.has(scaleConfig.type);
}
