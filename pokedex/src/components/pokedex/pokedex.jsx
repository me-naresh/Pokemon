import PokemonList from "../pokemanList/PokemonList.jsx";
import Search from "../search/search.jsx";
import "./pokedex.css";
function Pokedex() {
  return (
    <div className="pokedx-wrapper">
      <h1 className="heading">pokedx</h1>
      <Search />
      <PokemonList />
    </div>
  );
}
export default Pokedex;
