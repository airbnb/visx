import React from 'react';
import Link from 'next/link';
function getDocUrlFromVXPackageName(visxPackage) {
    var packageName = visxPackage.split('@visx/')[1]; // e.g., @visx/shape
    return packageName ? "docs/" + packageName : null;
}
function VisxDocLink(_a) {
    var packageName = _a.packageName;
    var url = getDocUrlFromVXPackageName(packageName);
    return url ? (<Link href={url}>
      <a>{packageName}</a>
    </Link>) : null;
}
export default VisxDocLink;
