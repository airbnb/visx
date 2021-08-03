import React, { useState } from 'react';
import { Text } from '@visx/text';
import Show from '../components/Show';
import Codeblock from '../components/Codeblock';

const styles = {
  exampleText: {
    width: 200,
  },
  range: {
    marginLeft: 20,
    width: 225,
  },
  svg: {
    height: 200,
    display: 'block',
    border: '1px solid #aaa',
    marginBottom: 10,
  },
};

function TextDemo() {
  const [exampleText, setExampleText] = useState<string>('This is really long text');
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [width, setWidth] = useState<number>(225);
  const [angle, setAngle] = useState<number>(0);
  const [scaleToFit, setScaleToFit] = useState<boolean>(false);
  const [textAnchor, setTextAnchor] = useState<string>('start');
  const [verticalAnchor, setVerticalAnchor] = useState<string>('start');
  const [fontSize, setFontSize] = useState<string>('1em');
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [fontWeight, setFontWeight] = useState<string>('400');
  const [lineHeight, setLineHeight] = useState<string>('1em');
  const [showAnchor, setShowAnchor] = useState<boolean>(true);
  const [resizeSvg, setResizeSvg] = useState<boolean>(true);

  return (
    <div className="text-demo--container">
      <div className="text-demo">
        <div className="text-demo--left">
          <h6>Demo</h6>
          <svg width={resizeSvg ? width : 225} style={styles.svg}>
            <Text
              x={x}
              y={y}
              width={width}
              textAnchor={textAnchor as 'start' | 'inherit' | 'middle' | 'end'}
              verticalAnchor={verticalAnchor as 'start' | 'middle' | 'end'}
              lineHeight={lineHeight}
              scaleToFit={scaleToFit}
              angle={angle}
              style={{
                fontSize,
                fontFamily,
                fontWeight: isNaN(Number(fontWeight)) ? 200 : Number(fontWeight),
              }}
            >
              {exampleText}
            </Text>
            {showAnchor && <circle cx={x} cy={y} r="2" fill="red" />}
          </svg>
        </div>
        <div className="text-demo--form">
          <div>
            text:
            <input
              type="text"
              style={styles.exampleText}
              value={exampleText}
              onChange={(e) => setExampleText(e.target.value)}
            />
          </div>

          <div>
            x:
            <input
              type="range"
              style={styles.range}
              min="0"
              max="225"
              value={x}
              onChange={(e) => setX(Number(e.target.value))}
            />
            <input type="text" value={x} onChange={(e) => setX(Number(e.target.value))} />
          </div>

          <div>
            y:
            <input
              type="range"
              style={styles.range}
              min="0"
              max="200"
              value={y}
              onChange={(e) => setY(Number(e.target.value))}
            />
            <input type="text" value={y} onChange={(e) => setY(Number(e.target.value))} />
          </div>

          <div>
            width:
            <input
              type="range"
              style={styles.range}
              min="25"
              max="225"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
            />{' '}
            {width}
          </div>

          <div>
            textAnchor:
            <label>
              <input
                type="radio"
                value="start"
                onChange={(e) => setTextAnchor(e.target.value)}
                checked={textAnchor === 'start'}
              />{' '}
              start
            </label>
            <label>
              <input
                type="radio"
                value="middle"
                onChange={(e) => setTextAnchor(e.target.value)}
                checked={textAnchor === 'middle'}
              />{' '}
              middle
            </label>
            <label>
              <input
                type="radio"
                value="end"
                onChange={(e) => setTextAnchor(e.target.value)}
                checked={textAnchor === 'end'}
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
                onChange={(e) => setVerticalAnchor(e.target.value)}
                checked={verticalAnchor === 'start'}
              />{' '}
              start
            </label>
            <label>
              <input
                type="radio"
                value="middle"
                onChange={(e) => setVerticalAnchor(e.target.value)}
                checked={verticalAnchor === 'middle'}
              />{' '}
              middle
            </label>
            <label>
              <input
                type="radio"
                value="end"
                onChange={(e) => setVerticalAnchor(e.target.value)}
                checked={verticalAnchor === 'end'}
              />{' '}
              end
            </label>
          </div>

          <div>
            fontSize:
            <input type="text" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
          </div>

          <div>
            fontFamily:
            <input type="text" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} />
          </div>

          <div>
            fontWeight:
            <input type="text" value={fontWeight} onChange={(e) => setFontWeight(e.target.value)} />
          </div>

          <div>
            lineHeight:
            <input type="text" value={lineHeight} onChange={(e) => setLineHeight(e.target.value)} />
          </div>

          <div>
            angle:
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
            />
          </div>

          <div>
            <label>
              scaleToFit:
              <input
                type="checkbox"
                onChange={() => setScaleToFit(!scaleToFit)}
                checked={scaleToFit}
              />
            </label>
          </div>

          <div>
            <label>
              show anchor:
              <input
                type="checkbox"
                onChange={() => setShowAnchor(!showAnchor)}
                checked={showAnchor}
              />
            </label>
          </div>

          <div>
            <label>
              resize svg (container):
              <input
                type="checkbox"
                onChange={() => setResizeSvg(!resizeSvg)}
                checked={resizeSvg}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="text-demos">
        <div>
          <h6>Simple</h6>
          <svg width={resizeSvg ? width : 225} style={styles.svg}>
            <Text x={0} width={width} verticalAnchor="start">
              {exampleText}
            </Text>
          </svg>
          <div style={{ marginBottom: '1rem' }}>
            <div>
              <div className="code">
                <Codeblock>{`import { Text } from '@visx/text';

({ text }) => {
return (
  <Text
    x={0}
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

        <div>
          <h6>Centered</h6>
          <svg width={resizeSvg ? width : 225} style={styles.svg}>
            <Text x={width / 2} width={width} verticalAnchor="start" textAnchor="middle">
              {exampleText}
            </Text>
          </svg>
          <div style={{ marginBottom: '1rem' }}>
            <div>
              <div className="code">
                <Codeblock>{`import { Text } from '@visx/text';

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
          <svg width={resizeSvg ? width : 225} style={styles.svg}>
            <Text x={width} width={width} verticalAnchor="start" textAnchor="end">
              {exampleText}
            </Text>
          </svg>
          <div style={{ marginBottom: '1rem' }}>
            <div>
              <div className="code">
                <Codeblock>{`import { Text } from '@visx/text';

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
          <svg width={resizeSvg ? width : 225} style={styles.svg}>
            <Text x={0} width={width} verticalAnchor="start" lineHeight="2em">
              {exampleText}
            </Text>
          </svg>
          <div style={{ marginBottom: '1rem' }}>
            <div>
              <div className="code">
                <Codeblock>{`import { Text } from '@visx/text';

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
          <svg width={resizeSvg ? width : 225} style={styles.svg}>
            <Text x={0} width={width} verticalAnchor="start" style={{ fontWeight: 900 }}>
              {exampleText}
            </Text>
          </svg>
          <div style={{ marginBottom: '1rem' }}>
            <div>
              <div className="code">
                <Codeblock>{`import { Text } from '@visx/text';

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
          <svg width={resizeSvg ? width : 225} style={styles.svg}>
            <Text x={0} width={width} verticalAnchor="start" style={{ fontSize: '24px' }}>
              {exampleText}
            </Text>
          </svg>
          <div style={{ marginBottom: '1rem' }}>
            <div>
              <div className="code">
                <Codeblock>{`import { Text } from '@visx/text';

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
          <svg width={resizeSvg ? width : 225} style={styles.svg}>
            <Text x={0} width={width} verticalAnchor="start" style={{ fontSize: '1.5em' }}>
              {exampleText}
            </Text>
          </svg>
          <div style={{ marginBottom: '1rem' }}>
            <div>
              <div className="code">
                <Codeblock>{`import { Text } from '@visx/text';

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
          <svg width={resizeSvg ? width : 225} style={styles.svg}>
            <Text x={0} width={width} verticalAnchor="start" style={{ fontSize: '1.5rem' }}>
              {exampleText}
            </Text>
          </svg>
          <div style={{ marginBottom: '1rem' }}>
            <div>
              <div className="code">
                <Codeblock>{`import { Text } from '@visx/text';

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
          <svg width={resizeSvg ? width : 225} style={styles.svg}>
            <Text x={0} width={width} verticalAnchor="start" style={{ fontSize: '150%' }}>
              {exampleText}
            </Text>
          </svg>
          <div style={{ marginBottom: '1rem' }}>
            <div>
              <div className="code">
                <Codeblock>{`import { Text } from '@visx/text';

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
          <svg width={resizeSvg ? width : 225} style={styles.svg}>
            <Text width={width} verticalAnchor="start" scaleToFit>
              {exampleText}
            </Text>
          </svg>
          <div style={{ marginBottom: '1rem' }}>
            <div>
              <div className="code">
                <Codeblock>{`import { Text } from '@visx/text';

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
          <svg width={resizeSvg ? width : 225} style={styles.svg}>
            <Text x={50} y={50} dx={10} dy={-10} width={width} verticalAnchor="start">
              {exampleText}
            </Text>
          </svg>
          <div style={{ marginBottom: '1rem' }}>
            <div>
              <div className="code">
                <Codeblock>{`import { Text } from '@visx/text';

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

const packageJson = { dependencies: { '@visx/text': 'latest' } };

const TextPage = () => (
  <Show
    component={TextDemo}
    title="Text"
    margin={{
      top: 0,
      left: 0,
      right: 0,
      bottom: 10,
    }}
    packageJson={packageJson}
  />
);
export default TextPage;
