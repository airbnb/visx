import React from 'react';
import Document, { DocumentContext } from 'next/document';
declare class VisxDocument extends Document {
    static getInitialProps(ctx: DocumentContext): Promise<{
        html: string;
        head?: JSX.Element[];
        styles?: {} | React.ReactNodeArray | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>[];
    }>;
    render(): JSX.Element;
}
export default VisxDocument;
