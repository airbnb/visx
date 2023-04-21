import React, { useState } from 'react';
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';
import { totoAfricaLyrics } from './text.fixture';
var colors = ['#143059', '#2F6B9A', '#82a6c2'];
function wordFreq(text) {
    var words = text.replace(/\./g, '').split(/\s/);
    var freqMap = {};
    for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
        var w = words_1[_i];
        if (!freqMap[w])
            freqMap[w] = 0;
        freqMap[w] += 1;
    }
    return Object.keys(freqMap).map(function (word) { return ({ text: word, value: freqMap[word] }); });
}
function getRotationDegree() {
    var rand = Math.random();
    var degree = rand > 0.5 ? 60 : -60;
    return rand * degree;
}
var words = wordFreq(totoAfricaLyrics);
var fontScale = scaleLog({
    domain: [Math.min.apply(Math, words.map(function (w) { return w.value; })), Math.max.apply(Math, words.map(function (w) { return w.value; }))],
    range: [10, 100],
});
var fontSizeSetter = function (datum) { return fontScale(datum.value); };
var fixedValueGenerator = function () { return 0.5; };
export default function Example(_a) {
    var width = _a.width, height = _a.height, showControls = _a.showControls;
    var _b = useState('archimedean'), spiralType = _b[0], setSpiralType = _b[1];
    var _c = useState(false), withRotation = _c[0], setWithRotation = _c[1];
    return (<div className="wordcloud">
      <Wordcloud words={words} width={width} height={height} fontSize={fontSizeSetter} font={'Impact'} padding={2} spiral={spiralType} rotate={withRotation ? getRotationDegree : 0} random={fixedValueGenerator}>
        {function (cloudWords) {
        return cloudWords.map(function (w, i) { return (<Text key={w.text} fill={colors[i % colors.length]} textAnchor={'middle'} transform={"translate(" + w.x + ", " + w.y + ") rotate(" + w.rotate + ")"} fontSize={w.size} fontFamily={w.font}>
              {w.text}
            </Text>); });
    }}
      </Wordcloud>
      {showControls && (<div>
          <label>
            Spiral type &nbsp;
            <select onChange={function (e) { return setSpiralType(e.target.value); }} value={spiralType}>
              <option key={'archimedean'} value={'archimedean'}>
                archimedean
              </option>
              <option key={'rectangular'} value={'rectangular'}>
                rectangular
              </option>
            </select>
          </label>
          <label>
            With rotation &nbsp;
            <input type="checkbox" checked={withRotation} onChange={function () { return setWithRotation(!withRotation); }}/>
          </label>
          <br />
        </div>)}
      <style jsx>{"\n        .wordcloud {\n          display: flex;\n          flex-direction: column;\n          user-select: none;\n        }\n        .wordcloud svg {\n          margin: 1rem 0;\n          cursor: pointer;\n        }\n\n        .wordcloud label {\n          display: inline-flex;\n          align-items: center;\n          font-size: 14px;\n          margin-right: 8px;\n        }\n        .wordcloud textarea {\n          min-height: 100px;\n        }\n      "}</style>
    </div>);
}
