import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";
function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,

      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
    });
  }

  useEffect(() => {
    downloadPokemon();
  }, []);
  return (
    <div className="pokemon-details-wrapper">
      <img className="pokemon-image" src={pokemon.image} alt="" />
      <div className="pokemon-details-name">NAME : {pokemon.name}</div>

      <div className="height">
        Height : <span>{pokemon.height}</span>
      </div>
      <div className="weight">
        Weight : <span>{pokemon.weight}</span>
      </div>
      {/* <div className="pokemon-types">
        
        {pokemon && pokemon.types.map((t) => <div key={t}> {t} </div>)}
      </div> */}
      <div className="pokemon-details">
        {Array.isArray(pokemon.types) && pokemon.types.length > 0 ? (
          pokemon.types.map((type) => <div key={type}>{type}</div>)
        ) : (
          <div>No types available</div>
        )}
      </div>
    </div>
  );
}
export default PokemonDetails;
