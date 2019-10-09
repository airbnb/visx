import React from 'react';

export type ClipPathProps = {
  /** Unique id for the clipPath. */
  id: string;
  /** clipPath children. */
  children?: React.ReactNode;
};

export default function ClipPath({
  id,
  children,
  ...restProps
}: ClipPathProps & Omit<React.SVGProps<SVGClipPathElement>, keyof ClipPathProps>) {
  return (
    <defs>
      <clipPath id={id} {...restProps}>
        {children}
      </clipPath>
    </defs>
  );
}
