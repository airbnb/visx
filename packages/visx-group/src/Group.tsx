import type { ReactNode, Ref, SVGProps } from 'react';
import cx from 'classnames';

export type GroupProps = {
  /** Top offset applied to `<g/>`. */
  top?: number;
  /** Left offset applied to `<g/>`. */
  left?: number;
  /** Override `top` and `left` to provide the entire `transform` string. */
  transform?: string;
  /** className to apply to `<g/>`. */
  className?: string;
  children?: ReactNode;
  /** ref to underlying `<g/>`. */
  innerRef?: Ref<SVGGElement>;
};

export default function Group({
  top = 0,
  left = 0,
  transform,
  className,
  children,
  innerRef,
  ...restProps
}: GroupProps & Omit<SVGProps<SVGGElement>, keyof GroupProps>) {
  return (
    <g
      ref={innerRef}
      className={cx('visx-group', className)}
      transform={transform || `translate(${left}, ${top})`}
      {...restProps}
    >
      {children}
    </g>
  );
}
