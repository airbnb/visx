import React, { Component } from 'react';
import { Text } from '@vx/text';
import Show from '../components/show';
import Codeblock from '../components/codeblocks/Codeblock';

class TextDemo extends Component {
  state = {
    exampleText: 'This is really long text',
    x: 0,
    y: 0,
    width: 225,
    height: 200,
    angle: 0,
    scaleToFit: false,
    textAnchor: 'start',
    verticalAnchor: 'start',
    fontSize: '1em',
    fontFamily: 'Arial',
    fontWeight: 400,
    lineHeight: '1em',
    showAnchor: true,
    resizeSvg: true
  };

  render() {
    const styles = {
      exampleText: {
        width: 200
      },
      range: {
        marginLeft: 20,
        width: 225
      },
      svg: {
        height: 200,
        display: 'block',
        border: '1px solid #aaa',
        marginBottom: 10
      }
    };

    return (
      <div className="text-demo--container">
        <div className="text-demo">
          <div className="text-demo--left">
            <h6>Demo</h6>
            <svg width={this.state.resizeSvg ? this.state.width : 225} style={styles.svg}>
              <Text
                x={this.state.x}
                y={this.state.y}
                width={this.state.width}
                textAnchor={this.state.textAnchor}
                verticalAnchor={this.state.verticalAnchor}
                lineHeight={this.state.lineHeight}
                scaleToFit={this.state.scaleToFit}
                angle={this.state.angle}
                style={{
                  fontSize: this.state.fontSize,
                  fontFamily: this.state.fontFamily,
                  fontWeight: this.state.fontWeight
                }}
              >
                {this.state.exampleText}
              </Text>
              {this.state.showAnchor && (
                <circle cx={this.state.x} cy={this.state.y} r="2" fill="red" />
              )}
            </svg>
          </div>
          <div className="text-demo--form">
            <div>
              text:
              <input
                type="text"
                style={styles.exampleText}
                value={this.state.exampleText}
                onChange={e => this.setState({ exampleText: e.target.value })}
              />
            </div>

            <div>
              x:
              <input
                type="range"
                style={styles.range}
                min="0"
                max="225"
                value={this.state.x}
                onChange={e => this.setState({ x: Number(e.target.value) })}
              />
              <input
                type="text"
                value={this.state.x}
                onChange={e => this.setState({ x: Number(e.target.value) })}
              />
            </div>

            <div>
              y:
              <input
                type="range"
                style={styles.range}
                min="0"
                max="200"
                value={this.state.y}
                onChange={e => this.setState({ y: Number(e.target.value) })}
              />
              <input
                type="text"
                value={this.state.y}
                onChange={e => this.setState({ y: Number(e.target.value) })}
              />
            </div>

            <div>
              width:
              <input
                type="range"
                style={styles.range}
                min="25"
                max="225"
                value={this.state.width}
                onChange={e => this.setState({ width: Number(e.target.value) })}
              />{' '}
              {this.state.width}
            </div>

            <div>
              textAnchor:
              <label>
                <input
                  type="radio"
                  value="start"
                  onChange={e => this.setState({ textAnchor: e.target.value })}
                  checked={this.state.textAnchor === 'start'}
                />{' '}
                start
              </label>
              <label>
                <input
                  type="radio"
                  value="middle"
                  onChange={e => this.setState({ textAnchor: e.target.value })}
                  checked={this.state.textAnchor === 'middle'}
                />{' '}
                middle
              </label>
              <label>
                <input
                  type="radio"
                  value="end"
                  onChange={e => this.setState({ textAnchor: e.target.value })}
                  checked={this.state.textAnchor === 'end'}
                />{' '}
                end
              </label>
            </div>

            <div>
              verticalAnchor:
              <label>
                <input
                  type="radio"
                  value="start"
                  onChange={e => this.setState({ verticalAnchor: e.target.value })}
                  checked={this.state.verticalAnchor === 'start'}
                />{' '}
                start
              </label>
              <label>
                <input
                  type="radio"
                  value="middle"
                  onChange={e => this.setState({ verticalAnchor: e.target.value })}
                  checked={this.state.verticalAnchor === 'middle'}
                />{' '}
                middle
              </label>
              <label>
                <input
                  type="radio"
                  value="end"
                  onChange={e => this.setState({ verticalAnchor: e.target.value })}
                  checked={this.state.verticalAnchor === 'end'}
                />{' '}
                end
              </label>
            </div>

            <div>
              fontSize:
              <input
                type="text"
                value={this.state.fontSize}
                onChange={e => this.setState({ fontSize: e.target.value })}
              />
            </div>

            <div>
              fontFamily:
              <input
                type="text"
                value={this.state.fontFamily}
                onChange={e => this.setState({ fontFamily: e.target.value })}
              />
            </div>

            <div>
              fontWeight:
              <input
                type="text"
                value={this.state.fontWeight}
                onChange={e => this.setState({ fontWeight: e.target.value })}
              />
            </div>

            <div>
              lineHeight:
              <input
                type="text"
                value={this.state.lineHeight}
                onChange={e => this.setState({ lineHeight: e.target.value })}
              />
            </div>

            <div>
              angle:
              <input
                type="range"
                min="0"
                max="360"
                value={this.state.angle}
                onChange={e => this.setState({ angle: Number(e.target.value) })}
              />
            </div>

            <div>
              <label>
                scaleToFit:
                <input
                  type="checkbox"
                  onChange={e =>
                    this.setState({
                      scaleToFit: !this.state.scaleToFit
                    })
                  }
                  checked={this.state.scaleToFit}
                />
              </label>
            </div>

            <div>
              <label>
                show anchor:
                <input
                  type="checkbox"
                  onChange={e =>
                    this.setState({
                      showAnchor: !this.state.showAnchor
                    })
                  }
                  checked={this.state.showAnchor}
                />
              </label>
            </div>

            <div>
              <label>
                resize svg (container):
                <input
                  type="checkbox"
                  onChange={e =>
                    this.setState({
                      resizeSvg: !this.state.resizeSvg
                    })
                  }
                  checked={this.state.resizeSvg}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="text-demos">
          <div>
            <h6>Simple</h6>
            <svg width={this.state.resizeSvg ? this.state.width : 225} style={styles.svg}>
              <Text x={0} width={this.state.width} verticalAnchor="start">
                {this.state.exampleText}
              </Text>
            </svg>
            <div style={{ marginBottom: '1rem' }}>
              <div>
                <div className="code">
                  <Codeblock>{`import { Text } from '@vx/text';

({ text }) => {
  return (
    <Text
      x={0}
      width={this.state.width}
      verticalAnchor="start"
    >
      {text}
    </Text>
  );
}`}</Codeblock>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h6>Centered</h6>
            <svg width={this.state.resizeSvg ? this.state.width : 225} style={styles.svg}>
              <Text
                x={this.state.width / 2}
                width={this.state.width}
                verticalAnchor="start"
                textAnchor="middle"
              >
                {this.state.exampleText}
              </Text>
            </svg>
            <div style={{ marginBottom: '1rem' }}>
              <div>
                <div className="code">
                  <Codeblock>{`import { Text } from '@vx/text';

({ text, width }) => {
  return (
    <Text
      x={width / 2}
      width={width}
      verticalAnchor="start"
      textAnchor="middle"
    >
      {text}
    </Text>
  );
}`}</Codeblock>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h6>Right-aligned</h6>
            <svg width={this.state.resizeSvg ? this.state.width : 225} style={styles.svg}>
              <Text
                x={this.state.width}
                width={this.state.width}
                verticalAnchor="start"
                textAnchor="end"
              >
                {this.state.exampleText}
              </Text>
            </svg>
            <div style={{ marginBottom: '1rem' }}>
              <div>
                <div className="code">
                  <Codeblock>{`import { Text } from '@vx/text';

({ text, width }) => {
  return (
    <Text
      x={width}
      width={width}
      verticalAnchor="start"
      textAnchor="end"
    >
      {text}
    </Text>
  );
}`}</Codeblock>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h6>Line height</h6>
            <svg width={this.state.resizeSvg ? this.state.width : 225} style={styles.svg}>
              <Text x={0} width={this.state.width} verticalAnchor="start" lineHeight="2em">
                {this.state.exampleText}
              </Text>
            </svg>
            <div style={{ marginBottom: '1rem' }}>
              <div>
                <div className="code">
                  <Codeblock>{`import { Text } from '@vx/text';

({ text, width }) => {
  return (
    <Text
      x={0}
      width={width}
      verticalAnchor="start"
      lineHeight="2em"
    >
      {text}
    </Text>
  );
}`}</Codeblock>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h6>Styled text (fontWeight)</h6>
            <svg width={this.state.resizeSvg ? this.state.width : 225} style={styles.svg}>
              <Text
                x={0}
                width={this.state.width}
                verticalAnchor="start"
                style={{ fontWeight: 900 }}
              >
                {this.state.exampleText}
              </Text>
            </svg>
            <div style={{ marginBottom: '1rem' }}>
              <div>
                <div className="code">
                  <Codeblock>{`import { Text } from '@vx/text';

({ text, width }) => {
  return (
    <Text
      x={0}
      width={width}
      verticalAnchor="start"
      style={{ fontWeight: 900 }}
    >
      {text}
    </Text>
  );
}`}</Codeblock>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h6>Styled (fontSize px)</h6>
            <svg width={this.state.resizeSvg ? this.state.width : 225} style={styles.svg}>
              <Text
                x={0}
                width={this.state.width}
                verticalAnchor="start"
                style={{ fontSize: '24px' }}
              >
                {this.state.exampleText}
              </Text>
            </svg>
            <div style={{ marginBottom: '1rem' }}>
              <div>
                <div className="code">
                  <Codeblock>{`import { Text } from '@vx/text';

({ text, width }) => {
  return (
    <Text
      x={0}
      width={width}
      verticalAnchor="start"
      style={{ fontSize: '24px' }}
    >
      {text}
    </Text>
  );
}`}</Codeblock>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h6>Styled (fontSize em)</h6>
            <svg width={this.state.resizeSvg ? this.state.width : 225} style={styles.svg}>
              <Text
                x={0}
                width={this.state.width}
                verticalAnchor="start"
                style={{ fontSize: '1.5em' }}
              >
                {this.state.exampleText}
              </Text>
            </svg>
            <div style={{ marginBottom: '1rem' }}>
              <div>
                <div className="code">
                  <Codeblock>{`import { Text } from '@vx/text';

({ text, width }) => {
  return (
    <Text
      x={0}
      width={width}
      verticalAnchor="start"
      style={{ fontSize: '1.5em' }}
    >
      {text}
    </Text>
  );
}`}</Codeblock>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h6>Styled (fontSize rem)</h6>
            <svg width={this.state.resizeSvg ? this.state.width : 225} style={styles.svg}>
              <Text
                x={0}
                width={this.state.width}
                verticalAnchor="start"
                style={{ fontSize: '1.5rem' }}
              >
                {this.state.exampleText}
              </Text>
            </svg>
            <div style={{ marginBottom: '1rem' }}>
              <div>
                <div className="code">
                  <Codeblock>{`import { Text } from '@vx/text';

({ text, width }) => {
  return (
    <Text
      x={0}
      width={width}
      verticalAnchor="start"
      style={{ fontSize: '1.5rem' }}
    >
      {text}
    </Text>
  );
}`}</Codeblock>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h6>Styled (fontSize %)</h6>
            <svg width={this.state.resizeSvg ? this.state.width : 225} style={styles.svg}>
              <Text
                x={0}
                width={this.state.width}
                verticalAnchor="start"
                style={{ fontSize: '150%' }}
              >
                {this.state.exampleText}
              </Text>
            </svg>
            <div style={{ marginBottom: '1rem' }}>
              <div>
                <div className="code">
                  <Codeblock>{`import { Text } from '@vx/text';

({ text, width }) => {
  return (
    <Text
      x={0}
      width={width}
      verticalAnchor="start"
      style={{ fontSize: '150%' }}
    >
      {text}
    </Text>
  );
}`}</Codeblock>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h6>Fit</h6>
            <svg width={this.state.resizeSvg ? this.state.width : 225} style={styles.svg}>
              <Text width={this.state.width} verticalAnchor="start" scaleToFit>
                {this.state.exampleText}
              </Text>
            </svg>
            <div style={{ marginBottom: '1rem' }}>
              <div>
                <div className="code">
                  <Codeblock>{`import { Text } from '@vx/text';

({ text, width }) => {
  return (
    <Text
      width={width}
      verticalAnchor="start"
      scaleToFit
    >
      {text}
    </Text>
  );
}`}</Codeblock>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h6>dx & dy</h6>
            <svg width={this.state.resizeSvg ? this.state.width : 225} style={styles.svg}>
              <Text x={50} y={50} dx={10} dy={-10} width={this.state.width} verticalAnchor="start">
                {this.state.exampleText}
              </Text>
            </svg>
            <div style={{ marginBottom: '1rem' }}>
              <div>
                <div className="code">
                  <Codeblock>{`import { Text } from '@vx/text';

({ text, width }) => {
  return (
    <Text
      x={50}
      y={50}
      dx={10}
      dy={-10}
      width={width}
      verticalAnchor="start"
    >
      {text}
    </Text>
  );
}`}</Codeblock>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .text-demos {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 1rem;
            padding: 1rem;
            grid-auto-rows: minmax(10px, auto);
          }
          .text-demos h6 {
            margin-bottom: 0.5rem;
            margin-top: 0.5rem;
          }
          .text-demo {
            display: flex;
            flex-direction: row;
            border: 1px solid #d3d3d3;
            border-radius: 14px;
            padding: 1rem;
          }
          .text-demo--left {
            display: flex;
            flex-direction: column;
            flex: 1;
          }
          .text-demo--left h6 {
            margin-top: 0;
          }
          .text-demo--form {
            font-size: 12px;
          }
          .text-demo--form input {
            margin-left: 0.5rem;
          }
          .text-demo--container {
            width: 800px;
          }
        `}</style>
      </div>
    );
  }
}

export default () => {
  return (
    <Show
      component={TextDemo}
      title="Text"
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 10
      }}
    />
  );
};
