import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import PokemonPage from "./pages/PokemonPage";
import Pokedex from "./pages/Pokedex";
import Types from "./pages/Types";
import "./App.css";

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = `${pathname.startsWith("/pokemon/") ? "Field Record" : pathname === "/types" ? "Type Analysis" : pathname === "/pokedex" ? "Species Archive" : "Pokémon Research Archive"} | FIELD DEX`;
    document.getElementById("main-content")?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <nav className="section-nav" aria-label="Main navigation">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/pokedex">Pokédex</NavLink>
        <NavLink to="/types">Types</NavLink>
        <span>FIELD DEX / V1</span>
      </nav>
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
              <p>This address is not part of the FIELD DEX archive.</p>
              <Link to="/pokedex">Open species archive →</Link>
            </main>
          }
        />
      </Routes>
    </MotionConfig>
  );
}
