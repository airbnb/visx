import React, { useMemo } from 'react';
import cx from 'classnames';
import withScreenSize from '@visx/responsive/lib/enhancers/withScreenSize';
import CodeSandboxLink from './CodeSandboxLink';
import Page from './Page';
import Codeblock from './Codeblock';
import VisxDocLink from './VisxDocLink';
import extractVisxDepsFromPackageJson from './util/extractVisxDepsFromPackageJson';
var padding = 40;
export default withScreenSize(function (_a) {
    var screenWidth = _a.screenWidth, children = _a.children, title = _a.title, component = _a.component, _b = _a.shadow, shadow = _b === void 0 ? false : _b, _c = _a.events, events = _c === void 0 ? false : _c, margin = _a.margin, description = _a.description, codeSandboxDirectoryName = _a.codeSandboxDirectoryName, packageJson = _a.packageJson;
    var width = Math.min(800, (screenWidth || 0) - padding);
    var height = width * 0.6;
    var visxDeps = useMemo(function () { return extractVisxDepsFromPackageJson(packageJson); }, [packageJson]);
    return (<Page title={title}>
        <div className="container">
          <div style={{ width: width }}>
            <h1>{title}</h1>
            <div className={cx(!!shadow && 'shadow', title.split(' ').join('-'), 'chart')}>
              {React.createElement(component, {
        width: width,
        height: height,
        margin: margin,
        events: events,
    })}
            </div>
            {description && React.createElement(description, { width: width, height: height })}
            {codeSandboxDirectoryName && (<div className="sandbox-link">
                <CodeSandboxLink exampleDirectoryName={codeSandboxDirectoryName}/>
              </div>)}
            {visxDeps.length > 0 && (<>
                <h2>Documentation</h2>
                <div className="doc-links">
                  {visxDeps.map(function (packageName) { return (<VisxDocLink key={packageName} packageName={packageName}/>); })}
                </div>
              </>)}
            {children && (<>
                <h2>Code</h2>
                <div className="code">
                  <Codeblock>{children}</Codeblock>
                </div>
              </>)}
          </div>
        </div>
        <style jsx>{"\n          .container {\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            overflow: hidden;\n            margin-bottom: 40px;\n          }\n          .container h1 {\n            margin-top: 15px;\n            line-height: 0.9em;\n            letter-spacing: -0.03em;\n          }\n          .container h2 {\n            margin-top: 15px;\n            margin-bottom: 5px;\n          }\n          .chart {\n            border-radius: 14px;\n          }\n          .shadow {\n            border-radius: 14px;\n            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);\n          }\n          .sandbox-link {\n            display: flex;\n            justify-content: flex-end;\n          }\n          .doc-links {\n            font-size: 13px;\n          }\n          .doc-links :global(a) {\n            margin-right: 6px;\n          }\n        "}</style>
      </Page>);
});
