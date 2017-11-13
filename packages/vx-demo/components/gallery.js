import React from 'react';
import Tilt from 'react-tilt';
import Link from 'next/link';
import { ParentSize } from '@vx/responsive';
import { extent, max } from 'd3-array';

import Page from '../components/page';
import Footer from '../components/footer';

import Lines from '../components/tiles/lines';
import Bars from '../components/tiles/bars';
import Dots from '../components/tiles/dots';
import Patterns from '../components/tiles/patterns';
import Gradients from '../components/tiles/gradients';
import Area from '../components/tiles/area';
import Stacked from '../components/tiles/stacked';
import MultiLine from '../components/tiles/multiline';
import Axis from '../components/tiles/axis';
import BarGroup from '../components/tiles/bargroup';
import BarStack from '../components/tiles/barstack';
import BarStackHorizontal from '../components/tiles/barstackhorizontal';
import Heatmap from '../components/tiles/heatmap';
import LineRadial from '../components/tiles/lineradial';
import Pies from '../components/tiles/pie';
import Trees from '../components/tiles/tree';
import Cluster from '../components/tiles/dendrogram';
import Voronoi from '../components/tiles/voronoi';
import Legends from '../components/tiles/legends';
import BoxPlot from '../components/tiles/boxplot';
import GeoMercator from '../components/tiles/geo-mercator';
import Network from '../components/tiles/network';
import Streamgraph from '../components/tiles/streamgraph';
import Pack from '../components/tiles/pack';
import Treemap from '../components/tiles/treemap';
import Radar from '../components/tiles/radar';
import Responsive from '../components/tiles/responsive';

