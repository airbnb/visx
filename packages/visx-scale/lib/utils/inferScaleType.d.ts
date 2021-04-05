import { StringLike } from '../types/Base';
import { DefaultThresholdInput, D3Scale } from '../types/Scale';
import { ScaleType } from '../types/ScaleConfig';
export default function inferScaleType<Output, DiscreteInput extends StringLike, ThresholdInput extends DefaultThresholdInput>(scale: D3Scale<Output, DiscreteInput, ThresholdInput>): ScaleType;
//# sourceMappingURL=inferScaleType.d.ts.map