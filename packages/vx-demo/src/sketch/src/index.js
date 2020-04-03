import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components/primitives';
import { render, Document, Artboard, Page, Text, RedBox } from 'react-sketchapp';
import {
  width as styledWidth,
  position,
  space,
  height as styledHeight,
  color,
} from 'styled-system';
import chroma from 'chroma-js';
import { Svg, Platform } from '@vx/primitives';

import Bars from './pages/Bars';

const Screen = styled(Artboard)`
  ${styledWidth}
  ${position}
  ${space}
  ${styledHeight}
  ${color}
`;

Screen.defaultProps = {
  width: 360,
  position: 'relative',
  ml: 0,
};

const DocumentContainer = ({ a }) => (
  <Document>
    <Page name="App">
      <Screen name="Bars" height={360} width={360} mb={80} bg="#000">
        <Bars width={360} height={360} />
      </Screen>
    </Page>
  </Document>
);

DocumentContainer.propTypes = {
  colors: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default () => {
  const data = context.document.documentData();
  const pages = context.document.pages();

  data.setCurrentPage(pages.firstObject());

  try {
    render(<DocumentContainer />);
  } catch (err) {
    render(<RedBox error={err} />);
  }
};
