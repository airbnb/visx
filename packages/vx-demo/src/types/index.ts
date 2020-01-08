export interface MarginShape {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type ShowProvidedProps = {
  width: number;
  height: number;
  margin?: MarginShape;
  events?: boolean;
};
