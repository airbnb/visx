import React from "react";
import ResizeObserver from "resize-observer-polyfill";
import { Label } from "../src";
import { render, screen } from "@testing-library/react";

describe("<Label />", () => {
  const wrapper: React.FunctionComponent = ({ children }) => (
    <svg>{children}</svg>
  );
  it("should render title Text", () => {
    render(
      <Label title="title test" resizeObserverPolyfill={ResizeObserver} />,
      { wrapper }
    );
    expect(screen.getByText("title test")).toBeVisible();
  });
  it("should render subtitle Text", () => {
    render(
      <Label
        subtitle="subtitle test"
        resizeObserverPolyfill={ResizeObserver}
      />,
      { wrapper }
    );
    expect(screen.getByText("subtitle test")).toBeVisible();
  });
  it("should render a background", () => {
    render(
      <Label
        title="test"
        showBackground
        resizeObserverPolyfill={ResizeObserver}
      />,
      { wrapper }
    );
    expect(document.querySelector("rect")).toBeVisible();
  });
  it("should render an anchor line", () => {
    render(
      <Label
        title="test"
        showAnchorLine
        resizeObserverPolyfill={ResizeObserver}
      />,
      { wrapper }
    );
    expect(document.querySelector("line")).toBeVisible();
  });
});
