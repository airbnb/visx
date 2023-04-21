import { ComponentType } from 'react';
export default function getLinkComponent({ layout, linkType, orientation, }: {
    layout: string;
    linkType: string;
    orientation: string;
}): ComponentType<any>;
