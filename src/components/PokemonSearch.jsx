import { useTranslation } from "react-i18next";

function PokemonSearch({ searchTerm, onSearchTermChange, onSearch }) {
  const { t } = useTranslation("common");

  return (
    <form className="pokemon-search" onSubmit={onSearch}>
      <input
        value={searchTerm}
        onChange={(event) => {
          onSearchTermChange(event.target.value);
        }}
        placeholder={t("search.placeholder")}
        aria-label={t("search.pokemon")}
        autoComplete="off"
      />
      <button type="submit">{t("search.button")}</button>
    </form>
  );
}
export default PokemonSearch;
