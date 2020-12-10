import React from "react";
import { AnnotationContext, CircleSubject } from "../src";
import { render } from "@testing-library/react";

describe("<CircleSubject />", () => {
  const wrapper: React.FunctionComponent = ({ children }) => (
    <svg>{children}</svg>
  );
  it("should render a cirlce", () => {
    render(<CircleSubject />, { wrapper });

    expect(document.querySelector("circle")).toBeVisible();
  });
  it("should have default attributes", () => {
    const context = { x: -50, y: 100, dx: 1000, dy: 7 };
    render(
      <AnnotationContext.Provider value={context}>
        <CircleSubject />
      </AnnotationContext.Provider>,
      { wrapper }
    );

    const circle = document.querySelector("circle");
    expect(circle).toHaveAttribute("cx", `${context.x}`);
    expect(circle).toHaveAttribute("cy", `${context.y}`);
    expect(circle).toHaveAttribute("r", "16");
    expect(circle).toHaveAttribute("stroke", "#222");
  });
  it("should override default attributes with props", () => {
    const context = { x: -50, y: 100, dx: 1000, dy: 7 };
    const props = { x: 1, y: 2, stroke: "#123", radius: 3 };
    render(
      <AnnotationContext.Provider value={context}>
        <CircleSubject {...props} />
      </AnnotationContext.Provider>,
      { wrapper }
    );

    const circle = document.querySelector("circle");
    expect(circle).toHaveAttribute("cx", `${props.x}`);
    expect(circle).toHaveAttribute("cy", `${props.y}`);
    expect(circle).toHaveAttribute("r", `${props.radius}`);
    expect(circle).toHaveAttribute("stroke", `${props.stroke}`);
  });
});
