import React, { useState } from 'react';
import { Text } from '@visx/text';
import Show from '../components/Show';
import Codeblock from '../components/Codeblock';
var styles = {
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
    var _a = useState('This is really long text'), exampleText = _a[0], setExampleText = _a[1];
    var _b = useState(0), x = _b[0], setX = _b[1];
    var _c = useState(0), y = _c[0], setY = _c[1];
    var _d = useState(225), width = _d[0], setWidth = _d[1];
    var _e = useState(0), angle = _e[0], setAngle = _e[1];
    var _f = useState(false), scaleToFit = _f[0], setScaleToFit = _f[1];
    var _g = useState('start'), textAnchor = _g[0], setTextAnchor = _g[1];
    var _h = useState('start'), verticalAnchor = _h[0], setVerticalAnchor = _h[1];
    var _j = useState('1em'), fontSize = _j[0], setFontSize = _j[1];
    var _k = useState('Arial'), fontFamily = _k[0], setFontFamily = _k[1];
    var _l = useState('400'), fontWeight = _l[0], setFontWeight = _l[1];
    var _m = useState('1em'), lineHeight = _m[0], setLineHeight = _m[1];
    var _o = useState(true), showAnchor = _o[0], setShowAnchor = _o[1];
    var _p = useState(true), resizeSvg = _p[0], setResizeSvg = _p[1];
    return (<div className="text-demo--container">
      <div className="text-demo">
        <div className="text-demo--left">
          <h6>Demo</h6>
          <svg width={resizeSvg ? width : 225} style={styles.svg}>
            <Text x={x} y={y} width={width} textAnchor={textAnchor} verticalAnchor={verticalAnchor} lineHeight={lineHeight} scaleToFit={scaleToFit} angle={angle} style={{
        fontSize: fontSize,
        fontFamily: fontFamily,
        fontWeight: isNaN(Number(fontWeight)) ? 200 : Number(fontWeight),
    }}>
              {exampleText}
            </Text>
            {showAnchor && <circle cx={x} cy={y} r="2" fill="red"/>}
          </svg>
        </div>
        <div className="text-demo--form">
          <div>
            text:
            <input type="text" style={styles.exampleText} value={exampleText} onChange={function (e) { return setExampleText(e.target.value); }}/>
          </div>

          <div>
            x:
            <input type="range" style={styles.range} min="0" max="225" value={x} onChange={function (e) { return setX(Number(e.target.value)); }}/>
            <input type="text" value={x} onChange={function (e) { return setX(Number(e.target.value)); }}/>
          </div>

          <div>
            y:
            <input type="range" style={styles.range} min="0" max="200" value={y} onChange={function (e) { return setY(Number(e.target.value)); }}/>
            <input type="text" value={y} onChange={function (e) { return setY(Number(e.target.value)); }}/>
          </div>

          <div>
            width:
            <input type="range" style={styles.range} min="25" max="225" value={width} onChange={function (e) { return setWidth(Number(e.target.value)); }}/>{' '}
            {width}
          </div>

          <div>
            textAnchor:
            <label>
              <input type="radio" value="start" onChange={function (e) { return setTextAnchor(e.target.value); }} checked={textAnchor === 'start'}/>{' '}
              start
            </label>
            <label>
              <input type="radio" value="middle" onChange={function (e) { return setTextAnchor(e.target.value); }} checked={textAnchor === 'middle'}/>{' '}
              middle
            </label>
            <label>
              <input type="radio" value="end" onChange={function (e) { return setTextAnchor(e.target.value); }} checked={textAnchor === 'end'}/>{' '}
              end
            </label>
          </div>

          <div>
            verticalAnchor:
            <label>
              <input type="radio" value="start" onChange={function (e) { return setVerticalAnchor(e.target.value); }} checked={verticalAnchor === 'start'}/>{' '}
              start
            </label>
            <label>
              <input type="radio" value="middle" onChange={function (e) { return setVerticalAnchor(e.target.value); }} checked={verticalAnchor === 'middle'}/>{' '}
              middle
            </label>
            <label>
              <input type="radio" value="end" onChange={function (e) { return setVerticalAnchor(e.target.value); }} checked={verticalAnchor === 'end'}/>{' '}
              end
            </label>
          </div>

          <div>
            fontSize:
            <input type="text" value={fontSize} onChange={function (e) { return setFontSize(e.target.value); }}/>
          </div>

          <div>
            fontFamily:
            <input type="text" value={fontFamily} onChange={function (e) { return setFontFamily(e.target.value); }}/>
          </div>

          <div>
            fontWeight:
            <input type="text" value={fontWeight} onChange={function (e) { return setFontWeight(e.target.value); }}/>
          </div>

          <div>
            lineHeight:
            <input type="text" value={lineHeight} onChange={function (e) { return setLineHeight(e.target.value); }}/>
          </div>

          <div>
            angle:
            <input type="range" min="0" max="360" value={angle} onChange={function (e) { return setAngle(Number(e.target.value)); }}/>
          </div>

          <div>
            <label>
              scaleToFit:
              <input type="checkbox" onChange={function () { return setScaleToFit(!scaleToFit); }} checked={scaleToFit}/>
            </label>
          </div>

          <div>
            <label>
              show anchor:
              <input type="checkbox" onChange={function () { return setShowAnchor(!showAnchor); }} checked={showAnchor}/>
            </label>
          </div>

          <div>
            <label>
              resize svg (container):
              <input type="checkbox" onChange={function () { return setResizeSvg(!resizeSvg); }} checked={resizeSvg}/>
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
                <Codeblock>{"import { Text } from '@visx/text';\n\n({ text }) => {\nreturn (\n  <Text\n    x={0}\n    width={width}\n    verticalAnchor=\"start\"\n  >\n    {text}\n  </Text>\n);\n}"}</Codeblock>
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
                <Codeblock>{"import { Text } from '@visx/text';\n\n({ text, width }) => {\nreturn (\n  <Text\n    x={width / 2}\n    width={width}\n    verticalAnchor=\"start\"\n    textAnchor=\"middle\"\n  >\n    {text}\n  </Text>\n);\n}"}</Codeblock>
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
                <Codeblock>{"import { Text } from '@visx/text';\n\n({ text, width }) => {\nreturn (\n  <Text\n    x={width}\n    width={width}\n    verticalAnchor=\"start\"\n    textAnchor=\"end\"\n  >\n    {text}\n  </Text>\n);\n}"}</Codeblock>
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
                <Codeblock>{"import { Text } from '@visx/text';\n\n({ text, width }) => {\nreturn (\n  <Text\n    x={0}\n    width={width}\n    verticalAnchor=\"start\"\n    lineHeight=\"2em\"\n  >\n    {text}\n  </Text>\n);\n}"}</Codeblock>
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
                <Codeblock>{"import { Text } from '@visx/text';\n\n({ text, width }) => {\nreturn (\n  <Text\n    x={0}\n    width={width}\n    verticalAnchor=\"start\"\n    style={{ fontWeight: 900 }}\n  >\n    {text}\n  </Text>\n);\n}"}</Codeblock>
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
                <Codeblock>{"import { Text } from '@visx/text';\n\n({ text, width }) => {\nreturn (\n  <Text\n    x={0}\n    width={width}\n    verticalAnchor=\"start\"\n    style={{ fontSize: '24px' }}\n  >\n    {text}\n  </Text>\n);\n}"}</Codeblock>
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
                <Codeblock>{"import { Text } from '@visx/text';\n\n({ text, width }) => {\nreturn (\n  <Text\n    x={0}\n    width={width}\n    verticalAnchor=\"start\"\n    style={{ fontSize: '1.5em' }}\n  >\n    {text}\n  </Text>\n);\n}"}</Codeblock>
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
                <Codeblock>{"import { Text } from '@visx/text';\n\n({ text, width }) => {\nreturn (\n  <Text\n    x={0}\n    width={width}\n    verticalAnchor=\"start\"\n    style={{ fontSize: '1.5rem' }}\n  >\n    {text}\n  </Text>\n);\n}"}</Codeblock>
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
                <Codeblock>{"import { Text } from '@visx/text';\n\n({ text, width }) => {\nreturn (\n  <Text\n    x={0}\n    width={width}\n    verticalAnchor=\"start\"\n    style={{ fontSize: '150%' }}\n  >\n    {text}\n  </Text>\n);\n}"}</Codeblock>
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
                <Codeblock>{"import { Text } from '@visx/text';\n\n({ text, width }) => {\nreturn (\n  <Text\n    width={width}\n    verticalAnchor=\"start\"\n    scaleToFit\n  >\n    {text}\n  </Text>\n);\n}"}</Codeblock>
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
                <Codeblock>{"import { Text } from '@visx/text';\n\n({ text, width }) => {\nreturn (\n  <Text\n    x={50}\n    y={50}\n    dx={10}\n    dy={-10}\n    width={width}\n    verticalAnchor=\"start\"\n  >\n    {text}\n  </Text>\n);\n}"}</Codeblock>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{"\n        .text-demos {\n          display: grid;\n          grid-template-columns: repeat(2, 1fr);\n          grid-gap: 1rem;\n          padding: 1rem;\n          grid-auto-rows: minmax(10px, auto);\n        }\n        .text-demos h6 {\n          margin-bottom: 0.5rem;\n          margin-top: 0.5rem;\n        }\n        .text-demo {\n          display: flex;\n          flex-direction: row;\n          border: 1px solid #d3d3d3;\n          border-radius: 14px;\n          padding: 1rem;\n        }\n        .text-demo--left {\n          display: flex;\n          flex-direction: column;\n          flex: 1;\n        }\n        .text-demo--left h6 {\n          margin-top: 0;\n        }\n        .text-demo--form {\n          font-size: 12px;\n        }\n        .text-demo--form input {\n          margin-left: 0.5rem;\n        }\n        .text-demo--container {\n          width: 800px;\n        }\n      "}</style>
    </div>);
}
var packageJson = { dependencies: { '@visx/text': 'latest' } };
function TextPage() {
    return (<Show component={TextDemo} title="Text" margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 10,
    }} packageJson={packageJson}/>);
}
export default TextPage;
