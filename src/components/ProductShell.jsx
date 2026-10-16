import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function ProductShell({ children }) {
  const { t } = useTranslation("common");
  const { pathname } = useLocation();
  const currentModule = pathname.startsWith("/games")
    ? t("currentModule.games")
    : t("currentModule.value");

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t("skipToContent")}
      </a>
      <header className="product-shell">
        <div className="product-shell-inner">
          <Link
            className="product-shell-brand"
            to="/"
            aria-label={t("brandHome")}
          >
            <strong>FIELD DEX</strong>
            <span>{t("brandTagline")}</span>
          </Link>
          <nav className="section-nav" aria-label={t("nav.aria")}>
            <NavLink to="/" end>
              {t("nav.home")}
            </NavLink>
            <NavLink to="/pokedex">{t("nav.pokedex")}</NavLink>
            <NavLink to="/types">{t("nav.types")}</NavLink>
            <NavLink to="/games">{t("nav.games")}</NavLink>
          </nav>
          <div className="product-shell-tools">
            <div
              className="product-shell-status"
              aria-label={t("currentModule.aria")}
            >
              <span>{t("currentModule.label")}</span>
              <strong>{currentModule}</strong>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
