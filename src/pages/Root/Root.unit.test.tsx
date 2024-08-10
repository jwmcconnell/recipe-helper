import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Root } from "./Root";

describe("Root", () => {
  it("should display Recipe Helper", () => {
    render(<Root />);
    expect(screen.getByText("Recipe Helper")).toBeInTheDocument();
  });
});
