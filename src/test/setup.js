import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import i18n, { LOCALE_STORAGE_KEY } from "../i18n";
import { clearApiCache } from "../services/pokeapi";

afterEach(() => {
  cleanup();
  clearApiCache();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn((query) => ({
    matches: false,
    media: query,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
});
window.scrollTo = vi.fn();
window.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

beforeEach(async () => {
  window.localStorage.removeItem(LOCALE_STORAGE_KEY);
  await i18n.changeLanguage("en");
  document.documentElement.lang = "en";
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});
