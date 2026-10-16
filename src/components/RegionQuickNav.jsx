import { useTranslation } from "react-i18next";

export default function RegionQuickNav({ regions }) {
  const { t } = useTranslation("games");

  return (
    <nav className="region-quick-nav" aria-label={t("quickNavAria")}>
      <a href="#game-archive-top">{t("quickNavAll")}</a>
      {regions.map((region) => (
        <a key={region.slug} href={`#region-${region.slug}`}>
          {region.label}
        </a>
      ))}
    </nav>
  );
}
