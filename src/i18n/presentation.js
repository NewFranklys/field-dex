function localizePart(part, t, tp) {
  const level = part.match(/^Lv\. (\d+)$/);
  if (level) return tp("evolution.level", { level: level[1] });
  if (part === "Base form") return t("evolution.base");
  if (part === "Method not recorded") return t("evolution.missing");
  if (part === "Trade") return t("evolution.trade");
  if (part === "High friendship") return t("evolution.friendship");
  if (part === "Rain") return t("evolution.rain");
  if (part === "Female") return t("evolution.female");
  if (part === "Male") return t("evolution.male");
  if (part === "Day") return t("evolution.day");
  if (part === "Night") return t("evolution.night");
  if (part === "Attack < Defense") return tp("evolution.attackLessDefense");
  if (part === "Attack = Defense") return tp("evolution.attackEqualDefense");
  if (part === "Attack > Defense") return tp("evolution.attackGreaterDefense");

  const holding = part.match(/^holding (.+)$/);
  if (holding) return t("evolution.holding", { item: holding[1] });
  const affection = part.match(/^Affection (.+)$/);
  if (affection) return t("evolution.affection", { value: affection[1] });
  const beauty = part.match(/^Beauty (.+)$/);
  if (beauty) return t("evolution.beauty", { value: beauty[1] });
  const at = part.match(/^at (.+)$/);
  if (at) return t("evolution.at", { location: at[1] });
  const knowingType = part.match(/^knowing a (.+) move$/);
  if (knowingType) return t("evolution.knowingType", { type: knowingType[1] });
  const knowing = part.match(/^knowing (.+)$/);
  if (knowing) return t("evolution.knowing", { move: knowing[1] });

  return part;
}

export function localizeEvolutionMethod(method, t, tp) {
  return String(method || "Method not recorded")
    .split(" / ")
    .map((alternative) =>
      alternative
        .split(" · ")
        .map((part) => localizePart(part, t, tp))
        .join(" · "),
    )
    .join(" / ");
}
