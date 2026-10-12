import { expect, it, vi } from "vitest";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate, useLocation } from "react-router-dom";
import App from "./App";
import Artwork from "./components/Artwork";
import CryPlayer from "./components/CryPlayer";
import { mockApi, response, apiFixture } from "./test/fixtures";

function LocationProbe() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <output aria-label="Location">
        {location.pathname}
        {location.search}
      </output>
      <button onClick={() => navigate(-1)}>Browser back</button>
      <button onClick={() => navigate("/pokemon/25")}>
        Open Pikachu test route
      </button>
    </>
  );
}
function open(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
      <LocationProbe />
    </MemoryRouter>,
  );
}

it("searches Home by padded number, opens a record and returns to major sections", async () => {
  mockApi();
  const user = userEvent.setup();
  open();
  await user.type(
    screen.getByRole("textbox", { name: "Search Pokémon" }),
    "#025",
  );
  await user.click(screen.getByRole("button", { name: "Search →" }));
  expect(
    await screen.findByRole("heading", { name: "Pikachu", level: 1 }),
  ).toBeInTheDocument();
  expect(screen.getByLabelText("Location")).toHaveTextContent("/pokemon/25");
  await user.click(screen.getByRole("link", { name: "Types", exact: true }));
  expect(
    await screen.findByRole("heading", { name: "Type Analysis" }),
  ).toBeInTheDocument();
  await user.click(screen.getByRole("link", { name: "Home", exact: true }));
  expect(
    screen.getByRole("heading", { name: "FIELD DEX" }),
  ).toBeInTheDocument();
});
it("combines search and filters, recovers from empty results and preserves archive context", async () => {
  mockApi();
  const user = userEvent.setup();
  open("/pokedex");
  await screen.findByRole("button", { name: /Entry.*Pikachu/ });
  await user.type(screen.getByLabelText("Search Species"), "#025");
  await user.click(screen.getByRole("button", { name: "Fire", exact: true }));
  expect(await screen.findByText("No matching records")).toBeInTheDocument();
  await user.click(
    screen.getByRole("button", { name: "Electric", exact: true }),
  );
  expect(
    screen.getByRole("button", { name: "Electric", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await user.click(
    await screen.findByRole("button", { name: /Entry.*Pikachu/ }),
  );
  await screen.findByRole("heading", { name: "Pikachu" });
  await user.click(
    screen.getByRole("link", { name: /Back to species archive/ }),
  );
  expect(screen.getByLabelText("Search Species")).toHaveValue("#025");
  expect(
    screen.getByRole("button", { name: "Electric", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await user.clear(screen.getByLabelText("Search Species"));
  await user.type(screen.getByLabelText("Search Species"), "missing");
  await user.click(
    await screen.findByRole("button", { name: "Clear search and filters" }),
  );
  expect(
    await screen.findByRole("button", { name: /Entry.*Bulbasaur/ }),
  ).toBeInTheDocument();
});
it("restores type URL selection with browser back and links Types to filtered archive", async () => {
  mockApi();
  const user = userEvent.setup();
  open("/types?type=water");
  await screen.findByRole("heading", { name: "Water", exact: true });
  await user.click(screen.getByRole("button", { name: /02\s*Fire/ }));
  await user.click(screen.getByRole("button", { name: "Browser back" }));
  expect(screen.getByRole("button", { name: /03\s*Water/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await user.click(
    await screen.findByRole("button", { name: /View Water species/ }),
  );
  expect(
    await screen.findByRole("button", { name: /Entry.*Vaporeon/ }),
  ).toBeInTheDocument();
  expect(screen.getByLabelText("Location")).toHaveTextContent(
    "/pokedex?type=water",
  );
});
it.each(["/pokedex", "/types", "/pokemon/25"])(
  "shows actionable network failure and retry on %s",
  async (path) => {
    let offline = true;
    mockApi(() => (offline ? response({}, 503) : undefined));
    const user = userEvent.setup();
    open(path);
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "temporarily unavailable",
    );
    offline = false;
    await user.click(screen.getByRole("button", { name: "Try again" }));
    await waitFor(() =>
      expect(screen.queryByRole("alert")).not.toBeInTheDocument(),
    );
    if (path === "/pokedex")
      await screen.findByRole("button", { name: /Entry.*Pikachu/ });
    else if (path === "/types")
      await screen.findByRole("button", { name: /View Fire species/ });
    else await screen.findByRole("heading", { name: "Pikachu" });
  },
);
it("retries a failed featured scan instead of leaving Home stuck loading", async () => {
  let offline = true;
  mockApi(() => (offline ? response({}, 503) : undefined));
  vi.spyOn(Math, "random").mockReturnValue(0);
  const user = userEvent.setup();
  open();
  await screen.findByRole("alert");
  offline = false;
  await user.click(screen.getByRole("button", { name: "Try again" }));
  expect(
    await screen.findByRole("img", { name: "Bulbasaur" }),
  ).toBeInTheDocument();
});
it.each(["/pokemon/missing", "/pokemon/152"])(
  "explains nonexistent or out-of-scope record %s",
  async (path) => {
    mockApi();
    open(path);
    await screen.findByRole("alert");
    expect(
      screen.queryByRole("button", { name: "Try again" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Back to species archive/ }),
    ).toHaveAttribute("href", "/pokedex");
  },
);
it("handles unknown routes with a recovery link", () => {
  open("/missing-page");
  expect(
    screen.getByRole("heading", { name: "Page not found" }),
  ).toBeInTheDocument();
});
it("shows partial records with recovery and the correct branching family", async () => {
  let fail = true;
  mockApi((url) =>
    fail && url.includes("/type/normal") ? response({}, 503) : undefined,
  );
  const user = userEvent.setup();
  open("/pokemon/133");
  await screen.findByRole("heading", { name: "Eevee" });
  expect(screen.getByText(/Type response unavailable/)).toBeInTheDocument();
  expect(screen.getAllByText("From Eevee →")).toHaveLength(3);
  expect(
    screen.queryByRole("button", { name: /Espeon/ }),
  ).not.toBeInTheDocument();
  fail = false;
  await user.click(screen.getByRole("button", { name: "Try again" }));
  await waitFor(() =>
    expect(
      screen.queryByText(/Type response unavailable/),
    ).not.toBeInTheDocument(),
  );
  await screen.findByRole("heading", { name: "Eevee" });
});
it("keeps adjacent navigation within 001–151 and resets search for the new record", async () => {
  mockApi();
  const user = userEvent.setup();
  open("/pokemon/1");
  await screen.findByRole("heading", { name: "Bulbasaur" });
  expect(
    screen.queryByRole("button", { name: /Previous Record/ }),
  ).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: /Next Record/ }));
  await screen.findByRole("heading", { name: "Ivysaur" });
  expect(screen.getByRole("textbox", { name: "Search Pokémon" })).toHaveValue(
    "2",
  );
  await user.clear(screen.getByRole("textbox", { name: "Search Pokémon" }));
  await user.type(
    screen.getByRole("textbox", { name: "Search Pokémon" }),
    "151{Enter}",
  );
  await screen.findByRole("heading", { name: "Mew", exact: true });
  expect(
    screen.queryByRole("button", { name: /Next Record/ }),
  ).not.toBeInTheDocument();
});
it("ignores a delayed record response after navigating to another Pokémon", async () => {
  let finish;
  mockApi((url) =>
    url.endsWith("/pokemon/133")
      ? new Promise((resolve) => {
          finish = () => resolve(apiFixture(url));
        })
      : undefined,
  );
  const user = userEvent.setup();
  open("/pokemon/133");
  expect(screen.getByText("Searching field database…")).toBeInTheDocument();
  await waitFor(() => expect(finish).toBeTypeOf("function"));
  await user.click(
    screen.getByRole("button", { name: "Open Pikachu test route" }),
  );
  await screen.findByRole("heading", { name: "Pikachu" });
  await act(async () => {
    finish();
  });
  expect(screen.getByRole("heading", { name: "Pikachu" })).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Eevee" }),
  ).not.toBeInTheDocument();
});
it("provides missing/broken artwork fallbacks and recovers when the source changes", () => {
  const view = render(<Artwork src="/missing.png" alt="Pikachu" />);
  fireEvent.error(screen.getByRole("img"));
  expect(screen.getByRole("img")).toHaveAccessibleName(
    "Pikachu: image unavailable",
  );
  view.rerender(<Artwork src="/good.png" alt="Eevee" />);
  expect(screen.getByRole("img")).toHaveAttribute("src", "/good.png");
});
it("handles absent and rejected cry playback and stops audio on unmount", async () => {
  const pause = vi
    .spyOn(HTMLMediaElement.prototype, "pause")
    .mockImplementation(() => {});
  const play = vi
    .spyOn(HTMLMediaElement.prototype, "play")
    .mockRejectedValueOnce(new Error("blocked"))
    .mockResolvedValue(undefined);
  const user = userEvent.setup();
  const view = render(<CryPlayer src="/cry.ogg" />);
  await user.click(screen.getByRole("button", { name: "Play cry" }));
  expect(await screen.findByRole("status")).toHaveTextContent(
    "playback unavailable",
  );
  await user.click(screen.getByRole("button", { name: "Play cry" }));
  expect(
    await screen.findByRole("button", { name: "Pause cry" }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(play).toHaveBeenCalledTimes(2);
  view.unmount();
  expect(pause).toHaveBeenCalled();
  render(<CryPlayer />);
  expect(screen.getByText("No recorded cry available.")).toBeInTheDocument();
});
