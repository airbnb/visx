/* eslint-disable no-underscore-dangle */
import React from 'react';
import Markdown from 'react-markdown/with-html';
import ApiTable from './ApiTable';
import PackageList from './PackageList';
import Page from './Page';
import { toExportName } from './util/format';
export default function DocPage(_a) {
    var components = _a.components, examples = _a.examples, visxPackage = _a.visxPackage, readme = _a.readme;
    return (<Page wrapper={false} title={"@visx/" + visxPackage + " documentation"}>
      <div className="doc-container">
        <div className="doc-nav">
          <PackageList compact grid={false} emphasizePackage={visxPackage}/>
        </div>
        <div className="doc-content">
          <div className="doc-readme">
            <Markdown escapeHtml={false} source={readme}/>
          </div>
          {examples && examples.length > 0 && (<>
              <h2>Examples</h2>
              <div className="examples">
                {examples.map(function (example, i) { return (<div key={i} className="example">
                    {React.createElement(example)}
                  </div>); })}
              </div>
            </>)}
          {components && components.length > 0 && (<div className="component-docs">
              <div>
                <h2>APIs</h2>
                {components.map(function (component) {
        // @ts-expect-error TS doesn't know about docgenInfo
        var docgenInfo = component.__docgenInfo;
        return docgenInfo ? (<ApiTable key={docgenInfo.displayName} docgenInfo={docgenInfo}/>) : null;
    })}
              </div>
              <div>
                <h2>Exports</h2>
                <ul>
                  {components.map(function (component) {
        // @ts-expect-error TS doesn't know about docgenInfo
        var docgenInfo = component === null || component === void 0 ? void 0 : component.__docgenInfo;
        var _a = (docgenInfo || {}).displayName, displayName = _a === void 0 ? '' : _a;
        return docgenInfo ? (<li key={displayName}>
                        <a className="export-anchor" href={"#" + displayName}>
                          {toExportName(displayName)}
                        </a>
                      </li>) : null;
    })}
                </ul>
              </div>
            </div>)}
        </div>
      </div>
      <style jsx>{"\n        .doc-container {\n          margin-top: 24px;\n          display: flex;\n          flex-direction: row;\n        }\n        .doc-content {\n          width: 100%;\n        }\n        .doc-content :global(h1) {\n          margin-bottom: 1.2em;\n          line-height: 0;\n          font-size: 2em;\n        }\n        .doc-content :global(img) {\n          max-width: 50vw;\n          max-height: 50vh;\n        }\n        .doc-content :global(th),\n        .doc-content :global(td) {\n          border: 1px solid;\n          padding: 5px 10px 5px 5px;\n        }\n        .doc-nav {\n          margin-right: 5em;\n          width: 140px;\n          flex-shrink: 0;\n        }\n        .doc-content :global(code) {\n          font-family: 'Menlo', monospace;\n          padding: 0.2rem 0.3rem;\n          background-color: #efefef;\n          line-height: 1.8em;\n          font-size: 0.8em;\n          font-weight: normal;\n        }\n        .doc-content :global(code[class*='language-']) {\n          background-color: transparent;\n          font-weight: 300;\n          color: #222;\n          box-shadow: none;\n        }\n        .doc-readme {\n          max-width: 720px;\n          font-size: 18px;\n        }\n        .doc-readme :global(pre) {\n          background-color: #efefef;\n          display: inline-block;\n          padding: 0.5em;\n          min-width: 33vw;\n          border-radius: 3px;\n          font-weight: normal;\n          max-width: 720px;\n          line-height: 1.1em;\n          word-break: break-word;\n        }\n        .doc-readme :global(pre code) {\n          max-width: 720px;\n          font-size: 16px;\n          line-height: 1.1em;\n          word-break: break-word;\n          white-space: pre-wrap; /* css-3 */\n          white-space: -moz-pre-wrap; /* Mozilla, since 1999 */\n          white-space: -pre-wrap; /* Opera 4-6 */\n          white-space: -o-pre-wrap; /* Opera 7 */\n        }\n        .doc-content :global(table) {\n          border-collapse: collapse;\n          font-size: 16px;\n          line-height: 1em;\n          border-color: #efefef;\n          margin-top: 0.25rem;\n        }\n        .examples {\n          display: flex;\n          flex-wrap: wrap;\n        }\n        .example {\n          min-width: 400px;\n          max-width: 33%;\n          flex-grow: 1;\n        }\n        .component-docs {\n          display: grid;\n          grid-gap: 2rem;\n          grid-template-columns: 1fr 320px;\n        }\n        ul {\n          margin-top: 0.5rem;\n        }\n        li {\n          line-height: 1em;\n        }\n        .doc-content :global(.export-anchor) {\n          line-height: 1.5em;\n          font-size: 16px;\n          padding: 0;\n        }\n        @media (max-width: 800px) {\n          .doc-container {\n            flex-direction: column-reverse;\n            min-width: 90vw;\n            max-width: 90vw;\n            margin: 0;\n          }\n          .example {\n            max-width: 100%;\n          }\n          .component-docs {\n            grid-template-columns: 1fr;\n          }\n        }\n      "}</style>
    </Page>);
}
