import type { SVGProps, ReactNode } from 'react';

export type ClipPathProps = {
  /** Unique id for the clipPath. */
  id: string;
  /** clipPath children. */
  children?: ReactNode;
};

/** Handles rendering of <defs> and <clipPath> elements for you, with any children you want. */
export default function ClipPath({
  id,
  children,
  ...restProps
}: ClipPathProps & Omit<SVGProps<SVGClipPathElement>, keyof ClipPathProps>) {
  return (
    <defs>
      <clipPath id={id} {...restProps}>
        {children}
      </clipPath>
    </defs>
  );
}
