import React from "react";
import Show from "../components/Show";
import Hybrid from "../sandboxes/visx-hybrid/Example";
import HybridSource from "!!raw-loader!../sandboxes/visx-brush/Example";
// import packageJson from "../sandboxes/visx-hybrid/package.json";

const BrushPage = () => (
  <Show
    component={Hybrid}
    title="Hybrid"
    margin={{
      top: 40,
      left: 50,
      right: 20,
      bottom: 10,
    }}
    codeSandboxDirectoryName="visx-hybrid"
    // packageJson={packageJson}
  >
    {HybridSource}
  </Show>
);
export default BrushPage;
