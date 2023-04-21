import React from 'react';
import Link from 'next/link';
function NavItem(_a) {
    var id = _a.id, href = _a.href, children = _a.children, className = _a.className, external = _a.external;
    return (<li className="Item">
      {external ? (<a id={id} href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>) : (<Link href={href}>
          <a id={id} className={className}>
            {children}
          </a>
        </Link>)}

      <style jsx>{"\n        .Item a {\n          display: inline-block;\n          padding: 10px;\n          text-decoration: none;\n          color: #272727;\n          font-weight: 400;\n          font-size: 18px;\n        }\n        .Item .github {\n          font-weight: 600;\n          color: #fc2e1c;\n        }\n\n        @media (max-width: 600px) {\n          .Item {\n            display: block;\n            float: left;\n          }\n\n          .Item .github {\n            margin-top: 0;\n          }\n        }\n      "}</style>
    </li>);
}
export default NavItem;
