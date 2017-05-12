import React from 'react';
import Page from '../components/page';
import Footer from '../components/footer';
import Mock from '@vx/mock-data';
import Shape from '@vx/shape';
import Scale from '@vx/scale';
import Curve from '@vx/curve';
import Group from '@vx/group';
import { extent, max } from 'd3-array';
import Lines from '../components/tiles/lines';
import Bars from '../components/tiles/bars';
import Dots from '../components/tiles/dots';

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

export default class Gallery extends React.Component {
  constructor() {
    super();
    this.nodes = new Set();
    this.state = { dimensions: [] };
    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize, false);
    this.resize();
  }

  resize() {
    const newState = [];
    this.nodes.forEach((node) => {
      if (!node) return;
      newState.push([node.offsetWidth,node.offsetHeight]);
    });
    this.setState({ dimensions: newState });
  }

  render() {
    const t1 = this.state.dimensions[0] || [8, 300];
    const t2 = this.state.dimensions[1] || [8, 300];
    const t3 = this.state.dimensions[2] || [8, 300];

    return (
      <Page title="gallery">
        <div className="gallery">
          <div
            className="gallery-item"
            style={{ background: items[0] }}
            ref={d => this.nodes.add(d)}
          >
            <div className="image">
              <Lines
                width={t1[0]}
                height={t1[1]}
              />
            </div>
            <div className="details">
              <div className="title">Lines</div>
              <div className="description">
                <pre>{`<Shape.Line />`}</pre>
              </div>
            </div>
          </div>
          <div className="gallery-item" style={{ background: items[1] }} ref={d => this.nodes.add(d)}>
            <div className="image">
              <Bars
                width={t2[0]}
                height={t2[1]}
              />
            </div>
            <div className="details color-blue">
              <div className="title">Bars</div>
              <div className="description">
                <pre>{`<Shape.Bar />`}</pre>
              </div>
            </div>
          </div>
          <div className="gallery-item" style={{ background: items[2] }} ref={d => this.nodes.add(d)}>
            <div className="image">
              <Dots
                width={t3[0]}
                height={t3[1]}
              />
            </div>
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
          <div className="gallery-item" style={{ background: items[5] }} ref={d => this.nodes.add(d)}>
            <div className="image"></div>
            <div className="details">{items[5]}</div>
          </div>
          <div className="gallery-item" style={{ background: items[6] }} ref={d => this.nodes.add(d)}>
            <div className="image"></div>
            <div className="details">{items[6]}</div>
          </div>
          <div className="gallery-item" style={{ background: items[7] }} ref={d => this.nodes.add(d)}>
            <div className="image"></div>
            <div className="details">{items[7]}</div>
          </div>
          <div className="gallery-item" style={{ background: items[8] }} ref={d => this.nodes.add(d)}>
            <div className="image"></div>
            <div className="details">{items[8]}</div>
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
          .color-blue { color: rgba(87, 67, 214, .7); }
          .color-yellow { color: #f6c431; }

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
