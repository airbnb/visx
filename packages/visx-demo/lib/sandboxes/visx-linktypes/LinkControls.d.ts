/// <reference types="react" />
declare type Props = {
    layout: string;
    orientation: string;
    linkType: string;
    stepPercent: number;
    setLayout: (layout: string) => void;
    setOrientation: (orientation: string) => void;
    setLinkType: (linkType: string) => void;
    setStepPercent: (percent: number) => void;
};
export default function LinkControls({ layout, orientation, linkType, stepPercent, setLayout, setOrientation, setLinkType, setStepPercent, }: Props): JSX.Element;
export {};
//# sourceMappingURL=LinkControls.d.ts.map