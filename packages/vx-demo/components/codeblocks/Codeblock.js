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
          max-height: 600px;
          overflow-y: scroll;
          display: block;
          margin-top: 2rem;
        }
      `}</style>
    </pre>
  );
}
