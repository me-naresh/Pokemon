import { Routes, Route } from "react-router-dom";

import PokemonDetails from "../components/PokemonDetails/PokemonDetails.jsx";
import Pokedex from "../components/pokedex/Pokedex.jsx";
function CustomeRoute() {
  return (
    <Routes>
      <Route path="/" element={<Pokedex />} />
      <Route path="pokemon/:id" element={<PokemonDetails />} />
    </Routes>
  );
}
export default CustomeRoute;
