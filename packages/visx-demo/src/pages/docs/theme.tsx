import React from 'react';
import ThemeReadme from '!!raw-loader!../../../../visx-theme/Readme.md';
import DocPage from '../../components/DocPage';

function ThemeDocs() {
  return <DocPage readme={ThemeReadme} visxPackage="theme" />;
}

export default ThemeDocs;
