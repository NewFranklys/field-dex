import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import Games from "./Games";

function openGames() {
  return render(
    <MemoryRouter>
      <Games />
    </MemoryRouter>,
  );
}

it("renders the visual archive with regional navigation and game logos", () => {
  openGames();

  expect(screen.getByRole("heading", { name: "Game Archives" })).toBeInTheDocument();
  expect(screen.getByRole("navigation", { name: "Quick region navigation" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /FireRed \/ LeafGreen/i })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Pokémon FireRed Version" })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Pokémon LeafGreen Version" })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Pokémon Legends: Arceus" })).toBeInTheDocument();
});

it("filters archives by search, generation and game type", async () => {
  const user = userEvent.setup();
  openGames();

  await user.type(screen.getByRole("searchbox", { name: "Search games" }), "Crystal");
  expect(screen.getByRole("link", { name: /Crystal/i })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /FireRed \/ LeafGreen/i })).not.toBeInTheDocument();

  await user.clear(screen.getByRole("searchbox", { name: "Search games" }));
  await user.click(screen.getByRole("button", { name: "VI", exact: true }));
  expect(screen.getByRole("link", { name: /X \/ Y/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Omega Ruby \/ Alpha Sapphire/i })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /Crystal/i })).not.toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "All", exact: true }).at?.(0) || screen.getAllByRole("button", { name: "All", exact: true })[0]);
  await user.click(screen.getByRole("button", { name: "Remake", exact: true }));
  expect(screen.getByRole("link", { name: /FireRed \/ LeafGreen/i })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /Crystal/i })).not.toBeInTheDocument();
});
