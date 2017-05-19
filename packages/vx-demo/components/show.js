import React from 'react';
import cx from 'classnames';
import { withScreenSize } from '@vx/responsive';
import Page from '../components/page';
import Footer from '../components/footer';
import Bars from '../components/tiles/bars';
import Codeblock from '../components/codeblocks/Codeblock';

export default withScreenSize(({
  screenWidth,
  screenHeight,
  children,
  title,
  component,
  shadow = false,
  margin = { top: 0, left: 0, right: 0, bottom: 80 }
}) => {
  const padding = 40;
  const height = screenHeight * .6;
  let width = screenWidth - padding;
  if (width > 800) width = 800;

  return (
    <Page title={title}>
      <div className="container">
        <div style={{width: width}}>
          <h1>{title}</h1>
        </div>
        <div className={cx({
          'shadow': !!shadow
          }, title.split(' ').join('-'), 'chart')
        }>
          {component({ width, height, margin })}
        </div>
        <div style={{width: width}}>
          <h2>Code</h2>
        </div>
        <div className="code" style={{width: width}}>
          <Codeblock>
            {children}
          </Codeblock>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .container:first-child {
          margin-top: 55px;
        }
        .container h1 {
          margin-top: 15px;
          line-height: .9em;
          letter-spacing: -.03em;
        }
        .container h2 {
          margin-top: 15px;
          margin-bottom: 5px;
        }
        .chart {
          overflow: hidden;
          border-radius: 14px;
        }
        .shadow {
          border-radius: 14px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.1);
        }
      `}</style>
    </Page>
  );
});
