import { StringLike } from '../types/Base';
import { DefaultThresholdInput, D3Scale } from '../types/Scale';
import { ScaleConfigWithoutType } from '../types/ScaleConfig';
export default function applyNice<Output, DiscreteInput extends StringLike, ThresholdInput extends DefaultThresholdInput>(scale: D3Scale<Output, DiscreteInput, ThresholdInput>, config: ScaleConfigWithoutType<Output, DiscreteInput, ThresholdInput>): void;
//# sourceMappingURL=nice.d.ts.map