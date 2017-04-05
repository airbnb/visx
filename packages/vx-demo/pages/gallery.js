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

  const width = 800;
  const height = 400;
  const margin = {
    top: 60,
    bottom: 60,
    left: 80,
    right: 80,
  };

  return (
    <Page title="gallery">
      <div className="gallery">
        <div className="item simpleline">
          <div className="item-top">
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
            <div>Simple line chart <a href="https://github.com/hshoff/vx/blob/master/packages/vx-demo/components/charts/SimpleLineChart.js">&lt;&gt;</a></div>
            <div>
              <SimpleLineCode />
            </div>
          </div>
        </div>
        <div className="item simplearea">
          <div className="item-top">
            <SimpleAreaChart
              width={width}
              height={height}
              margin={margin}
            />
          </div>
          <div className="item-bottom">
            <div className="chart-title">Simple area chart <a href="https://github.com/hshoff/vx/blob/master/packages/vx-demo/components/charts/SimpleAreaChart.js">&lt;&gt;</a></div>
            <div>
              <SimpleAreaCode />
            </div>
          </div>
        </div>
        <div className="item">
          <div className="item-top">
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
            <div className="chart-title">Simple line with glyphs chart <a href="https://github.com/hshoff/vx/blob/master/packages/vx-demo/components/charts/SimpleLineWithGlyphsChart.js">&lt;&gt;</a></div>
            <div>
              <SimpleLineGlyphCode />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gallery {
          display: flex;
          flex: 1;
          flex-direction: column;
        }

        .item {
          display: block;
          padding: 4rem 4rem 0;
        }

        .item h4 {
          text-align: center;
          margin-top: .5rem;
        }

        .item-top,
        .item-bottom {
          display: block;
          max-width: 800px;
        }

        .item-bottom {
          color: white;
          padding-left: 4rem;
        }

        .item:last-child {
          margin-bottom: 100px;
        }

        .simpleline {
          background-color: #090910;
          padding: 0 4rem 4rem;
        }

        .simplearea {
          background-color: #efefef;
          padding: 4rem;
        }

        .chart-title {
          color: black;
          margin-top: 1rem;
        }
      `}</style>
    </Page>
  )
}
