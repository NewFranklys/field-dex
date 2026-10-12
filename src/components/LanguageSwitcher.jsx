import { useTranslation } from "react-i18next";
import { changeLocale } from "../i18n";

const OPTIONS = [
  { locale: "en", short: "EN", key: "language.en" },
  { locale: "pt-BR", short: "PT-BR", key: "language.ptBR" },
];

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation("common");
  const current = i18n.resolvedLanguage || i18n.language || "en";

  return (
    <div className="language-switcher" role="group" aria-label={t("language.label")}>
      {OPTIONS.map((option) => {
        const selected = current === option.locale;
        return (
          <button
            key={option.locale}
            type="button"
            aria-pressed={selected}
            aria-label={t(option.key)}
            title={t(option.key)}
            onClick={() => changeLocale(option.locale)}
          >
            {option.short}
          </button>
        );
      })}
    </div>
  );
}
