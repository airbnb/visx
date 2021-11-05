/* eslint-disable no-underscore-dangle */
import React from 'react';
import Markdown from 'react-markdown/with-html';

import ApiTable from './ApiTable';
import PackageList from './PackageList';
import Page from './Page';
import { DocGenInfo, VisxPackage } from '../types';
import { toExportName } from './util/format';

type Props = {
  components?: unknown[];
  examples?: (React.ComponentClass | React.FC)[];
  visxPackage: VisxPackage;
  readme: string;
};

export default function DocPage({ components, examples, visxPackage, readme }: Props) {
  return (
    <Page wrapper={false} title={`@visx/${visxPackage} documentation`}>
      <div className="doc-container">
        <div className="doc-nav">
          <PackageList compact grid={false} emphasizePackage={visxPackage} />
        </div>
        <div className="doc-content">
          <div className="doc-readme">
            <Markdown escapeHtml={false} source={readme} />
          </div>
          {examples && examples.length > 0 && (
            <>
              <h2>Examples</h2>
              <div className="examples">
                {examples.map((example, i) => (
                  <div key={i} className="example">
                    {React.createElement(example)}
                  </div>
                ))}
              </div>
            </>
          )}
          {components && components.length > 0 && (
            <div className="component-docs">
              <div>
                <h2>APIs</h2>
                {components.map((component) => {
                  // @ts-ignore TS doesn't know about docgenInfo
                  const docgenInfo = component.__docgenInfo as DocGenInfo | undefined;
                  return docgenInfo ? (
                    <ApiTable key={docgenInfo.displayName} docgenInfo={docgenInfo} />
                  ) : null;
                })}
              </div>
              <div>
                <h2>Exports</h2>
                <ul>
                  {components.map((component) => {
                    // @ts-ignore TS doesn't know about docgenInfo
                    const docgenInfo = component?.__docgenInfo as DocGenInfo | undefined;
                    const { displayName = '' } = docgenInfo || {};
                    return docgenInfo ? (
                      <li key={displayName}>
                        <a className="export-anchor" href={`#${displayName}`}>
                          {toExportName(displayName)}
                        </a>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .doc-container {
          margin-top: 24px;
          display: flex;
          flex-direction: row;
        }
        .doc-content {
          width: 100%;
        }
        .doc-content :global(h1) {
          margin-bottom: 1.2em;
          line-height: 0;
          font-size: 2em;
        }
        .doc-content :global(img) {
          max-width: 50vw;
          max-height: 50vh;
        }
        .doc-content :global(th),
        .doc-content :global(td) {
          border: 1px solid;
          padding: 5px 10px 5px 5px;
        }
        .doc-nav {
          margin-right: 5em;
          width: 140px;
          flex-shrink: 0;
        }
        .doc-content :global(code) {
          font-family: 'Menlo', monospace;
          padding: 0.2rem 0.3rem;
          background-color: #efefef;
          line-height: 1.8em;
          font-size: 0.8em;
          font-weight: normal;
        }
        .doc-content :global(code[class*='language-']) {
          background-color: transparent;
          font-weight: 300;
          color: #222;
          box-shadow: none;
        }
        .doc-readme {
          max-width: 720px;
          font-size: 18px;
        }
        .doc-readme :global(pre) {
          background-color: #efefef;
          display: inline-block;
          padding: 0.5em;
          min-width: 33vw;
          border-radius: 3px;
          font-weight: normal;
          max-width: 720px;
          line-height: 1.1em;
          word-break: break-word;
        }
        .doc-readme :global(pre code) {
          max-width: 720px;
          font-size: 16px;
          line-height: 1.1em;
          word-break: break-word;
          white-space: pre-wrap; /* css-3 */
          white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
          white-space: -pre-wrap; /* Opera 4-6 */
          white-space: -o-pre-wrap; /* Opera 7 */
        }
        .doc-content :global(table) {
          border-collapse: collapse;
          font-size: 16px;
          line-height: 1em;
          border-color: #efefef;
          margin-top: 0.25rem;
        }
        .examples {
          display: flex;
          flex-wrap: wrap;
        }
        .example {
          min-width: 400px;
          max-width: 33%;
          flex-grow: 1;
        }
        .component-docs {
          display: grid;
          grid-gap: 2rem;
          grid-template-columns: 1fr 320px;
        }
        ul {
          margin-top: 0.5rem;
        }
        li {
          line-height: 1em;
        }
        .doc-content :global(.export-anchor) {
          line-height: 1.5em;
          font-size: 16px;
          padding: 0;
        }
        @media (max-width: 800px) {
          .doc-container {
            flex-direction: column-reverse;
            min-width: 90vw;
            max-width: 90vw;
            margin: 0;
          }
          .example {
            max-width: 100%;
          }
          .component-docs {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Page>
  );
}
