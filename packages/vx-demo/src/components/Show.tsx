import React from 'react';
import cx from 'classnames';
import withScreenSize, {
  WithScreenSizeProvidedProps,
} from '@vx/responsive/lib/enhancers/withScreenSize';
import CodeSandboxLink from './CodeSandboxLink';
import Page from './Page';
import Codeblock from './codeblocks/Codeblock';
import { MarginShape, ShowProvidedProps } from '../types';

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
  }: ShowProps & WithScreenSizeProvidedProps) => {
    const width = Math.min(800, (screenWidth || 0) - padding);
    const height = width * 0.6;

    return (
      <Page title={title}>
        <div className="container">
          <div style={{ width }}>
            <h1>{title}</h1>
          </div>
          <div
            className={cx(
              {
                shadow: !!shadow,
              },
              title.split(' ').join('-'),
              'chart',
            )}
          >
            {React.createElement(component, {
              width,
              height,
              margin,
              events,
            })}
          </div>
          {description && React.createElement(description, { width, height })}
          {codeSandboxDirectoryName && (
            <div style={{ width, display: 'flex', justifyContent: 'flex-end' }}>
              <CodeSandboxLink exampleDirectoryName={codeSandboxDirectoryName} />
            </div>
          )}
          {children && (
            <div style={{ width }}>
              <h2>Code</h2>
            </div>
          )}
          {children && (
            <div className="code" style={{ width }}>
              <Codeblock>{children}</Codeblock>
            </div>
          )}
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
        `}</style>
      </Page>
    );
  },
);
