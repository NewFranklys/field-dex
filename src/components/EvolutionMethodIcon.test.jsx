import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EvolutionMethodIcon, { evolutionItemSprite } from "./EvolutionMethodIcon";

describe("EvolutionMethodIcon", () => {
  it("builds the canonical PokéAPI item sprite path", () => {
    expect(evolutionItemSprite("moon-stone")).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/moon-stone.png",
    );
  });

  it("renders the specific evolution item when metadata provides one", () => {
    const { container } = render(
      <EvolutionMethodIcon
        method="Moon Stone"
        details={[{ trigger: "use-item", item: "moon-stone" }]}
      />,
    );

    const root = container.querySelector(".evolution-method-icon");
    const image = container.querySelector(".evolution-method-item");
    expect(root?.dataset.methodKind).toBe("item");
    expect(image?.getAttribute("src")).toContain("/moon-stone.png");
  });

  it("uses a semantic glyph for non-item methods", () => {
    const { container } = render(
      <EvolutionMethodIcon
        method="Trade"
        details={[{ trigger: "trade" }]}
      />,
    );

    const root = container.querySelector(".evolution-method-icon");
    expect(root?.dataset.methodKind).toBe("trade");
    expect(container.querySelector("svg")).not.toBeNull();
    expect(container.querySelector("img")).toBeNull();
  });
});
