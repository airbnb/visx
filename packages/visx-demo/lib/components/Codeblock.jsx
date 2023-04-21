import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Prism from 'prismjs';
// these have sequential dependencies
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-typescript.min';
import 'prismjs/components/prism-tsx.min';
function Lines(_a) {
    var lines = _a.lines;
    return (<span aria-hidden="true" className="line-numbers-rows">
      {lines.map(function (_, i) { return (<span key={"line-number-" + lines.length + "-" + i}/>); })}
    </span>);
}
export default function (_a) {
    var children = _a.children;
    var match = children.match(/\n(?!$)/g);
    var linesNum = match ? match.length + 1 : 1;
    var lines = new Array(linesNum + 1).fill(1);
    var html = [
        ReactDOMServer.renderToString(<Lines lines={lines}/>),
        Prism.highlight(children, Prism.languages.ts, 'tsx'),
    ].join('');
    return (<pre className="codeblock line-numbers">
      <code dangerouslySetInnerHTML={{ __html: html }}/>
      <style jsx>{"\n        .codeblock code {\n          display: block;\n          padding: 0 0 0 1.5rem;\n          border-radius: 0;\n          font-weight: 300;\n          font-size: 14px;\n          line-height: 1.4em;\n          background: white;\n          color: #495057;\n        }\n\n        .codeblock.line-numbers {\n          padding-left: 0;\n        }\n\n        @media (max-width: 600px) {\n          .codeblock code {\n            font-size: 10px;\n            padding: 0;\n            pointer-events: none;\n          }\n        }\n      "}</style>
    </pre>);
}
