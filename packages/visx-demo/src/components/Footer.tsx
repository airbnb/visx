import React from 'react';

export default () => (
  <div className="footer">
    <div>
      <img src="/static/favicon.ico" alt="visx" />
    </div>
    <div>
      made by <a href="https://github.com/airbnb">airbnb</a>
    </div>
    <style jsx>{`
      .footer {
        text-align: center;
        margin-bottom: 1rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        font-size: 14px;
      }
    `}</style>
  </div>
);
