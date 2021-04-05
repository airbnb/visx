import { StringLike } from '../types/Base';
import { D3Scale, DefaultThresholdInput } from '../types/Scale';
import { ScaleConfigWithoutType } from '../types/ScaleConfig';
export default function applyInterpolate<Output, DiscreteInput extends StringLike, ThresholdInput extends DefaultThresholdInput>(scale: D3Scale<Output, DiscreteInput, ThresholdInput>, config: ScaleConfigWithoutType<Output, DiscreteInput, ThresholdInput>): void;
//# sourceMappingURL=interpolate.d.ts.map