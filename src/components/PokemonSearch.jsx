function PokemonSearch({ searchTerm, onSearchTermChange, onSearch }) {
  return (
    <form className="pokemon-search" onSubmit={onSearch}>
      <input
        value={searchTerm}
        onChange={(event) => {
          onSearchTermChange(event.target.value);
        }}
        placeholder="Search name or #"
        aria-label="Search Pokémon"
        autoComplete="off"
      />
      <button type="submit">Search</button>
    </form>
  );
}
export default PokemonSearch;
