import React, { useMemo } from 'react';
import cx from 'classnames';
import withScreenSize, {
  WithScreenSizeProvidedProps,
} from '@visx/responsive/lib/enhancers/withScreenSize';
import CodeSandboxLink from './CodeSandboxLink';
import Page from './Page';
import Codeblock from './Codeblock';
import { MarginShape, ShowProvidedProps, PackageJson } from '../types';
import VisxDocLink from './VisxDocLink';
import extractVisxDepsFromPackageJson from './util/extractVisxDepsFromPackageJson';

type Component<P = {}> = React.FC<P> | React.ComponentClass<P>;

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
    const visxDeps = useMemo(() => extractVisxDepsFromPackageJson(packageJson), [packageJson]);

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
            {visxDeps.length > 0 && (
              <>
                <h2>Documentation</h2>
                <div className="doc-links">
                  {visxDeps.map((packageName) => (
                    <VisxDocLink key={packageName} packageName={packageName} />
                  ))}
                </div>
              </>
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
            font-size: 13px;
          }
          .doc-links :global(a) {
            margin-right: 6px;
          }
        `}</style>
      </Page>
    );
  },
);
