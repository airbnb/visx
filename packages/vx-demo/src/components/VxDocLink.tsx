import React from 'react';
import Link from 'next/link';

function getDocUrlFromVXPackageName(vxPackage: string) {
  const packageName = vxPackage.split('@vx/')[1]; // e.g., @vx/shape
  return packageName ? `docs/${packageName}` : null;
}

type Props = {
  packageName: string;
};

const VxDocLink = ({ packageName }: Props) => {
  const url = getDocUrlFromVXPackageName(packageName);
  return url ? (
    <Link href={url}>
      <a>{packageName}</a>
    </Link>
  ) : null;
};

export default VxDocLink;
