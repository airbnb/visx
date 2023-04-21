var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import Link from 'next/link';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
var renderLinkWrapper = function (url, node) {
    return url ? <Link href={url}>{node}</Link> : node;
};
export default function GalleryTile(_a) {
    var description = _a.description, _b = _a.detailsHeight, detailsHeight = _b === void 0 ? 76 : _b, detailsStyles = _a.detailsStyles, exampleProps = _a.exampleProps, exampleRenderer = _a.exampleRenderer, exampleUrl = _a.exampleUrl, tileStyles = _a.tileStyles, title = _a.title;
    return (<>
      {renderLinkWrapper(exampleUrl, <div className="gallery-tile" style={tileStyles}>
          <div className="image">
            <ParentSize>
              {function (_a) {
        var width = _a.width, height = _a.height;
        return React.createElement(exampleRenderer, __assign({ width: width, height: height + (title || description ? detailsHeight : 0) }, exampleProps));
    }}
            </ParentSize>
          </div>
          {(title || description) && (<div className="details" style={detailsStyles}>
              {title && <div className="title">{title}</div>}
              {description && (<div className="description">
                  <pre>{description}</pre>
                </div>)}
            </div>)}
        </div>)}
      <style jsx>{"\n        h3 {\n          margin-top: 0;\n          margin-left: 40px;\n          margin-bottom: 0;\n        }\n        .gallery-tile {\n          background-color: white;\n          margin: 5px;\n          display: flex;\n          height: 390px;\n          flex: 1;\n          min-width: 300px;\n          flex-direction: column;\n          border-radius: 14px;\n          cursor: pointer;\n        }\n        .image {\n          flex: 1;\n          display: flex;\n          overflow: hidden;\n        }\n        .details {\n          text-align: center;\n          padding: 15px 20px;\n          color: #ffffff;\n        }\n        .title {\n          font-weight: 900;\n          line-height: 0.9rem;\n        }\n        .description {\n          font-weight: 300;\n          font-size: 14px;\n        }\n        pre {\n          margin: 0;\n          background-color: transparent;\n          min-width: unset;\n        }\n        @media (max-width: 960px) {\n          .gallery-tile {\n            min-width: 45%;\n          }\n        }\n        @media (max-width: 600px) {\n          .gallery-tile {\n            min-width: 100%;\n          }\n        }\n      "}</style>
    </>);
}
