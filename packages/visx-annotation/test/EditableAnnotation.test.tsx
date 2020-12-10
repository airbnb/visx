import React, { ReactNode } from "react";
import { EditableAnnotation } from "../src";
import { EditableAnnotationProps } from "../lib/components/EditableAnnotation";
import { render, screen } from "@testing-library/react";

describe("<EditableAnnotation />", () => {
  function setup(
    props?: Partial<EditableAnnotationProps> & { children?: ReactNode }
  ) {
    return (
      <svg>
        <EditableAnnotation width={100} height={100} {...props}>
          {props?.children ?? <div />}
        </EditableAnnotation>
      </svg>
    );
  }

  it("should render two resize handles", () => {
    render(setup());
    expect(document.querySelectorAll("circle")).toHaveLength(2);
  });
  it("should render one resize handle if canEditLabel is false", () => {
    render(setup({ canEditLabel: false }));
    expect(document.querySelector("circle")).toBeVisible();
  });
  it("should render one resize handle if canEditSubject is false", () => {
    render(setup({ canEditSubject: false }));
    expect(document.querySelector("circle")).toBeVisible();
  });
  it("should render an Annotation", () => {
    render(setup({ children: "test" }));
    expect(screen.getByText(/test/i)).toBeVisible();
  });
});
