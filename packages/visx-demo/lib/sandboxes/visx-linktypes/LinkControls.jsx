import React from 'react';
var controlStyles = { fontSize: 10 };
export default function LinkControls(_a) {
    var layout = _a.layout, orientation = _a.orientation, linkType = _a.linkType, stepPercent = _a.stepPercent, setLayout = _a.setLayout, setOrientation = _a.setOrientation, setLinkType = _a.setLinkType, setStepPercent = _a.setStepPercent;
    return (<div style={controlStyles}>
      <label>layout:</label>&nbsp;
      <select onClick={function (e) { return e.stopPropagation(); }} onChange={function (e) { return setLayout(e.target.value); }} value={layout}>
        <option value="cartesian">cartesian</option>
        <option value="polar">polar</option>
      </select>
      &nbsp;&nbsp;
      <label>orientation:</label>&nbsp;
      <select onClick={function (e) { return e.stopPropagation(); }} onChange={function (e) { return setOrientation(e.target.value); }} value={orientation} disabled={layout === 'polar'}>
        <option value="vertical">vertical</option>
        <option value="horizontal">horizontal</option>
      </select>
      &nbsp;&nbsp;
      <label>link:</label>&nbsp;
      <select onClick={function (e) { return e.stopPropagation(); }} onChange={function (e) { return setLinkType(e.target.value); }} value={linkType}>
        <option value="diagonal">diagonal</option>
        <option value="step">step</option>
        <option value="curve">curve</option>
        <option value="line">line</option>
      </select>
      {linkType === 'step' && layout !== 'polar' && (<>
          &nbsp;&nbsp;
          <label>step:</label>&nbsp;
          <input onClick={function (e) { return e.stopPropagation(); }} type="range" min={0} max={1} step={0.1} onChange={function (e) { return setStepPercent(Number(e.target.value)); }} value={stepPercent} disabled={linkType !== 'step' || layout === 'polar'}/>
        </>)}
    </div>);
}
