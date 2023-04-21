/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { tiles as examples } from '../components/Gallery';
var getComponentName = function (Example) {
    return Example.packageJson.name || 'missing-name';
};
var snapshots = examples.map(function (Example) { return ({
    // note: this (reasonably) asserts Examples have unique names
    component: getComponentName(Example),
    variants: { default: function () { return <Example.default />; } },
}); });
export default snapshots;
