import React from 'react';
import { WidthAndHeight } from '../types';
declare type Props<ExampleProps extends WidthAndHeight> = {
    description?: string;
    detailsHeight?: number;
    detailsStyles?: React.CSSProperties;
    exampleRenderer: React.ComponentClass<ExampleProps> | React.FunctionComponent<ExampleProps>;
    exampleProps?: Omit<ExampleProps, 'width' | 'height'> & Partial<Pick<ExampleProps, 'width' | 'height'>>;
    exampleUrl?: string;
    tileStyles?: React.CSSProperties;
    title?: string;
};
export default function GalleryTile<ExampleProps extends WidthAndHeight>({ description, detailsHeight, detailsStyles, exampleProps, exampleRenderer, exampleUrl, tileStyles, title, }: Props<ExampleProps>): JSX.Element;
export {};
//# sourceMappingURL=GalleryTile.d.ts.map