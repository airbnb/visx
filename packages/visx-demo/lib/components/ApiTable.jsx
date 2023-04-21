var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useMemo } from 'react';
import Markdown from 'react-markdown/with-html';
import { toExportName } from './util/format';
var alphaSort = function (a, b) { return a.name.localeCompare(b.name); };
/** Renders a list of props for the passed docgenInfo */
export default function ApiTable(_a) {
    var docgenInfo = _a.docgenInfo;
    var _b = docgenInfo.displayName, displayName = _b === void 0 ? '' : _b;
    var anchorId = displayName;
    // required first, then abc order
    var props = useMemo(function () {
        var requiredProps = [];
        var optionalProps = [];
        Object.values(docgenInfo.props).forEach(function (prop) {
            if (prop.required) {
                requiredProps.push(prop);
            }
            else {
                optionalProps.push(prop);
            }
        });
        return __spreadArrays(requiredProps.sort(alphaSort), optionalProps.sort(alphaSort));
    }, [docgenInfo]);
    return (<div className="api">
      <h3>
        <a id={anchorId} href={"#" + anchorId} className="export-name-anchor">
          #
        </a>
        {toExportName(displayName)}
      </h3>
      {props.map(function (prop) {
        var id = displayName + "_" + prop.name;
        return (<div key={prop.name} className="prop">
            <div className="title">
              <span className="name">
                <a id={id} href={"#" + id} className="api-anchor">
                  #
                </a>{' '}
                <strong>{prop.name}</strong>
              </span>
              {prop.type && (<span className="typedef">
                  <code>{prop.type.name}</code>
                </span>)}
              <span className={prop.required ? 'required' : 'optional'}>
                {prop.required ? 'required' : ''}
              </span>{' '}
            </div>
            <div className="description">
              <Markdown source={"" + prop.description + (prop.defaultValue
            ? "\n\nDefault `" + (String(prop.defaultValue.value) || '""') + "`"
            : '')}/>
            </div>
          </div>);
    })}
      <style jsx>{"\n        h3 {\n          margin-bottom: 0.5rem;\n          margin-left: -29px;\n          font-weight: 400;\n        }\n        .prop:last-child {\n          border-bottom: 1px solid #eaeaea;\n        }\n        .prop {\n          padding: 0.5em 0.5em 0.5em 0;\n          line-height: 1.2em;\n          vertical-align: middle;\n        }\n        .export-name-anchor,\n        .api-anchor {\n          opacity: 0;\n          scroll-margin-top: 88px;\n        }\n        .export-name-anchor {\n          display: inline-block;\n          margin-right: 12px;\n        }\n        .title:hover .api-anchor,\n        h3:hover .export-name-anchor {\n          opacity: 1;\n        }\n        .title {\n          font-size: 18px;\n          margin-left: -16px;\n        }\n        .title > :not(:last-child) {\n          margin-right: 6px;\n        }\n        .description {\n          max-width: 720px;\n        }\n        .description > :global(p) {\n          font-size: 18px;\n          margin: 0.25rem 0 0 0;\n        }\n        .typedef code {\n          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen', 'Ubuntu',\n            'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;\n          background-color: transparent;\n          font-weight: 400;\n          color: grey;\n          padding: 0;\n          font-size: 16px;\n        }\n        .required {\n          color: #fc2e1c;\n        }\n      "}</style>
    </div>);
}
