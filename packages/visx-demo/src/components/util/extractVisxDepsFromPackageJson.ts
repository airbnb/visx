import { PackageJson } from '../../types';

export default function extractVisxDepsFromPackageJson(packageJson?: PackageJson) {
  const visxDeps: string[] = [];

  Object.keys(packageJson?.dependencies ?? {}).forEach((dep) => {
    if (dep.startsWith('@visx/')) visxDeps.push(dep);
  });

  return visxDeps;
}
