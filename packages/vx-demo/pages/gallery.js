import React from 'react';
import Page from '../components/page';
import Footer from '../components/footer';
import Mock from '@vx/mock-data';
import Shape from '@vx/shape';
import Scale from '@vx/scale';
import Curve from '@vx/curve';
import Group from '@vx/group';
import { extent, max } from 'd3-array';

const items = [
  "#242424",
  "#c3dae8",
  "#ef5843",
  "#f5f2e3",
  "#f6c431",
  "#32deaa",
  "#fcec39",
  "#00f2ff",
  "#f4419f",
  "#3130e3",
  "#12122e",
  "#ff657c"
];

function genLines(num) {
  return new Array(num).fill(1).map(() => {
    return { data: Mock.genDateValue(20) };
  })
}

export default class Gallery extends React.Component {
  constructor() {
    super();
    this.t1data = genLines(12);
    this.nodes = new Set();
    this.state = { dimensions: [] };
    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize, false);
    console.log('mount')
    this.resize();
  }

  resize() {
    const newState = [];
    this.nodes.forEach((node) => {
      if (!node) return;
      newState.push([node.offsetWidth,node.offsetHeight]);
    });
    this.setState({dimensions: newState})
  }

  render() {
    const t1 = this.state.dimensions[0] || [8, 300];

    const allData = this.t1data.reduce((rec, d) => {
      return rec.concat(d.data)
    }, []);

    // bounds
    const xMax = t1[0];
    const yMax = t1[1] / 8;

    // accessors
    const x = d => d.date;
    const y = d => d.value;

    // scales
    const xScale = Scale.scaleTime({
      range: [0, xMax],
      domain: extent(allData, x),
    });
    const yScale = Scale.scaleLinear({
      range: [yMax, 0],
      domain: [0, max(allData, y)],
    });

    return (
      <Page title="gallery">
        <div className="gallery">
          <div
            className="gallery-item"
            style={{ background: items[0] }}
            ref={d => this.nodes.add(d)}
          >
            <div className="image">
              <svg width={t1[0]} height={t1[1]}>
                {xMax > 8 && this.t1data.map((d, i) => {
                  return (
                    <Group key={i} top={i * yMax/2}>
                      <Shape.LinePath
                        data={d.data}
                        xScale={xScale}
                        yScale={yScale}
                        x={x}
                        y={y}
                        stroke={"#ffffff"}
                        strokeWidth={1}
                        curve={i % 2 == 0 ? Curve.monotoneX : undefined}
                      />
                    </Group>
                  );
                })}
              </svg>
            </div>
            <div className="details">
              <div className="title">Lines</div>
              <div className="description">
                <pre>{`<Shape.Line />`}</pre>
              </div>
            </div>
          </div>
          <div className="gallery-item" style={{ background: items[1] }} ref={d => this.nodes.add(d)}>
            <div className="image"></div>
            <div className="details color-blue">
              <div className="title">Bars</div>
              <div className="description">
                <pre>{`<Shape.Bar />`}</pre>
              </div>
            </div>
          </div>
          <div className="gallery-item" style={{ background: items[2] }} ref={d => this.nodes.add(d)}>
            <div className="image"></div>
            <div className="details color-yellow">
              <div className="title">Dots</div>
              <div className="description">
                <pre>{`<Shape.Circle />`}</pre>
              </div>
            </div>
          </div>
          <div className="gallery-item" style={{ background: items[3] }} ref={d => this.nodes.add(d)}>
            <div className="image"></div>
            <div className="details">{items[3]}</div>
          </div>
          <div className="gallery-item" style={{ background: items[4] }} ref={d => this.nodes.add(d)}>
            <div className="image"></div>
            <div className="details">{items[4]}</div>
          </div>
        </div>
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
            max-width: 95vw;
            margin: 55px auto 40px;
            overflow-x: hidden;
          }
          .gallery-item {
            background-color: lightgray;
            margin: 5px;
            display: flex;
            height: 390px;
            flex: 1;
            min-width: 25%;
            flex-direction: column;
            border-radius: 14px;
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
          .color-blue { color: #333; }
          .color-yellow { opacity: 0.5; }

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
      </Page>
    );
  }
}
