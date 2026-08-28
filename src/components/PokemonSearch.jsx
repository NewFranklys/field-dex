/*
  Componente responsável
  pelo campo de pesquisa.
*/
function PokemonSearch({
  searchTerm,
  onSearchTermChange,
  onSearch,
}) {

  return (
    /*
      onSubmit acontece:

      - apertando Enter
      - clicando em Search
    */
    <form
      className="pokemon-search"
      onSubmit={onSearch}
    >

      <input

        /*
          O valor mostrado no input
          vem do estado React.
        */
        value={searchTerm}


        /*
          Toda vez que digitamos,
          atualizamos o estado.
        */
        onChange={(event) => {
          onSearchTermChange(event.target.value)
        }}


        placeholder="Search name or #"

        aria-label="Search Pokémon"

        autoComplete="off"
      />


      <button type="submit">
        Search
      </button>

    </form>
  )
}


export default PokemonSearch