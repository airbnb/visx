import React from 'react';

export type ClipPathProps = {
  /** Unique id for the clipPath. */
  id: string;
  /** clipPath children. */
  children: React.ReactNode;
} & React.SVGProps<SVGClipPathElement>;

export default function ClipPath({ id, children, ...restProps }: ClipPathProps) {
  return (
    <defs>
      <clipPath id={id} {...restProps}>
        {children}
      </clipPath>
    </defs>
  );
}
