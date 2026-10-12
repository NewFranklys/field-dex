import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import ProductShell from "./components/ProductShell";
import Home from "./pages/Home";
import PokemonPage from "./pages/PokemonPage";
import Pokedex from "./pages/Pokedex";
import Types from "./pages/Types";
import "./App.css";

function documentTitle(pathname) {
  if (pathname.startsWith("/pokemon/")) return "Field Record | FIELD DEX";
  if (pathname === "/types") return "Type Analysis | FIELD DEX";
  if (pathname === "/pokedex") return "Kanto Species Archive | FIELD DEX";
  if (pathname === "/") return "FIELD DEX | Pokémon Companion Platform";
  return "Page Not Found | FIELD DEX";
}

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = documentTitle(pathname);
    document.getElementById("main-content")?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [pathname]);

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
                <h1>Page not found</h1>
                <p>
                  This route is not available in the current FIELD DEX
                  experience.
                </p>
                <Link to="/pokedex">Open the current species archive →</Link>
              </main>
            }
          />
        </Routes>
      </ProductShell>
    </MotionConfig>
  );
}
