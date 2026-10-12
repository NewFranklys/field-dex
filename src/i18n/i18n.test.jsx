import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { expect, it } from "vitest";
import App from "../App";
import ResourceState from "../components/ResourceState";
import i18n, { LOCALE_STORAGE_KEY, changeLocale } from "./index";
import { mockApi } from "../test/fixtures";

function LocationProbe() {
  const location = useLocation();
  return <output aria-label="Current route">{location.pathname}{location.search}</output>;
}

it("starts in English and synchronizes the document language", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  expect(document.documentElement.lang).toBe("en");
});

it("switches to Brazilian Portuguese without losing route context", async () => {
  mockApi();
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={["/pokedex?type=water"]}>
      <App />
      <LocationProbe />
    </MemoryRouter>,
  );

  await screen.findByRole("button", { name: /Entry.*Vaporeon/ });
  await user.click(
    screen.getByRole("button", { name: "Português (Brasil)" }),
  );

  expect(
    await screen.findByRole("heading", { name: "Arquivo de Espécies de Kanto" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Início" })).toBeInTheDocument();
  expect(screen.getByLabelText("Current route")).toHaveTextContent(
    "/pokedex?type=water",
  );
  expect(document.documentElement.lang).toBe("pt-BR");
  expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("pt-BR");
});

it("keeps the selected locale across a component remount", async () => {
  await changeLocale("pt-BR");
  const first = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByRole("link", { name: "Início" })).toBeInTheDocument();
  first.unmount();

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByRole("link", { name: "Início" })).toBeInTheDocument();
  expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("pt-BR");
});

it("falls back to English when a Portuguese resource is missing", async () => {
  i18n.addResource("en", "common", "fallbackProbe", "English fallback works");
  await changeLocale("pt-BR");
  expect(i18n.t("fallbackProbe", { ns: "common" })).toBe(
    "English fallback works",
  );
});

it("localizes shared loading and error states", async () => {
  const view = render(<ResourceState loading />);
  expect(screen.getByText("Searching field database…")).toBeInTheDocument();

  await changeLocale("pt-BR");
  expect(screen.getByText("Consultando o banco de pesquisa…")).toBeInTheDocument();

  view.rerender(
    <ResourceState
      error={{ code: "unavailable", message: "untranslated source message" }}
    />,
  );
  expect(
    screen.getByText("O banco de pesquisa está temporariamente indisponível."),
  ).toBeInTheDocument();
});
