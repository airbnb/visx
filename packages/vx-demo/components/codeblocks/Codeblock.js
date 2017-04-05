import React from 'react';
import ReactDOMServer from 'react-dom/server'
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min';

const Lines = ({ lines }) => {
  const size = lines.length;
  return (
    <span aria-hidden="true" className="line-numbers-rows">
      {lines.map((l,i) => {
        return <span key={`line-number-${size}-${i}`} />
      })}
    </span>
  );
}

export default ({ children }) => {
  const match = children.match(/\n(?!$)/g);
  const linesNum = match ? match.length + 1 : 1;
  let lines = new Array(linesNum + 1).fill(1);
  const html = [
    ReactDOMServer.renderToString(<Lines lines={lines} />),
    Prism.highlight(children, Prism.languages.jsx)
  ].join('');

  return (
    <pre className="codeblock line-numbers">
      <code dangerouslySetInnerHTML={{__html: html}} />
      <style jsx>{`
        .codeblock code {
          background: #090910;
          max-height: 600px;
          overflow-y: scroll;
          display: block;
          padding: 0 0 2rem 3rem;
          border-radius: 0;
          border-bottom-right-radius: 3px;
          border-bottom-left-radius: 3px;
        }

        .codeblock.line-numbers {
          padding-left: 0;
        }
      `}</style>
    </pre>
  );
}
