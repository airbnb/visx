import Cross from './Cross';
import type { MarkerComponentProps } from './Marker';

export default function MarkerX(props: MarkerComponentProps) {
  return <Cross orient={45} {...props} />;
}
