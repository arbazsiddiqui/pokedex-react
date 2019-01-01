import { RECEIVE_POKEMON_LIST, RECEIVE_POKEMON_DETAILS, POKEMON_DETAILS_LOADING } from "../constants/action-types";
import {extractPokemonId} from '../utils';

const initialState = {
	pokemons: {},
	loadingDetails : false
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case RECEIVE_POKEMON_LIST :
				const oldPokemons = {...state.pokemons};
				action.payload.results.map(pokemon =>  {
					const pokemonId = extractPokemonId(pokemon.url);
					if(!oldPokemons[pokemonId])
						oldPokemons[pokemonId] = {};
					oldPokemons[pokemonId].name = pokemon.name;
					oldPokemons[pokemonId].imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
				});
				return {...state, pokemons: oldPokemons};

		case RECEIVE_POKEMON_DETAILS :
			const {abilities, height, species, weight, types, id, stats, base_experience} = action.payload;
			const oldPokemonsDetails = {...state.pokemons};
			if(!oldPokemonsDetails[id])
				oldPokemonsDetails[id] = {};
			oldPokemonsDetails[id].abilities = abilities;
			oldPokemonsDetails[id].height = height;
			oldPokemonsDetails[id].species = species;
			oldPokemonsDetails[id].weight = weight;
			oldPokemonsDetails[id].types = types;
			oldPokemonsDetails[id].stats = stats;
			oldPokemonsDetails[id].base_experience = base_experience;
			return {...state, pokemons: oldPokemonsDetails};

		case POKEMON_DETAILS_LOADING :
			return {...state, loadingDetails : action.payload};

		default:
			return state;
	}
};
export default rootReducer;