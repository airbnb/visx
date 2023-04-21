import { useState } from 'react';
export default function useForceUpdate() {
    var _a = useState(0), setValue = _a[1];
    return function () { return setValue(function (value) { return value + 1; }); }; // update state to force render
}
