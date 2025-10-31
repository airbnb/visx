/**
 * Utility to get component documentation from the generated docs.json file
 * This replaces the runtime __docgenInfo that was previously added by react-docgen-typescript-loader
 */

import type { DocGenInfo } from '../types';
import generatedDocs from '../generated/docs.json';

type ComponentWithDocs = {
  displayName: string;
  __docgenInfo?: DocGenInfo;
};

/**
 * Get documentation for components from a specific package
 * @param packageName - The visx package name (e.g., 'chord', 'shape', 'glyph')
 * @param componentNames - Optional array of component names to filter. If not provided, returns all components.
 * @returns Array of objects with displayName and __docgenInfo matching the old loader format
 */
export function getComponentDocs(
  packageName: string,
  componentNames?: string[],
): ComponentWithDocs[] {
  const packageKey = `@visx/${packageName}`;
  const packageDocs = (generatedDocs as any)[packageKey];

  if (!packageDocs) {
    console.warn(`No documentation found for package: ${packageKey}`);
    return [];
  }

  // Get all component docs or filter by names
  const components = Object.entries(packageDocs)
    .filter(([name]) => !componentNames || componentNames.includes(name))
    .map(([name, docInfo]) => ({
      displayName: name,
      __docgenInfo: docInfo as DocGenInfo,
    }))
    .sort((a, b) => a.displayName.localeCompare(b.displayName));

  return components;
}

/**
 * Attach __docgenInfo to component objects (for backward compatibility)
 * This mimics what react-docgen-typescript-loader used to do at build time
 *
 * @param packageName - The visx package name (e.g., 'chord', 'shape', 'glyph')
 * @param components - Object mapping component names to component functions
 * @returns The same components object with __docgenInfo attached
 */
export function attachDocGenInfo<T extends Record<string, any>>(
  packageName: string,
  components: T,
): T {
  const packageKey = `@visx/${packageName}`;
  const packageDocs = (generatedDocs as any)[packageKey];

  if (!packageDocs) {
    console.warn(`No documentation found for package: ${packageKey}`);
    return components;
  }

  // Attach __docgenInfo to each component
  Object.keys(components).forEach((componentName) => {
    const component = components[componentName];
    const docInfo = packageDocs[componentName];

    if (docInfo && typeof component === 'function') {
      // Attach the docgenInfo to the component function
      // eslint-disable-next-line no-underscore-dangle
      (component as any).__docgenInfo = docInfo;
    }
  });

  return components;
}
