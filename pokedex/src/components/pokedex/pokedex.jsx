import PokemonList from "../pokemanList/PokemonList.jsx";
import Search from "../search/search.jsx";
import "./pokedex.css";
function Pokedex() {
  return (
    <div className="pokedx-wrapper">
      <Search />
      <PokemonList />
    </div>
  );
}
export default Pokedex;
