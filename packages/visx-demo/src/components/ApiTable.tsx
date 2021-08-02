import React, { useMemo } from 'react';
import Markdown from 'react-markdown/with-html';
import { DocGenInfo, PropInfo } from '../types';
import { toExportName } from './util/format';

type Props = {
  docgenInfo: DocGenInfo;
};

const alphaSort = (a: PropInfo, b: PropInfo) => a.name.localeCompare(b.name);

/** Renders a list of props for the passed docgenInfo */
export default function ApiTable({ docgenInfo }: Props) {
  const { displayName = '' } = docgenInfo;
  const anchorId = displayName;

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
      </h3>
      {props.map((prop) => {
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
              <span className={prop.required ? 'required' : 'optional'}>
                {prop.required ? 'required' : ''}
              </span>{' '}
            </div>
            <div className="description">
              <Markdown
                source={`${prop.description}${
                  prop.defaultValue
                    ? `\n\nDefault \`${String(prop.defaultValue.value) || '""'}\``
                    : ''
                }`}
              />
            </div>
          </div>
        );
      })}
      <style jsx>{`
        h3 {
          margin-bottom: 0.5rem;
          margin-left: -29px;
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
