import React from 'react';
import Page from '../components/page';
import Mock from '@vx/mock-data';
import Curve from '@vx/curve';
import SimpleLineChart from '../components/charts/SimpleLineChart';
import SimpleAreaChart from '../components/charts/SimpleAreaChart';
import SimpleLineWithGlyphsChart from '../components/charts/SimpleLineWithGlyphsChart';
import SimpleLineCode from '../components/codeblocks/SimpleLineCode';
import SimpleAreaCode from '../components/codeblocks/SimpleAreaCode';
import SimpleLineGlyphCode from '../components/codeblocks/SimpleLineGlyphCode';

export default () => {
  const data1 = Mock.genDateValue(20);
  const data2 = Mock.genDateValue(20);

  const width = 720;
  const height = 400;
  const margin = {
    top: 60,
    bottom: 60,
    left: 80,
    right: 80,
  };

  return (
    <Page title="gallery">
      <div className="page-left gallery">
        <div className="item simpleline">
          <div className="item-top">
            <div className="chart-title">
              <a name="simpleline" />
              Simple line chart
              <a href="https://github.com/hshoff/vx/blob/master/packages/vx-demo/components/charts/SimpleLineChart.js">
                <small> view source</small>
              </a>
            </div>
            <SimpleLineChart
              width={width}
              height={height}
              margin={margin}
              dataset={[{
                data: data1,
              }, {
                data: data2
              }]}
            />
          </div>
          <div className="item-bottom">
            <div>
              <SimpleLineCode />
            </div>
          </div>
        </div>
        <div className="item simplearea">
          <div className="item-top">
            <div className="chart-title">
              <a name="simplearea" />
              Simple area chart
              <a href="https://github.com/hshoff/vx/blob/master/packages/vx-demo/components/charts/SimpleAreaChart.js">
                <small> view source</small>
              </a>
            </div>
            <SimpleAreaChart
              width={width}
              height={height}
              margin={margin}
            />
          </div>
          <div className="item-bottom">
            <div>
              <SimpleAreaCode />
            </div>
          </div>
        </div>
        <div className="item">
          <div className="item-top">
            <div className="chart-title">
              <a name="simplelineglyphs" />
              Simple line with glyphs chart
              <a href="https://github.com/hshoff/vx/blob/master/packages/vx-demo/components/charts/SimpleLineWithGlyphsChart.js">
                <small> view source</small>
              </a>
            </div>
            <SimpleLineWithGlyphsChart
              width={width}
              height={height}
              margin={margin}
              dataset={[{
                data: data2,
                chart: {
                  stroke: '#6A7DD3',
                  strokeWidth: 4,
                  backgroundColor: 'white',
                }
              }]}
            />
          </div>
          <div className="item-bottom">
            <div>
              <SimpleLineGlyphCode />
            </div>
          </div>
        </div>
      </div>
    <div className="page-right">
      <ul>
        <li>
          <a href="#simpleline">Simple line chart</a>
        </li>
        <li>
          <a href="#simplearea">Simple area chart</a>
        </li>
        <li>
          <a href="#simplelineglyphs">Simple line with glyphs chart</a>
        </li>
      </ul>
    </div>

      <style jsx>{`
        .gallery {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: flex-start;
          margin-top: 0;
        }

        .item {
          display: block;
          padding: 2rem 4rem 4rem;
          margin: 2rem;
          border: 1px solid #f0f0f0;
          border-radius: 3px;
        }

        .item h4 {
          text-align: center;
          margin-top: .5rem;
        }

        .item-top,
        .item-bottom {
          display: block;
        }

        .item-bottom {
          color: white;
          padding-left: 4rem;
        }

        .item:last-child {
          margin-bottom: 100px;
        }

        .simpleline {
          color: white;
          background-color: #090910;
        }

        .chart-title {
          margin-top: 1rem;
          margin-left: 4rem;
        }

        .page-right {
          color: black;
        }

        .page-right ul {
          position: fixed;
        }
      `}</style>
    </Page>
  )
}
