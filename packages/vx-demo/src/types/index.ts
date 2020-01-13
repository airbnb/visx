export interface MarginShape {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface WidthAndHeight {
  width: number;
  height: number;
}

export type ShowProvidedProps = {
  width: number;
  height: number;
  margin?: MarginShape;
  events?: boolean;
};
