import { PackageJson } from '../../types';

export default function extractVxDepsFromPackageJson(packageJson?: PackageJson) {
  const vxDeps: string[] = [];

  Object.keys(packageJson?.dependencies ?? {}).forEach(dep => {
    if (dep.startsWith('@vx/')) vxDeps.push(dep);
  });

  return vxDeps;
}
