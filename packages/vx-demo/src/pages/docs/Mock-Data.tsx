import React from 'react';
import MockDataReadme from '!!raw-loader!../../../../vx-mock-data/Readme.md';
import DocPage from '../../components/DocPage';

export default () => <DocPage readme={MockDataReadme} vxPackage="mock-data" />;
