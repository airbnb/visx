import React from "react";
import { LineSubject } from "../src";
import { render } from "@testing-library/react";

describe("<LineSubject />", () => {
  const wrapper: React.FunctionComponent = ({ children }) => (
    <svg>{children}</svg>
  );
  it("should render a line", () => {
    render(<LineSubject min={0} max={100} />, { wrapper });
    expect(document.querySelector("line")).toBeVisible();
  });
});
