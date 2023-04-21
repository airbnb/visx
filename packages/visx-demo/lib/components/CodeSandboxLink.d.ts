/// <reference types="react" />
declare type Props = {
    branch?: string;
    exampleDirectoryName: string;
};
declare function CodeSandboxLink({ branch, exampleDirectoryName }: Props): JSX.Element;
export default CodeSandboxLink;
