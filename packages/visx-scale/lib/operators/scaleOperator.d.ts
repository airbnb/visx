import { PickD3Scale } from '../types/Scale';
import { ScaleType } from '../types/ScaleConfig';
import { DefaultOutput, StringLike } from '../types/Base';
/**
 * List of all operators, in order of execution
 */
export declare const ALL_OPERATORS: readonly ["domain", "nice", "zero", "interpolate", "round", "range", "reverse", "align", "base", "clamp", "constant", "exponent", "padding", "unknown"];
declare type OperatorType = typeof ALL_OPERATORS[number];
export default function scaleOperator<T extends ScaleType>(...ops: OperatorType[]): <Output = DefaultOutput, DiscreteInput extends StringLike = StringLike, ThresholdInput extends string | number | Date = string | number | Date>(scale: Pick<import("../types/Scale").ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>, T>[T], config?: Pick<{
    linear: Pick<Pick<import("../types/BaseScaleConfig").BaseScaleConfig<"linear", import("../types/ScaleConfig").ContinuousDomain, Output[]>, "reverse" | "type" | "domain" | "range" | "clamp" | "interpolate" | "nice" | "round" | "zero">, "reverse" | "domain" | "range" | "clamp" | "interpolate" | "nice" | "round" | "zero">;
    log: Pick<Pick<import("../types/BaseScaleConfig").BaseScaleConfig<"log", import("../types/ScaleConfig").ContinuousDomain, Output[]>, "reverse" | "type" | "domain" | "range" | "base" | "clamp" | "interpolate" | "nice" | "round">, "reverse" | "domain" | "range" | "base" | "clamp" | "interpolate" | "nice" | "round">;
    pow: Pick<Pick<import("../types/BaseScaleConfig").BaseScaleConfig<"pow", import("../types/ScaleConfig").ContinuousDomain, Output[]>, "reverse" | "type" | "domain" | "range" | "clamp" | "exponent" | "interpolate" | "nice" | "round" | "zero">, "reverse" | "domain" | "range" | "clamp" | "exponent" | "interpolate" | "nice" | "round" | "zero">;
    sqrt: Pick<Pick<import("../types/BaseScaleConfig").BaseScaleConfig<"sqrt", import("../types/ScaleConfig").ContinuousDomain, Output[]>, "reverse" | "type" | "domain" | "range" | "clamp" | "interpolate" | "nice" | "round" | "zero">, "reverse" | "domain" | "range" | "clamp" | "interpolate" | "nice" | "round" | "zero">;
    symlog: Pick<Pick<import("../types/BaseScaleConfig").BaseScaleConfig<"symlog", import("../types/ScaleConfig").ContinuousDomain, Output[]>, "reverse" | "type" | "domain" | "range" | "clamp" | "constant" | "nice" | "zero">, "reverse" | "domain" | "range" | "clamp" | "constant" | "nice" | "zero">;
    radial: Pick<Pick<import("../types/BaseScaleConfig").BaseScaleConfig<"radial", import("../types/ScaleConfig").ContinuousDomain, Output[]>, "reverse" | "type" | "domain" | "range" | "clamp" | "nice" | "round" | "unknown">, "reverse" | "domain" | "range" | "clamp" | "nice" | "round" | "unknown">;
    time: Pick<import("../types/ScaleConfig").TimeScaleConfig<Output>, "reverse" | "domain" | "range" | "clamp" | "interpolate" | "nice" | "round">;
    utc: Pick<import("../types/ScaleConfig").UtcScaleConfig<Output>, "reverse" | "domain" | "range" | "clamp" | "interpolate" | "nice" | "round">;
    quantile: Pick<Pick<import("../types/BaseScaleConfig").BaseScaleConfig<"quantile", import("../types/ScaleConfig").ContinuousDomain, Output[]>, "reverse" | "type" | "domain" | "range">, "reverse" | "domain" | "range">;
    quantize: Pick<Pick<import("../types/BaseScaleConfig").BaseScaleConfig<"quantize", [import("../types/ScaleConfig").TimeInput, import("../types/ScaleConfig").TimeInput], Output[]>, "reverse" | "type" | "domain" | "range" | "nice" | "zero">, "reverse" | "domain" | "range" | "nice" | "zero">;
    threshold: Pick<Pick<import("../types/BaseScaleConfig").BaseScaleConfig<"threshold", ThresholdInput[], Output[]>, "reverse" | "type" | "domain" | "range">, "reverse" | "domain" | "range">;
    ordinal: Pick<Pick<import("../types/BaseScaleConfig").BaseScaleConfig<"ordinal", DiscreteInput[], Output[]>, "reverse" | "type" | "domain" | "range" | "unknown">, "reverse" | "domain" | "range" | "unknown">;
    point: Pick<Pick<import("../types/BaseScaleConfig").BaseScaleConfig<"point", DiscreteInput[], [number | import("../types/Base").NumberLike, number | import("../types/Base").NumberLike]>, "reverse" | "type" | "domain" | "range" | "align" | "padding" | "round">, "reverse" | "domain" | "range" | "align" | "padding" | "round">;
    band: Pick<Pick<import("../types/BaseScaleConfig").BaseScaleConfig<"band", DiscreteInput[], [number | import("../types/Base").NumberLike, number | import("../types/Base").NumberLike]>, "reverse" | "type" | "domain" | "range" | "align" | "padding" | "paddingInner" | "paddingOuter" | "round">, "reverse" | "domain" | "range" | "align" | "padding" | "paddingInner" | "paddingOuter" | "round">;
}, T>[T] | undefined) => Pick<import("../types/Scale").ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>, T>[T];
export {};
//# sourceMappingURL=scaleOperator.d.ts.map