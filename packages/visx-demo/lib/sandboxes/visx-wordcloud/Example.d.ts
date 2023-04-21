/// <reference types="react" />
interface ExampleProps {
    width: number;
    height: number;
    showControls?: boolean;
}
export interface WordData {
    text: string;
    value: number;
}
export default function Example({ width, height, showControls }: ExampleProps): JSX.Element;
export {};
