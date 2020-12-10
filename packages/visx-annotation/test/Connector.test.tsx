import React from "react";
import { AnnotationContext, Connector } from "../src";
import { render } from "@testing-library/react";

describe("<Connector />", () => {
  const wrapper: React.FunctionComponent = ({ children }) => (
    <svg>{children}</svg>
  );
  it("should render a path", () => {
    render(<Connector />, { wrapper });

    expect(document.querySelector("path")).toBeVisible();
  });
  it("should have default attributes", () => {
    render(<Connector />, { wrapper });
    const path = document.querySelector("path");

    expect(path).toHaveAttribute("d", "M0,0L0,0L0,0");
    expect(path).toHaveAttribute("stroke", "#222");
  });
  it("should use the context for attributes", () => {
    const context = { x: -50, y: 100, dx: 1000, dy: 7 };
    render(
      <AnnotationContext.Provider value={context}>
        <Connector />
      </AnnotationContext.Provider>,
      { wrapper }
    );
    const path = document.querySelector("path");

    expect(path).toHaveAttribute("d", "M-50,100L-43,107L950,107");
    expect(path).toHaveAttribute("stroke", "#222");
  });
  it("should use props for attributes", () => {
    const context = { x: -50, y: 100, dx: 1000, dy: 7 };
    render(
      <AnnotationContext.Provider value={context}>
        <Connector {...{ x: 1, y: 2, dx: 3, dy: 4, stroke: '#123' }} />
      </AnnotationContext.Provider>,
      { wrapper }
    );
    const path = document.querySelector("path");

    expect(path).toHaveAttribute("d", "M1,2L4,5L4,6");
    expect(path).toHaveAttribute("stroke", "#123");
  });
  it("should not have the middle lineTo when type is line", () => {
    render(<Connector type="line" />, { wrapper });
    const path = document.querySelector("path");

    expect(path).toHaveAttribute("d", "M0,0L0,0");
  });
});
