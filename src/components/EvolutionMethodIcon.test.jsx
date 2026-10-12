import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EvolutionMethodIcon from "./EvolutionMethodIcon";

describe("EvolutionMethodIcon", () => {
  it("preserves the specific evolution item identity for rendering", () => {
    const { container } = render(
      <EvolutionMethodIcon
        method="Moon Stone"
        details={[{ trigger: "use-item", item: "moon-stone" }]}
      />,
    );

    const root = container.querySelector(".evolution-method-icon");
    expect(root?.dataset.methodKind).toBe("item");
    expect(root?.dataset.itemSlug).toBe("moon-stone");
    expect(container.querySelector(".evolution-method-item")).not.toBeNull();
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
