import { useEffect, useState } from "react";

export const evolutionItemSprite = (itemSlug = "") =>
  itemSlug
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${itemSlug}.png`
    : null;

function methodKind(details = [], method = "") {
  const entries = Array.isArray(details) ? details : [];
  const primary = entries.find((entry) => entry?.item || entry?.heldItem) || entries[0] || {};
  const text = String(method).toLowerCase();

  if (primary.item || primary.heldItem) return "item";
  if (primary.trigger === "base" || /base form|forma base/.test(text)) return "base";
  if (primary.trigger === "trade" || /trade|troca/.test(text)) return "trade";
  if (primary.minLevel != null || /lv\.|level|nv\./.test(text)) return "level";
  if (
    primary.minHappiness != null ||
    primary.minAffection != null ||
    /friend|amizade|affection|afeição/.test(text)
  )
    return "friendship";
  if (primary.timeOfDay === "night" || /night|noite/.test(text)) return "night";
  if (primary.timeOfDay || /day|dia/.test(text)) return "day";
  if (primary.knownMove || primary.knownMoveType || /knowing|conhecendo/.test(text))
    return "move";
  if (primary.location || /^at |^em /.test(text)) return "location";
  if (primary.gender != null || /female|male|fêmea|macho/.test(text)) return "gender";
  if (primary.rain || /rain|chuva/.test(text)) return "rain";
  if (primary.relativePhysicalStats != null || /attack|defense|ataque|defesa/.test(text))
    return "stats";
  return "special";
}

function MethodGlyph({ kind }) {
  switch (kind) {
    case "level":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4 7.5 9h3v7h3V9h3L12 4Z" fill="currentColor" />
          <path d="M6 19h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "trade":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 8h11.5l-2.2-2.2L15.7 4.4 20.6 9l-4.9 4.6-1.4-1.4 2.2-2.2H5V8Zm14 8H7.5l2.2 2.2-1.4 1.4L3.4 15l4.9-4.6 1.4 1.4L7.5 14H19v2Z" fill="currentColor" />
        </svg>
      );
    case "friendship":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 19s-7-4.3-7-9.1C5 7.2 6.8 5.5 9.2 5.5c1.4 0 2.3.7 2.8 1.5.5-.8 1.4-1.5 2.8-1.5 2.4 0 4.2 1.7 4.2 4.4C19 14.7 12 19 12 19Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "day":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3.6" fill="currentColor" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "night":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M16.8 17.4A7.2 7.2 0 0 1 9.1 6.2a7.4 7.4 0 1 0 7.7 11.2Z" fill="currentColor" />
        </svg>
      );
    case "move":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" fill="currentColor" />
          <circle cx="18.2" cy="17.8" r="1.8" fill="currentColor" opacity=".55" />
        </svg>
      );
    case "location":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s6-5.8 6-11a6 6 0 1 0-12 0c0 5.2 6 11 6 11Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="12" cy="10" r="2" fill="currentColor" />
        </svg>
      );
    case "gender":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10" cy="10" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M13 7 18 4m0 0h-3m3 0v3M10 14v6m-2-2h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "rain":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 13.5h11a3.5 3.5 0 0 0 .2-7 5.4 5.4 0 0 0-10-1.2A4.2 4.2 0 0 0 6 13.5Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="m8 16-1 3m5-3-1 3m5-3-1 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "stats":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4v15M7 7h10M5 19h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="m7 7-3 5h6L7 7Zm10 0-3 5h6l-3-5Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );
    case "base":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 5 7 7-7 7-7-7 7-7Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}

export default function EvolutionMethodIcon({ method = "", details = [] }) {
  const itemSlug =
    details.find((entry) => entry?.item)?.item ||
    details.find((entry) => entry?.heldItem)?.heldItem ||
    null;
  const [itemFailed, setItemFailed] = useState(false);
  const kind = methodKind(details, method);

  useEffect(() => setItemFailed(false), [itemSlug]);

  return (
    <span
      className={`evolution-method-icon evolution-method-${kind}${itemSlug && !itemFailed ? " has-item" : ""}`}
      data-method-kind={kind}
      aria-hidden="true"
    >
      {itemSlug && !itemFailed ? (
        <img
          className="evolution-method-item"
          src={evolutionItemSprite(itemSlug)}
          alt=""
          loading="lazy"
          onError={() => setItemFailed(true)}
        />
      ) : (
        <MethodGlyph kind={kind} />
      )}
    </span>
  );
}
