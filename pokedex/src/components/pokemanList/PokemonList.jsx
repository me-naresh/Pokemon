import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/pokemon";

function PokemonList() {
  // const [pokemonList, setpokemonList] = useState([]);
  // const [isloading, setisloading] = useState(true);

  // const [pokedexUrl, setpokedexUrl] = useState(
  //   "https://pokeapi.co/api/v2/pokemon"
  // );
  // const [nextUrl, setNextUrl] = useState("");
  // const [prevUrl, setPrevUrl] = useState("");

  const [pokemonListState, setpokemonListState] = useState({
    pokemonList: [],
    isloading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemons(state) {
    //setisloading(true);

    setpokemonListState({ ...state, isloading: true });
    // this download the lost of the 20 pokemons
    const response = await axios.get(pokemonListState.pokedexUrl);
    //console.log(response);
    //we get the array of pokemons from the results
    const pokemonResults = response.data.results;

    console.log(response);
    //console.log(pokemonResults);

    // setNextUrl(response.data.next);
    // setPrevUrl(response.data.previous);
    //console.log("this is", setpokemonListState);
    setpokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));

    //console.log(nextUrl);
    // console.log("url 2 ==", prevUrl);

    //iterating over the array of the pokemon and using their url to create an array of the promise
    //that will download those 20 pokemons
    const pokemonResultsPromise = pokemonResults.map((pokemon) => {
      const po = axios.get(pokemon.url);
      //console.log(po);
      return po;
    });
    //console.log(pokemonResultsPromise);

    // passing that promise aray to axious.all
    const pokemonData = await axios.all(pokemonResultsPromise); // arary of 20 pokemon detailed
    //console.log(pokemonData);

    // now iterae the data of each pokemon ,and extract id, name , image , types
    const res = pokemonData.map((pokeData) => {
      console.log(pokeData);
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
    // setpokemonList(res);
    // setisloading(false);

    setpokemonListState((state) => ({
      ...state,
      pokemonList: res,
      isloading: false,
    }));
  }
  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  return (
    <>
      <div className="pokemon-list-wrapper">
        <div className="list">list of pokemon</div>
        <div className="pokemon-wrapper">
          {pokemonListState.isloading
            ? "loading.."
            : pokemonListState.pokemonList.map((p) => (
                <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
              ))}
        </div>

        <div className="control">
          <button
            disabled={pokemonListState.prevUrl == null}
            onClick={() =>
              setpokemonListState({
                ...pokemonListState,
                pokedexUrl: pokemonListState.prevUrl,
              })
            }
          >
            prev
          </button>
          <button
            disabled={pokemonListState.nextUrl == null}
            onClick={() =>
              setpokemonListState({
                ...pokemonListState,
                pokedexUrl: pokemonListState.nextUrl,
              })
            }
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default PokemonList;
