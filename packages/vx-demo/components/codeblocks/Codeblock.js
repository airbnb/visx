import React from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min';

export default ({ children }) => {
  return (
    <pre className="codeblock">
      <code dangerouslySetInnerHTML={{__html: Prism.highlight(children, Prism.languages.jsx)}} />
      <style jsx>{`
        .codeblock code {
          background: #090910;
          max-height: 450px;
          overflow: scroll;
          display: block;
          border: 1px solid #2b2a2e;
          padding: 0 2rem 2rem;
          margin-top: 2rem;
        }
      `}</style>
    </pre>
  );
}
