import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorPage } from "./Error";

describe("ErrorPage", () => {
  it("should display error", () => {
    render(<ErrorPage />);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
