import React, { useMemo } from 'react';
import cx from 'classnames';
import withScreenSize, {
  WithScreenSizeProvidedProps,
} from '@vx/responsive/lib/enhancers/withScreenSize';
import CodeSandboxLink from './CodeSandboxLink';
import Page from './Page';
import Codeblock from './Codeblock';
import { MarginShape, ShowProvidedProps } from '../types';
import VxDocLink from './VxDocLink';

type Component<P = {}> = React.FC<P> | React.ComponentClass<P>;

type PackageJson = { dependencies?: { [packageName: string]: string } };

type ShowProps = {
  children?: string;
  title: string;
  component: Component<ShowProvidedProps>;
  codeSandboxDirectoryName?: string;
  shadow?: boolean;
  events?: boolean;
  margin?: MarginShape;
  description?: Component<{ width: number; height: number }>;
  windowResizeDebounceTime?: number;
  packageJson?: PackageJson;
};

function extractVxDepsFromPackage(packageJson?: PackageJson) {
  const vxDeps: string[] = [];
  Object.keys(packageJson?.dependencies ?? {}).forEach(dep => {
    if (dep.startsWith('@vx/')) vxDeps.push(dep);
  });

  return vxDeps;
}

const padding = 40;

export default withScreenSize<ShowProps & WithScreenSizeProvidedProps>(
  ({
    screenWidth,
    children,
    title,
    component,
    shadow = false,
    events = false,
    margin,
    description,
    codeSandboxDirectoryName,
    packageJson,
  }: ShowProps & WithScreenSizeProvidedProps) => {
    const width = Math.min(800, (screenWidth || 0) - padding);
    const height = width * 0.6;
    const vxDeps = useMemo(() => extractVxDepsFromPackage(packageJson), [packageJson]);

    return (
      <Page title={title}>
        <div className="container">
          <div style={{ width }}>
            <h1>{title}</h1>
            <div className={cx(!!shadow && 'shadow', title.split(' ').join('-'), 'chart')}>
              {React.createElement(component, {
                width,
                height,
                margin,
                events,
              })}
            </div>
            {description && React.createElement(description, { width, height })}
            {codeSandboxDirectoryName && (
              <div className="sandbox-link">
                <CodeSandboxLink exampleDirectoryName={codeSandboxDirectoryName} />
              </div>
            )}
            {vxDeps.length > 0 && (
              <div className="doc-links">
                Documenation
                {vxDeps.map(packageName => (
                  <VxDocLink key={packageName} packageName={packageName} />
                ))}
              </div>
            )}
            {children && (
              <>
                <h2>Code</h2>
                <div className="code">
                  <Codeblock>{children}</Codeblock>
                </div>
              </>
            )}
          </div>
        </div>
        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: hidden;
            margin-bottom: 40px;
          }
          .container h1 {
            margin-top: 15px;
            line-height: 0.9em;
            letter-spacing: -0.03em;
          }
          .container h2 {
            margin-top: 15px;
            margin-bottom: 5px;
          }
          .chart {
            border-radius: 14px;
          }
          .shadow {
            border-radius: 14px;
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
          }
          .sandbox-link {
            display: flex;
            justify-content: flex-end;
          }
          .doc-links {
            width: 100%;
            flex-grow: 0;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          }
          .doc-links :global(a) {
            margin-left: 6px;
          }
        `}</style>
      </Page>
    );
  },
);
