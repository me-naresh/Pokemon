import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/pokemon";

function PokemonList() {
  const [pokemonList, setpokemonList] = useState([]);
  const [isloading, setisloading] = useState(true);

  const [pokedexUrl, setpokedexUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  async function downloadPokemons() {
    setisloading(true);
    // this download the lost of the 20 pokemons
    const response = await axios.get(pokedexUrl);
    console.log(response);
    //we get the array of pokemons from the results
    const pokemonResults = response.data.results;

    //console.log(response);
    //console.log(response.data);
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);

    //iterating over the array of the pokemon and using their url to create an array of the promise
    //that will download those 20 pokemons
    const pokemonResultsPromise = pokemonResults.map((pokemon) => {
      const po = axios.get(pokemon.url);
      console.log(po);
      return po;
    });
    console.log(pokemonResultsPromise);

    // passing that promise aray to axious.all
    const pokemonData = await axios.all(pokemonResultsPromise); // arary of 20 pokemon detailed
    //console.log(pokemonData);

    // now iterae the data of each pokemon ,and extract id, name , image , types
    const res = pokemonData.map((pokeData) => {
      //console.log(pokeData);
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
    // console.log(res);
    setpokemonList(res);
    setisloading(false);
  }
  useEffect(() => {
    downloadPokemons();
  }, [pokedexUrl]);

  return (
    <>
      <div className="pokemon-list-wrapper">
        <div className="list">list of pokemon</div>
        <div className="pokemon-wrapper">
          {isloading
            ? "loading.."
            : pokemonList.map((p) => (
                <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
              ))}
        </div>

        <div className="control">
          <button
            disabled={prevUrl == null}
            onClick={() => setpokedexUrl(prevUrl)}
          >
            prev
          </button>
          <button
            disabled={nextUrl == null}
            onClick={() => setpokedexUrl(nextUrl)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default PokemonList;
