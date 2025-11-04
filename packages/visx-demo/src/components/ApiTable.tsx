import React, { useMemo } from 'react';
import Markdown from 'react-markdown';
import type { DocGenInfo, PropInfo, ParamInfo } from '../types';
import { toExportName } from './util/format';
import { getGitHubUrl } from '../utils/getGitHubUrl';

type Props = {
  docgenInfo: DocGenInfo;
};

const alphaSort = (a: PropInfo, b: PropInfo) => a.name.localeCompare(b.name);

/** Renders a list of props/parameters for the passed docgenInfo */
export default function ApiTable({ docgenInfo }: Props) {
  const {
    displayName = '',
    kind = 'component',
    description,
    parameters,
    returnType,
    filePath,
    lineNumber,
  } = docgenInfo;
  const anchorId = displayName;
  const isFunction = kind === 'function';
  const sourceUrl = getGitHubUrl(filePath, lineNumber);

  // required first, then abc order
  const props = useMemo(() => {
    const requiredProps: PropInfo[] = [];
    const optionalProps: PropInfo[] = [];

    Object.values(docgenInfo.props).forEach((prop) => {
      if (prop.required) {
        requiredProps.push(prop);
      } else {
        optionalProps.push(prop);
      }
    });

    return [...requiredProps.sort(alphaSort), ...optionalProps.sort(alphaSort)];
  }, [docgenInfo]);

  return (
    <div className="api">
      <h3>
        <a id={anchorId} href={`#${anchorId}`} className="export-name-anchor">
          #
        </a>
        {toExportName(displayName)}
        {kind === 'hook' && <span className="kind-badge hook">hook</span>}
        {kind === 'function' && <span className="kind-badge function">function</span>}
        {sourceUrl && (
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="source-link">
            View Source →
          </a>
        )}
      </h3>
      {description && (
        <div className="doc-description">
          <Markdown>{description}</Markdown>
        </div>
      )}
      {isFunction && parameters && parameters.length > 0 ? (
        <>
          <h4>Parameters</h4>
          {parameters.map((param: ParamInfo) => {
            const id = `${displayName}_${param.name}`;
            return (
              <div key={param.name} className="prop">
                <div className="title">
                  <span className="name">
                    <a id={id} href={`#${id}`} className="api-anchor">
                      #
                    </a>{' '}
                    <strong>{param.name}</strong>
                  </span>
                  {param.type && (
                    <span className="typedef">
                      <code>{param.type.name}</code>
                    </span>
                  )}
                </div>
                <div className="description">
                  <Markdown>
                    {`${param.description || ''}${
                      param.defaultValue
                        ? `\n\nDefault \`${String(param.defaultValue.value) || '""'}\``
                        : ''
                    }`}
                  </Markdown>
                </div>
              </div>
            );
          })}
          {returnType && (
            <div className="return-type">
              <strong>Returns:</strong> <code>{returnType}</code>
            </div>
          )}
        </>
      ) : (
        props.map((prop) => {
          const id = `${displayName}_${prop.name}`;
          return (
            <div key={prop.name} className="prop">
              <div className="title">
                <span className="name">
                  <a id={id} href={`#${id}`} className="api-anchor">
                    #
                  </a>{' '}
                  <strong>{prop.name}</strong>
                </span>
                {prop.type && (
                  <span className="typedef">
                    <code>{prop.type.name}</code>
                  </span>
                )}
                {prop.required && <span className="kind-badge required">required</span>}
              </div>
              <div className="description">
                <Markdown>
                  {`${prop.description}${
                    prop.defaultValue
                      ? `\n\nDefault \`${String(prop.defaultValue.value) || '""'}\``
                      : ''
                  }`}
                </Markdown>
              </div>
            </div>
          );
        })
      )}
      <style jsx>{`
        h3 {
          margin-bottom: 0.5rem;
          margin-left: -29px;
          font-weight: 400;
        }
        h4 {
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: 16px;
        }
        .kind-badge {
          font-size: 12px;
          font-weight: 500;
          padding: 2px 8px;
          border-radius: 3px;
          margin-left: 8px;
        }
        .kind-badge.hook {
          background-color: #e3f2fd;
          color: #1976d2;
        }
        .kind-badge.function {
          background-color: #f3e5f5;
          color: #7b1fa2;
        }
        .kind-badge.required {
          background-color: #ffebee;
          color: #c62828;
        }
        .source-link {
          font-size: 14px;
          font-weight: 400;
          margin-left: 12px;
          color: #666;
          text-decoration: none;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .source-link:hover {
          opacity: 1;
          text-decoration: underline;
        }
        .doc-description {
          margin-bottom: 1rem;
          font-size: 16px;
        }
        .doc-description :global(p) {
          margin: 0.25rem 0;
        }
        .return-type {
          margin-top: 1rem;
          padding: 0.5rem;
          background-color: #f5f5f5;
          border-radius: 4px;
          font-size: 16px;
        }
        .return-type code {
          font-family: 'Menlo', monospace;
          background-color: transparent;
          font-weight: 400;
        }
        .prop:last-child {
          border-bottom: 1px solid #eaeaea;
        }
        .prop {
          padding: 0.5em 0.5em 0.5em 0;
          line-height: 1.2em;
          vertical-align: middle;
        }
        .export-name-anchor,
        .api-anchor {
          opacity: 0;
          scroll-margin-top: 88px;
        }
        .export-name-anchor {
          display: inline-block;
          margin-right: 12px;
        }
        .title:hover .api-anchor,
        h3:hover .export-name-anchor {
          opacity: 1;
        }
        .title {
          font-size: 18px;
          margin-left: -16px;
        }
        .title > :not(:last-child) {
          margin-right: 6px;
        }
        .description {
          max-width: 720px;
        }
        .description > :global(p) {
          font-size: 18px;
          margin: 0.25rem 0 0 0;
        }
        .typedef code {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen', 'Ubuntu',
            'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          background-color: transparent;
          font-weight: 400;
          color: grey;
          padding: 0;
          font-size: 16px;
        }
        .required {
          color: #fc2e1c;
        }
      `}</style>
    </div>
  );
}
