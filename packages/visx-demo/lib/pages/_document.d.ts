import React from 'react';
import Document, { DocumentContext } from 'next/document';
declare class VisxDocument extends Document {
    static getInitialProps(ctx: DocumentContext): Promise<{
        html: string;
        head?: (JSX.Element | null)[] | undefined;
        styles?: {} | React.ReactNodeArray | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>[] | undefined;
    }>;
    render(): JSX.Element;
}
export default VisxDocument;
//# sourceMappingURL=_document.d.ts.map