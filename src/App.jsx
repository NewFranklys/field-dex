import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductShell from "./components/ProductShell";
import Home from "./pages/Home";
import PokemonPage from "./pages/PokemonPage";
import Pokedex from "./pages/Pokedex";
import Types from "./pages/Types";
import "./App.css";

function titleKey(pathname) {
  if (pathname.startsWith("/pokemon/")) return "titles.record";
  if (pathname === "/types") return "titles.types";
  if (pathname === "/pokedex") return "titles.pokedex";
  if (pathname === "/") return "titles.home";
  return "titles.notFound";
}

export default function App() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    document.title = t(titleKey(pathname));
    document.getElementById("main-content")?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [pathname, t, i18n.resolvedLanguage]);

  return (
    <MotionConfig reducedMotion="user">
      <ProductShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/types" element={<Types />} />
          <Route path="/pokemon/:pokemonQuery" element={<PokemonPage />} />
          <Route
            path="*"
            element={
              <main id="main-content" tabIndex={-1} className="resource-state">
                <h1>{t("pageNotFound.title")}</h1>
                <p>{t("pageNotFound.body")}</p>
                <Link to="/pokedex">{t("pageNotFound.action")}</Link>
              </main>
            }
          />
        </Routes>
      </ProductShell>
    </MotionConfig>
  );
}
