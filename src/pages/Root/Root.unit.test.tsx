import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Root } from "./Root";

describe("Root", () => {
  it("should display root", () => {
    render(<Root />);
    expect(screen.getByText("Root")).toBeInTheDocument();
  });
});
