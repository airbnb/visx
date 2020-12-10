import React, { useContext } from "react";
import { Annotation } from "../src";
import AnnotationContext from "../src/context/AnnotationContext";
import { render, screen } from "@testing-library/react";

describe("<Annotation /> RTL", () => {
  it("should provide AnnotationContext", () => {
    function AnnotationChild() {
      const { x, y, dx, dy } = useContext(AnnotationContext);
      return (
        <>
          <p data-testid="x">{x}</p>
          <p data-testid="y">{y}</p>
          <p data-testid="dx">{dx}</p>
          <p data-testid="dy">{dy}</p>
        </>
      );
    }

    const annotation = { x: -50, y: 100, dx: 1000, dy: 7 };

    render(
      <Annotation {...annotation}>
        <AnnotationChild />
      </Annotation>
    );

    expect(screen.getByTestId("x")).toHaveTextContent(`${annotation.x}`);
    expect(screen.getByTestId("y")).toHaveTextContent(`${annotation.y}`);
    expect(screen.getByTestId("dx")).toHaveTextContent(`${annotation.dx}`);
    expect(screen.getByTestId("dy")).toHaveTextContent(`${annotation.dy}`);
  });
});
