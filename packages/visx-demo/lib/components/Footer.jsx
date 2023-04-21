import React from 'react';
import Instagram from './icons/Instagram';
import Twitter from './icons/Twitter';
import Medium from './icons/Medium';
import GitHub from './icons/GitHub';
function Footer() {
    return (<footer className="wrapper">
      <div className="airbnb">
        <a href="https://airbnb.io">Airbnb.io</a>
      </div>
      <div className="social">
        <a href="https://github.com/airbnb/visx" className="icon" aria-label="github logo">
          <GitHub />
        </a>
        <a href="https://twitter.com/AirbnbEng" className="icon" aria-label="twitter logo">
          <Twitter />
        </a>
        <a href="https://instagram.com/AirbnbTech" className="icon" aria-label="instagram logo">
          <Instagram />
        </a>
        <a href="https://medium.com/airbnb-engineering" className="icon" aria-label="medium logo">
          <Medium />
        </a>
      </div>
      <style jsx>{"\n        footer {\n          align-self: center;\n          width: 95vw;\n          padding: 24px 0;\n          border-top: 1px solid #dfdfdf;\n          display: flex;\n          margin: 48px auto 48px;\n          font-weight: 300;\n        }\n        .airbnb {\n          margin-left: 24px;\n        }\n        .social {\n          margin: 0 24px;\n          display: flex;\n          flex-direction: row;\n          justify-content: flex-end;\n          flex: 1;\n          grid-gap: 2rem;\n        }\n        .icon {\n          width: 36px;\n          height: 36px;\n          justify-content: center;\n        }\n        @media (max-width: 600px) {\n          footer {\n            flex-direction: column;\n          }\n          .social {\n            margin-top: 1rem;\n            min-width: 240px;\n            justify-content: space-between;\n          }\n        }\n      "}</style>
    </footer>);
}
export default Footer;