const items = [
  '#242424',
  '#c3dae8',
  '#ef5843',
  '#f5f2e3',
  '#f6c431',
  '#32deaa',
  'rgba(243, 129, 129, 1.000)',
  '#00f2ff',
  '#f4419f',
  '#3130e3',
  '#12122e',
  '#ff657c',
];

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const detailsHeight = 76;
    return (
      <div>
        <div className="gallery">
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/lines">
              <div
                className="gallery-item"
                style={{ background: items[0] }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <Lines
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div className="details">
                  <div className="title">Lines</div>
                  <div className="description">
                    <pre>{`<Shape.Line />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/bars">
              <div
                className="gallery-item"
                style={{ background: items[1] }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <Bars
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div className="details color-blue">
                  <div className="title">Bars</div>
                  <div className="description">
                    <pre>{`<Shape.Bar />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/dots">
              <div
                className="gallery-item"
                style={{ background: items[2] }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <Dots
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div
                  className="details color-yellow"
                  style={{ zIndex: 1 }}
                >
                  <div className="title">Dots</div>
                  <div className="description">
                    <pre>{`<Glyph.GlyphCircle />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/patterns">
              <div
                className="gallery-item"
                style={{ background: items[3] }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <Patterns
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div className="details color-gray">
                  <div className="title">Patterns</div>
                  <div className="description">
                    <pre>{`<Pattern />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/areas">
              <div
                className="gallery-item"
                style={{ background: items[5] }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <Area
                        width={width}
                        height={height + detailsHeight}
                        margin={{
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 80,
                        }}
                      />
                    )}
                  </ParentSize>
                </div>
                <div className="details" style={{ zIndex: 1 }}>
                  <div className="title">Areas</div>
                  <div className="description">
                    <pre>{`<Shape.AreaClosed />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/stacked-areas">
              <div
                className="gallery-item"
                style={{ background: items[6] }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <Stacked
                        width={width}
                        height={height + detailsHeight}
                        margin={{
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 80,
                        }}
                      />
                    )}
                  </ParentSize>
                </div>
                <div
                  className="details"
                  style={{ color: 'rgba(251, 224, 137, 1.000)' }}
                >
                  <div className="title">Stacked Areas</div>
                  <div className="description">
                    <pre>{`<Shape.AreaStack />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/gradients">
              <div
                className="gallery-item"
                style={{
                  background: 'white',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
                }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <Gradients
                        width={width}
                        height={height + detailsHeight}
                        margin={{
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 80,
                        }}
                      />
                    )}
                  </ParentSize>
                </div>
                <div className="details color-gray">
                  <div className="title">Gradients</div>
                  <div className="description">
                    <pre>{`<Gradient />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/glyphs">
              <div
                className="gallery-item"
                style={{ background: items[7] }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <MultiLine
                        width={width}
                        height={height + detailsHeight}
                        margin={{
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 80,
                        }}
                      />
                    )}
                  </ParentSize>
                </div>
                <div
                  className="details"
                  style={{ color: 'rgba(126, 31, 220, 1.000)' }}
                >
                  <div className="title">Glyphs</div>
                  <div className="description">
                    <pre>{`<Glyph.GlyphDot />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/axis">
              <div
                className="gallery-item"
                style={{ background: items[8] }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <Axis
                        width={width}
                        height={height + detailsHeight}
                        margin={{
                          top: 20,
                          left: 60,
                          right: 40,
                          bottom: 120,
                        }}
                      />
                    )}
                  </ParentSize>
                </div>
                <div className="details" style={{ color: '#8e205f' }}>
                  <div className="title">Axis</div>
                  <div className="description">
                    <pre
                    >{`<Axis.AxisLeft /> + <Axis.AxisBottom />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/bargroup">
              <div
                className="gallery-item"
                style={{ background: '#612efb' }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <BarGroup
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div className="details" style={{ color: '#e5fd3d' }}>
                  <div className="title">Bar Group</div>
                  <div className="description">
                    <pre>{`<Shape.BarGroup />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/barstack">
              <div
                className="gallery-item"
                style={{ background: '#eaedff' }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <BarStack
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div
                  className="details"
                  style={{ color: '#a44afe', zIndex: 1 }}
                >
                  <div className="title">Bar Stack</div>
                  <div className="description">
                    <pre>{`<Shape.BarStack />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/heatmaps">
              <div
                className="gallery-item"
                style={{ background: '#28272c' }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <Heatmap
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div
                  className="details"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  <div className="title">Heatmaps</div>
                  <div className="description">
                    <pre>{`<HeatmapCircle /> + <HeatmapRect />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/lineradial">
              <div
                className="gallery-item"
                style={{ background: '#744cca' }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <LineRadial width={width} height={height} />
                    )}
                  </ParentSize>
                </div>
                <div className="details" style={{ color: '#919fe5' }}>
                  <div className="title">Radial Lines</div>
                  <div className="description">
                    <pre>{`<Shape.LineRadial />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/pies">
              <div
                className="gallery-item"
                style={{ background: '#c94acc' }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <Pies
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div className="details" style={{ color: 'white' }}>
                  <div className="title">Pies</div>
                  <div className="description">
                    <pre>{`<Shape.Pie />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/trees">
              <div
                className="gallery-item"
                style={{ background: '#272b4d' }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <Trees
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div className="details" style={{ color: '#269688' }}>
                  <div className="title">Trees</div>
                  <div className="description">
                    <pre
                    >{`<Hierarchy.Tree /> + <Shape.LinkHorizontal />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/dendrograms">
              <div
                className="gallery-item"
                style={{ background: '#306c90' }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <Cluster
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div className="details" style={{ color: '#5dc26f' }}>
                  <div className="title">Dendrograms</div>
                  <div className="description">
                    <pre
                    >{`<Hierarchy.Cluster /> + <Shape.LinkVertical />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/legends">
              <div
                className="gallery-item"
                style={{ backgroundColor: 'black' }}
              >
                <div className="image">
                  <Legends />
                </div>
                <div className="details" style={{ color: '#494949' }}>
                  <div className="title">Legends</div>
                  <div className="description">
                    <pre>{`<Legend />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/voronoi">
              <div
                className="gallery-item"
                style={{
                  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 6px',
                }}
              >
                <div
                  className="image"
                  style={{
                    backgroundColor: '#eb6d88',
                    borderRadius: 14,
                  }}
                >
                  <ParentSize>
                    {({ width, height }) => (
                      <Voronoi
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div className="details" style={{ color: '#F54EA2' }}>
                  <div className="title">Voronoi</div>
                  <div className="description">
                    <pre>{`<Voronoi.VoronoiPolygon /> `}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>

          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/boxplot">
              <div
                className="gallery-item"
                style={{ background: '#88d1d9' }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <BoxPlot
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div
                  className="details"
                  style={{ color: '#FFFFFF', zIndex: 1 }}
                >
                  <div className="title">Stats Plots</div>
                  <div className="description">
                    <pre>{`<BoxPlot /> + <ViolinPlot /> `}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>

          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/geo-mercator">
              <div className="gallery-item">
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <GeoMercator
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div className="details" style={{ color: '#f63a48' }}>
                  <div className="title">Geo</div>
                  <div className="description">
                    <pre>{`<Geo.Mercator />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>

          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/network">
              <div className="gallery-item">
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <Network
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div
                  className="details"
                  style={{
                    color: '#ffffff',
                  }}
                >
                  <div className="title">Network</div>
                  <div className="description">
                    <pre>{`<Network.Graph />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>

          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/streamgraph">
              <div
                className="gallery-item"
                style={{ background: '#ffd7d9' }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <Streamgraph
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div
                  className="details"
                  style={{
                    color: '#036ecd',
                  }}
                >
                  <div className="title">Streamgraph</div>
                  <div className="description">
                    <pre>{`<Shape.Stack />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/pack">
              <div
                className="gallery-item"
                style={{
                  background: '#ffffff',
                  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 6px',
                }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <Pack
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div
                  className="details"
                  style={{
                    color: '#fd6c6f',
                  }}
                >
                  <div className="title">Pack</div>
                  <div className="description">
                    <pre>{`<Hierarchy.Pack />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/treemap">
              <div
                className="gallery-item"
                style={{
                  background: '#3436b8',
                }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <Treemap
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div
                  className="details"
                  style={{
                    color: '#00ff70',
                  }}
                >
                  <div className="title">Treemap</div>
                  <div className="description">
                    <pre>{`<Hierarchy.Treemap />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/radar">
              <div
                className="gallery-item"
                style={{
                  background: '#FAF7E9',
                }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <Radar
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div
                  className="details"
                  style={{
                    color: '#f5810c',
                  }}
                >
                  <div className="title">Radar</div>
                  <div className="description">
                    <pre
                    >{`<Shape.Line /> + <Shape.LineRadial />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/barstackhorizontal">
              <div
                className="gallery-item"
                style={{
                  background: '#FAF7E9',
                }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <BarStackHorizontal
                        width={width}
                        height={height + detailsHeight}
                      />
                    )}
                  </ParentSize>
                </div>
                <div
                  className="details"
                  style={{ color: '#a44afe', zIndex: 1 }}
                >
                  <div className="title">Bar Stack Horizontal</div>
                  <div className="description">
                    <pre>{`<Shape.BarStackHorizontal />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/responsive">
              <div
                className="gallery-item"
                style={{
                  background: 'white',
                }}
              >
                <div className="image">
                  <ParentSize>
                    {({ width, height }) => (
                      <Responsive
                        width={width}
                        height={height}
                        events={true}
                      />
                    )}
                  </ParentSize>
                </div>
                <div
                  className="details"
                  style={{
                    color: '#232323',
                    zIndex: 1,
                    border: '1px solid lightgray',
                    borderTop: 'none',
                    borderBottomLeftRadius: '14px',
                    borderBottomRightRadius: '14px',
                  }}
                >
                  <div className="title">Responsive</div>
                  <div className="description">
                    <pre>{`<Responsive.ParentSize />`}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>
          {false && <div className="gallery-item placeholder" />}
        </div>

        <div>
          <h1 style={{ textAlign: 'center', lineHeight: '.8em' }}>
            More on the way!
          </h1>
        </div>

        <Footer />

        <style jsx>{`
          h3 {
            margin-top: 0;
            margin-left: 40px;
            margin-bottom: 0;
          }
          .gallery {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-around;
            overflow-x: hidden;
            padding-bottom: 20px;
          }
          .gallery-item {
            background-color: white;
            margin: 5px;
            display: flex;
            height: 390px;
            flex: 1;
            min-width: 25%;
            flex-direction: column;
            border-radius: 14px;
          }
          .gallery-item.placeholder {
            height: 1px;
          }
          .image {
            flex: 1;
            display: flex;
          }
          .details {
            text-align: center;
            padding: 15px 20px;
            color: #ffffff;
          }
          .title {
            font-weight: 900;
            line-height: 0.9rem;
          }
          .description {
            font-weight: 300;
            font-size: 14px;
          }
          pre {
            margin: 0;
          }
          .color-blue {
            color: rgba(25, 231, 217, 1);
          }
          .color-yellow {
            color: #f6c431;
          }
          .color-gray {
            color: #333;
          }
          @media (max-width: 960px) {
            .gallery-item {
              min-width: 45%;
            }
          }
          @media (max-width: 600px) {
            .gallery-item {
              min-width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }
}
