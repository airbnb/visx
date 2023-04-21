import { LinkHorizontal, LinkVertical, LinkRadial, LinkHorizontalStep, LinkVerticalStep, LinkRadialStep, LinkHorizontalCurve, LinkVerticalCurve, LinkRadialCurve, LinkHorizontalLine, LinkVerticalLine, LinkRadialLine, } from '@visx/shape';
export default function getLinkComponent(_a) {
    var layout = _a.layout, linkType = _a.linkType, orientation = _a.orientation;
    var LinkComponent;
    if (layout === 'polar') {
        if (linkType === 'step') {
            LinkComponent = LinkRadialStep;
        }
        else if (linkType === 'curve') {
            LinkComponent = LinkRadialCurve;
        }
        else if (linkType === 'line') {
            LinkComponent = LinkRadialLine;
        }
        else {
            LinkComponent = LinkRadial;
        }
    }
    else if (orientation === 'vertical') {
        if (linkType === 'step') {
            LinkComponent = LinkVerticalStep;
        }
        else if (linkType === 'curve') {
            LinkComponent = LinkVerticalCurve;
        }
        else if (linkType === 'line') {
            LinkComponent = LinkVerticalLine;
        }
        else {
            LinkComponent = LinkVertical;
        }
    }
    else if (linkType === 'step') {
        LinkComponent = LinkHorizontalStep;
    }
    else if (linkType === 'curve') {
        LinkComponent = LinkHorizontalCurve;
    }
    else if (linkType === 'line') {
        LinkComponent = LinkHorizontalLine;
    }
    else {
        LinkComponent = LinkHorizontal;
    }
    return LinkComponent;
}
