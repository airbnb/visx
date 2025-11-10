import { useContext } from 'react';
import { Connector as BaseConnector } from '@visx/annotation';
import type { ConnectorProps as BaseConnectorProps } from '@visx/annotation';
import DataContext from '../../context/DataContext';

export type AnnotationConnectorProps = BaseConnectorProps;

/** AnnotationConnector which provides color from theme. */
export default function AnnotationConnector(props: AnnotationConnectorProps) {
  const { theme } = useContext(DataContext);
  return <BaseConnector stroke={theme?.axisStyles.x.bottom.axisLine.stroke} {...props} />;
}
