import { Unarray } from './Base';
import { ScaleInterpolate, ScaleInterpolateParams } from './ScaleInterpolate';
export interface BaseScaleConfig<T, D, R> {
    type: T;
    /**
     * The domain of the scale.
     */
    domain?: D;
    /**
     * The range of the scale.
     */
    range?: R;
    /**
     * The alignment of the steps within the scale range.
     *
     * This value must lie in the range `[0,1]`. A value of `0.5` indicates that the steps should be centered within the range. A value of `0` or `1` may be used to shift the bands to one side, say to position them adjacent to an axis.
     *
     * __Default value:__ `0.5`
     */
    align?: number;
    /**
     * The logarithm base of the `log` scale (default `10`).
     */
    base?: number;
    /**
     * If `true`, values that exceed the data domain are clamped to either the minimum or maximum range value
     *
     * __Default value:__ `false`.
     */
    clamp?: boolean;
    /**
     * A constant determining the slope of the symlog function around zero. Only used for `symlog` scales.
     *
     * __Default value:__ `1`
     */
    constant?: number;
    /**
     * The exponent of the `pow` scale.
     */
    exponent?: number;
    /**
     * The interpolation method for range values.
     * By default, a general interpolator for numbers, dates, strings and colors (in HCL space) is used.
     * For color ranges, this property allows interpolation in alternative color spaces. Legal values include `rgb`, `hsl`, `hsl-long`, `lab`, `hcl`, `hcl-long`, `cubehelix` and `cubehelix-long` ('-long' variants use longer paths in polar coordinate spaces). If object-valued, this property accepts an object with a string-valued _type_ property and an optional numeric _gamma_ property applicable to rgb and cubehelix interpolators. For more, see the [d3-interpolate documentation](https://github.com/d3/d3-interpolate).
     *
     */
    interpolate?: ScaleInterpolate | ScaleInterpolateParams;
    /**
     * Extending the domain so that it starts and ends on nice round values. This method typically modifies the scale’s domain, and may only extend the bounds to the nearest round value. Nicing is useful if the domain is computed from data and may be irregular. For example, for a domain of _[0.201479…, 0.996679…]_, a nice domain might be _[0.2, 1.0]_.
     *
     * For quantitative scales such as linear, `nice` can be either a boolean flag or a number. If `nice` is a number, it will represent a desired tick count. This allows greater control over the step size used to extend the bounds, guaranteeing that the returned ticks will exactly cover the domain.
     *
     * __Default value:__ `true` for _quantitative_ fields; `false` otherwise.
     *
     */
    nice?: boolean | number;
    /**
     * For band scale, shortcut for setting `paddingInner` and `paddingOuter` to the same value.
     *
     * For point scale, the outer padding (spacing) at the ends of the range.
     * This is similar to band scale's `paddingOuter`.
     *
     * @minimum 0
     */
    padding?: number;
    /**
     * The inner padding (spacing) within each band step of band scales, as a fraction of the step size. This value must lie in the range [0,1].
     *
     * @minimum 0
     * @maximum 1
     */
    paddingInner?: number;
    /**
     * The outer padding (spacing) at the ends of the range of band and point scales,
     * as a fraction of the step size. This value must lie in the range [0,1].
     *
     * @minimum 0
     * @maximum 1
     */
    paddingOuter?: number;
    /**
     * If true, reverses the order of the scale range.
     * __Default value:__ `false`.
     *
     * @hidden
     */
    reverse?: boolean;
    /**
     * If `true`, rounds numeric output values to integers. This can be helpful for snapping to the pixel grid.
     *
     * __Default value:__ `false`.
     */
    round?: boolean;
    /**
     * Sets the output value of the scale for unknown input values.
     */
    unknown?: Unarray<R> | {
        name: 'implicit';
    };
    /**
     * If `true`, ensures that a zero baseline value is included in the scale domain.
     *
     * __Default value:__ `false`
     *
     * __Note:__ Log, time, and utc scales do not support `zero`.
     */
    zero?: boolean;
}
//# sourceMappingURL=BaseScaleConfig.d.ts.map