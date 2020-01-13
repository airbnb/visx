import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Prism from 'prismjs';
// @ts-ignore
import 'prismjs/components/prism-jsx.min';

const Lines = ({ lines }: { lines: number[] }) => {
  const size = lines.length;
  return (
    <span aria-hidden="true" className="line-numbers-rows">
      {lines.map((_, i) => {
        return <span key={`line-number-${size}-${i}`} />;
      })}
    </span>
  );
};

export default ({ children }: { children: string }) => {
  const match = children.match(/\n(?!$)/g);
  const linesNum = match ? match.length + 1 : 1;
  const lines: number[] = new Array(linesNum + 1).fill(1);
  const html = [
    ReactDOMServer.renderToString(<Lines lines={lines} />),
    Prism.highlight(children, Prism.languages.jsx, 'jsx'),
  ].join('');

  return (
    <pre className="codeblock line-numbers">
      <code dangerouslySetInnerHTML={{ __html: html }} />
      <style jsx>{`
        .codeblock code {
          display: block;
          padding: 0 0 0 1.5rem;
          border-radius: 0;
          font-weight: 300;
          font-size: 14px;
          line-height: 1.4em;
          background: white;
          color: #495057;
        }

        .codeblock.line-numbers {
          padding-left: 0;
        }

        @media (max-width: 600px) {
          .codeblock code {
            font-size: 10px;
            padding: 0;
            pointer-events: none;
          }
        }
      `}</style>
    </pre>
  );
};
