import { Link, NavLink } from "react-router-dom";

export default function ProductShell({ children }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="product-shell">
        <div className="product-shell-inner">
          <Link
            className="product-shell-brand"
            to="/"
            aria-label="FIELD DEX home"
          >
            <strong>FIELD DEX</strong>
            <span>Pokémon companion platform</span>
          </Link>
          <nav className="section-nav" aria-label="Main navigation">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/pokedex">Pokédex</NavLink>
            <NavLink to="/types">Types</NavLink>
          </nav>
          <div className="product-shell-status" aria-label="Current public module">
            <span>Current module</span>
            <strong>Species Research</strong>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
