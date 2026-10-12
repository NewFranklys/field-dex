import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import ProductShell from "./ProductShell";

it("frames FIELD DEX as the platform rather than the Kanto archive", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <ProductShell>
        <main>Current page</main>
      </ProductShell>
    </MemoryRouter>,
  );

  expect(
    screen.getByRole("link", { name: "FIELD DEX home" }),
  ).toHaveAttribute("href", "/");
  expect(screen.getByText("Pokémon companion platform")).toBeInTheDocument();
  expect(screen.getByLabelText("Current public module")).toHaveTextContent(
    "Species Research",
  );
  expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Pokédex" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Types" })).toBeInTheDocument();

  expect(screen.queryByText(/Kanto/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/001—151/)).not.toBeInTheDocument();
});
