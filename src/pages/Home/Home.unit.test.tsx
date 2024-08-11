import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Home } from "./Home";
import { BrowserRouter } from "react-router-dom";

describe("Home", () => {
  it("should display home", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(
      screen.getByRole("link", { name: "Add Recipe" })
    ).toBeInTheDocument();
  });
});
