import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/pokemon";

function PokemonList() {
  const [pokemonList, setpokemonList] = useState([]);
  const [isloading, setisloading] = useState(true);

  async function downloadPokemons() {
    // this download the lost of the 20 pokemons
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");

    //we get the array of pokemons from the results
    const pokemonResults = response.data.results;
    console.log(response.data);

    //iterating over the array of the pokemon and using their url to create an array of the promise
    //that will download those 20 pokemons
    const pokemonResultsPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    // passing that promise aray to axious.all
    const pokemonData = await axios.all(pokemonResultsPromise); // arary of 20 pokemon detailed
    console.log(pokemonData);

    // now iterae the data of each pokemon ,and extract id, name , image , types
    const res = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.front_shiny,
        types: pokemon.types,
      };
    });
    console.log(res);
    setpokemonList(res);
    setisloading(false);
  }
  useEffect(() => {
    downloadPokemons();
  }, []);

  return (
    <>
      <div className="pokeman-list-wrapper">
        <div className="list">list of pokemon</div>
        <div className="pokemon-wrapper">
          {isloading
            ? "loading...."
            : pokemonList.map((p) => (
                <Pokemon name={p.name} image={p.image} key={p.id} />
              ))}
        </div>
        <div className="control">
          <button>prev</button>
          <button>next</button>
        </div>
      </div>
    </>
  );
}

export default PokemonList;
