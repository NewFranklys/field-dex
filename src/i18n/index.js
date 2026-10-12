import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import ptBR from "./locales/pt-BR";

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

void i18n.use(initReactI18next).init({
  resources: {
    en,
    "pt-BR": ptBR,
  },
  lng: storedLocale(),
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: SUPPORTED_LOCALES,
  defaultNS: "common",
  ns: ["common", "home", "pokedex", "typesPage", "record"],
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
