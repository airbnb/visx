import React from 'react';
import Link from 'next/link';

function getDocUrlFromVXPackageName(visxPackage: string) {
  const packageName = visxPackage.split('@visx/')[1]; // e.g., @visx/shape
  return packageName ? `docs/${packageName}` : null;
}

type Props = {
  packageName: string;
};

function VisxDocLink({ packageName }: Props) {
  const url = getDocUrlFromVXPackageName(packageName);
  return url ? <Link href={url}>{packageName}</Link> : null;
}

export default VisxDocLink;
