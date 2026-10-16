import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { expect, it } from "vitest";
import GamePage from "./GamePage";
import { mockApi } from "../test/fixtures";

function open(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/games/:gameSlug" element={<GamePage />} />
      </Routes>
    </MemoryRouter>,
  );
}

it("shows Crystal encounter and level-up data for Chikorita", async () => {
  mockApi();
  open("/games/crystal?pokemon=152&version=crystal");

  expect(
    await screen.findByRole("heading", { name: "Pokémon Crystal", level: 1 }),
  ).toBeInTheDocument();
  expect(
    await screen.findByRole("heading", { name: "Chikorita", level: 2 }),
  ).toBeInTheDocument();
  expect(screen.getByText("Route 29")).toBeInTheDocument();
  expect(screen.getByText("Lv. 2–3")).toBeInTheDocument();
  expect(screen.getByText("Razor Leaf")).toBeInTheDocument();
  expect(screen.getByText("Lv. 8")).toBeInTheDocument();
});

it("switches individual versions without leaving the game context", async () => {
  mockApi();
  const user = userEvent.setup();
  open("/games/gold-silver?pokemon=152&version=gold");

  expect(await screen.findByText("Chikorita")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Gold" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await user.click(screen.getByRole("button", { name: "Silver" }));
  expect(screen.getByRole("button", { name: "Silver" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});
