import cx from 'classnames';
import type { StackProps } from './Stack';
import Stack from './Stack';
import type { AddSVGProps, StackKey } from '../types';

type PickProps =
  | 'className'
  | 'top'
  | 'left'
  | 'keys'
  | 'data'
  | 'curve'
  | 'defined'
  | 'x'
  | 'x0'
  | 'x1'
  | 'y0'
  | 'y1'
  | 'value'
  | 'order'
  | 'offset'
  | 'color'
  | 'children';

export type AreaStackProps<Datum, Key> = Pick<StackProps<Datum, Key>, PickProps>;

export default function AreaStack<Datum, Key extends StackKey = StackKey>({
  className,
  top,
  left,
  keys,
  data,
  curve,
  defined,
  x,
  x0,
  x1,
  y0,
  y1,
  value,
  order,
  offset,
  color,
  children,
  ...restProps
}: AddSVGProps<AreaStackProps<Datum, Key>, SVGPathElement>) {
  return (
    <Stack<Datum, Key>
      className={className}
      top={top}
      left={left}
      keys={keys}
      data={data}
      curve={curve}
      defined={defined}
      x={x}
      x0={x0}
      x1={x1}
      y0={y0}
      y1={y1}
      value={value}
      order={order}
      offset={offset}
      color={color}
      {...restProps}
    >
      {children ||
        (({ stacks, path }) =>
          stacks.map((series, i) => (
            <path
              className={cx('visx-area-stack', className)}
              key={`area-stack-${i}-${series.key || ''}`}
              d={path(series) || ''}
              fill={color?.(series.key, i)}
              {...restProps}
            />
          )))}
    </Stack>
  );
}
