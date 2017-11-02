import React from 'react';
import Tilt from 'react-tilt';
import Link from 'next/link';
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
  constructor() {
    super();
    this.nodes = new Set();
    this.state = { dimensions: [] };
    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize, false);
    setTimeout(() => {
      this.resize();
    }, 1);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize() {
    const newState = [];
    this.nodes.forEach(node => {
      if (!node) return;
      newState.push([node.offsetWidth, node.clientHeight]);
    });
    this.setState({ dimensions: newState });
  }

  render() {
    const t1 = this.state.dimensions[0] || [8, 300];
    const t2 = this.state.dimensions[1] || [8, 300];
    const t3 = this.state.dimensions[2] || [8, 300];
    const t4 = this.state.dimensions[3] || [8, 300];
    const t5 = this.state.dimensions[4] || [8, 300];
    const t6 = this.state.dimensions[5] || [8, 300];
    const t7 = this.state.dimensions[6] || [8, 300];
    const t8 = this.state.dimensions[7] || [8, 300];
    const t9 = this.state.dimensions[8] || [8, 300];
    const t10 = this.state.dimensions[9] || [8, 300];
    const t11 = this.state.dimensions[10] || [8, 300];
    const t12 = this.state.dimensions[11] || [8, 300];
    const t13 = this.state.dimensions[12] || [8, 300];
    const t14 = this.state.dimensions[13] || [8, 300];
    const t15 = this.state.dimensions[14] || [8, 300];
    const t16 = this.state.dimensions[15] || [8, 300];
    const t17 = this.state.dimensions[16] || [8, 300];
    const t18 = this.state.dimensions[17] || [8, 300];
    const t19 = this.state.dimensions[18] || [8, 300];
    const t20 = this.state.dimensions[19] || [8, 300];
    const t21 = this.state.dimensions[20] || [8, 300];
    const t22 = this.state.dimensions[21] || [8, 300];
    const t23 = this.state.dimensions[22] || [8, 300];
    const t24 = this.state.dimensions[23] || [8, 300];

    return (
      <div>
        <div className="gallery">
          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/lines">
              <div
                className="gallery-item"
                style={{ background: items[0] }}
                ref={d => this.nodes.add(d)}
              >
                <div className="image">
                  <Lines width={t1[0]} height={t1[1]} />
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
                ref={d => this.nodes.add(d)}
              >
                <div className="image">
                  <Bars width={t2[0]} height={t2[1]} />
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
                ref={d => this.nodes.add(d)}
              >
                <div className="image">
                  <Dots width={t3[0]} height={t3[1]} />
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
                ref={d => this.nodes.add(d)}
              >
                <div className="image">
                  <Patterns width={t4[0]} height={t4[1]} />
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
                ref={d => this.nodes.add(d)}
              >
                <div className="image">
                  <Area
                    width={t5[0]}
                    height={t5[1]}
                    margin={{
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 80,
                    }}
                  />
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
                ref={d => this.nodes.add(d)}
              >
                <div className="image">
                  <Stacked
                    width={t6[0]}
                    height={t6[1]}
                    margin={{
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 80,
                    }}
                  />
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
                ref={d => this.nodes.add(d)}
              >
                <div className="image">
                  <Gradients width={t7[0]} height={t7[1]} />
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
                ref={d => this.nodes.add(d)}
              >
                <div className="image">
                  <MultiLine
                    width={t8[0]}
                    height={t8[1]}
                    margin={{
                      top: 10,
                      left: 0,
                      right: 0,
                      bottom: 80,
                    }}
                  />
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
                ref={d => this.nodes.add(d)}
              >
                <div className="image">
                  <Axis
                    width={t9[0]}
                    height={t9[1]}
                    margin={{
                      top: 20,
                      left: 60,
                      right: 40,
                      bottom: 120,
                    }}
                  />
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
                ref={d => this.nodes.add(d)}
              >
                <div className="image">
                  <BarGroup width={t10[0]} height={t10[1]} />
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
                ref={d => this.nodes.add(d)}
              >
                <div className="image">
                  <BarStack width={t11[0]} height={t11[1]} />
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
                ref={d => this.nodes.add(d)}
              >
                <div className="image">
                  <Heatmap width={t12[0]} height={t12[1]} />
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
                ref={d => this.nodes.add(d)}
              >
                <div className="image">
                  <LineRadial width={t13[0]} height={t13[1] - 80} />
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
                ref={d => this.nodes.add(d)}
              >
                <div className="image">
                  <Pies width={t14[0]} height={t14[1]} />
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
                ref={d => this.nodes.add(d)}
              >
                <div className="image">
                  <Trees width={t15[0]} height={t15[1]} />
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
                ref={d => this.nodes.add(d)}
              >
                <div className="image">
                  <Cluster width={t15[0]} height={t15[1]} />
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
                ref={d => this.nodes.add(d)}
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
                ref={d => this.nodes.add(d)}
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
                  <Voronoi width={t16[0]} height={t16[1]} />
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
                ref={d => this.nodes.add(d)}
                style={{ background: '#fd7e14' }}
              >
                <div className="image">
                  <BoxPlot width={t17[0]} height={t17[1]} />
                </div>
                <div
                  className="details"
                  style={{ color: '#FFFFFF', zIndex: 1 }}
                >
                  <div className="title">BoxPlot</div>
                  <div className="description">
                    <pre>{`<BoxPlot /> `}</pre>
                  </div>
                </div>
              </div>
            </Link>
          </Tilt>

          <Tilt className="tilt" options={{ max: 8, scale: 1 }}>
            <Link prefetch href="/geo-mercator">
              <div
                className="gallery-item"
                ref={d => this.nodes.add(d)}
              >
                <div className="image">
                  <GeoMercator width={t18[0]} height={t18[1]} />
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
              <div
                className="gallery-item"
                ref={d => this.nodes.add(d)}
              >
                <div className="image">
                  <Network width={t19[0]} height={t19[1]} />
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
                ref={d => this.nodes.add(d)}
                style={{ background: '#ffd7d9' }}
              >
                <div className="image">
                  <Streamgraph width={t20[0]} height={t20[1]} />
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
                ref={d => this.nodes.add(d)}
                style={{
                  background: '#ffffff',
                  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 6px',
                }}
              >
                <div className="image">
                  <Pack width={t21[0]} height={t21[1]} />
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
                ref={d => this.nodes.add(d)}
                style={{
                  background: '#3436b8',
                }}
              >
                <div className="image">
                  <Treemap width={t22[0]} height={t22[1]} />
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
                ref={d => this.nodes.add(d)}
                style={{
                  background: '#FAF7E9',
                }}
              >
                <div className="image">
                  <Radar width={t23[0]} height={t23[1]} />
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
                ref={d => this.nodes.add(d)}
                style={{
                  background: '#FAF7E9',
                }}
              >
                <div className="image">
                  <BarStackHorizontal
                    width={t24[0]}
                    height={t24[1]}
                  />
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
          {<div className="gallery-item placeholder" />}
          {<div className="gallery-item placeholder" />}
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
