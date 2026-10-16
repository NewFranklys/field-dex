import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import ptBR from "./locales/pt-BR";
import gamesEn from "./locales/games.en";
import gamesPtBR from "./locales/games.pt-BR";
import presentationEn from "./locales/presentation.en";
import presentationPtBR from "./locales/presentation.pt-BR";

export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = ["en", "pt-BR"];
export const LOCALE_STORAGE_KEY = "field-dex.locale";

function storedLocale() {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const value = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return SUPPORTED_LOCALES.includes(value) ? value : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

function syncDocumentLanguage(locale) {
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale;
  }
}

function withGameResearch(base, feature, presentation) {
  return {
    ...base,
    common: {
      ...base.common,
      ...feature.common,
      nav: { ...base.common.nav, ...feature.common.nav },
      currentModule: {
        ...base.common.currentModule,
        ...feature.common.currentModule,
      },
      titles: { ...base.common.titles, ...feature.common.titles },
    },
    record: {
      ...base.record,
      ...feature.record,
    },
    games: feature.games,
    presentation,
  };
}

void i18n.use(initReactI18next).init({
  resources: {
    en: withGameResearch(en, gamesEn, presentationEn),
    "pt-BR": withGameResearch(ptBR, gamesPtBR, presentationPtBR),
  },
  lng: storedLocale(),
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: SUPPORTED_LOCALES,
  defaultNS: "common",
  ns: [
    "common",
    "home",
    "pokedex",
    "typesPage",
    "record",
    "games",
    "presentation",
  ],
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

syncDocumentLanguage(i18n.resolvedLanguage || i18n.language || DEFAULT_LOCALE);

i18n.on("languageChanged", (locale) => {
  syncDocumentLanguage(locale);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Browsers can deny storage; locale switching should still work in-session.
    }
  }
});

export function changeLocale(locale) {
  if (!SUPPORTED_LOCALES.includes(locale)) return Promise.resolve(false);
  return i18n.changeLanguage(locale);
}

export default i18n;
