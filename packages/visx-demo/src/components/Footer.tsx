import React from 'react';
import Twitter from './icons/Twitter';
import Medium from './icons/Medium';
import GitHub from './icons/GitHub';

function Footer() {
  return (
    <footer className="wrapper">
      <div className="airbnb">
        <a href="https://airbnb.io">Airbnb.io</a>
      </div>
      <div className="social">
        <a href="https://github.com/airbnb/visx" className="icon" aria-label="github logo">
          <GitHub />
        </a>
        <a href="https://x.com/AirbnbEng" className="icon" aria-label="x logo">
          <Twitter />
        </a>
        <a href="https://medium.com/airbnb-engineering" className="icon" aria-label="medium logo">
          <Medium />
        </a>
      </div>
      <style jsx>{`
        footer {
          align-self: center;
          width: 95vw;
          padding: 24px 0;
          border-top: 1px solid #dfdfdf;
          display: flex;
          margin: 48px auto 48px;
          font-weight: 300;
        }
        .airbnb {
          margin-left: 24px;
        }
        .social {
          margin: 0 24px;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          flex: 1;
          grid-gap: 2rem;
        }
        .icon {
          width: 36px;
          height: 36px;
          justify-content: center;
        }
        @media (max-width: 600px) {
          footer {
            flex-direction: column;
          }
          .social {
            margin-top: 1rem;
            min-width: 240px;
            justify-content: space-between;
          }
        }
      `}</style>
    </footer>
  );
}
export default Footer;
