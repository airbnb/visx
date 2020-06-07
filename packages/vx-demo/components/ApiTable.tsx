import React, { useMemo } from 'react';
import Markdown from 'react-markdown/with-html';
import { DocGenInfo, PropInfo } from '../types';

type Props = {
  docgenInfo: DocGenInfo;
};

const alphaSort = (a: PropInfo, b: PropInfo) => a.name.localeCompare(b.name);

/** Renders a list of props for the passed docgenInfo */
export default function ApiTable({ docgenInfo }: Props) {
  const { displayName = '' } = docgenInfo;
  const isComponent = displayName && displayName[0].toLowerCase() !== displayName[0];
  const anchorId = displayName;

  // required first, then abc order
  const props = useMemo(() => {
    const requiredProps: PropInfo[] = [];
    const optionalProps: PropInfo[] = [];

    Object.values(docgenInfo.props).forEach(prop => {
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
        <a id={anchorId} href={`#${anchorId}`}>
          #
        </a>
        {isComponent && <>&lt;</>}
        {displayName}
        {isComponent && <>&nbsp;/&gt;</>}
      </h3>
      {props.map(prop => {
        const id = `${displayName}_${prop.name}`;
        return (
          <div key={prop.name} className="prop">
            <div className="title">
              <span className="name">
                <a id={id} href={`#${id}`}>
                  #
                </a>{' '}
                <em>{displayName}</em>.<strong>{prop.name}</strong>
              </span>
              {prop.type && <code>{prop.type.name}</code>}
              <span className={prop.required ? 'required' : 'optional'}>
                {prop.required ? 'required' : 'optional'}
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
        h3 + .prop {
          border-top: 1px solid #eaeaea;
        }
        .prop:last-child {
          border-bottom: 1px solid #eaeaea;
        }
        .prop {
          padding: 1em 0.5em 1em 0;
          line-height: 1.2em;
          vertical-align: middle;
        }
        .title > :not(:last-child) {
          margin-right: 12px;
        }
        .description > :global(p) {
          font-size: 15px;
          margin: 0;
        }
        .required {
          color: #fc2e1c;
        }
      `}</style>
    </div>
  );
}
