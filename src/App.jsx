import {
  Routes,
  Route,
} from 'react-router-dom'


import Home from './pages/Home'
import PokemonPage from './pages/PokemonPage'
import Pokedex from './pages/Pokedex'
import Types from './pages/Types'



function App() {

  return (
    <Routes>


      {/* Home */}
      <Route
        path="/"
        element={<Home />}
      />


      {/* Pokédex */}
      <Route
        path="/pokedex"
        element={<Pokedex />}
      />


      {/* Tipos */}
      <Route
        path="/types"
        element={<Types />}
      />


      {/* Pokémon individual */}
      <Route
        path="/pokemon/:pokemonQuery"
        element={<PokemonPage />}
      />


    </Routes>
  )
}


export default App