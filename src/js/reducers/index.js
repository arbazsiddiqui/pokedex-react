import { RECEIVE_POKEMON_LIST, RECEIVE_POKEMON_DETAILS, UPDATE_POKEMON_DETAILS_LOADING, RECEIVE_POKEMON_EVOLUTION, UPDATE_POKEMON_EVOLUTION_LOADING } from "../constants/action-types";
import {extractPokemonId} from '../utils';
import * as _ from 'lodash'

const initialState = {
	pokemons: {},
	evolutionChains : {},
	loadingDetails : false,
	loadingEvolution : false
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
			oldPokemonsDetails[id].id = id;
			oldPokemonsDetails[id].base_experience = base_experience;
			return {...state, pokemons: oldPokemonsDetails};

		case UPDATE_POKEMON_DETAILS_LOADING :
			return {...state, loadingDetails : action.payload};

		case UPDATE_POKEMON_EVOLUTION_LOADING :
			return {...state, loadingEvolution : action.payload};

		case RECEIVE_POKEMON_EVOLUTION :
			const oldPokemonsEvolutions= {...state.pokemons};
			const oldEvolutionChain = {...state.evolutionChains};
			const evolution = [];
			const evolves = (evolves_to) => {
				if(!evolves_to)
					return
				const pokemonName = evolves_to.species.name;
				evolution.push({name : pokemonName, image : _.get(Object.values(oldPokemonsEvolutions).find((pokemon => pokemon.name === pokemonName)), 'imgUrl', `https://via.placeholder.com/96?text=${pokemonName}`)});
				evolves(evolves_to.evolves_to[0])
			};
			const {chain} = action.payload.data;
			evolves(chain);
			oldEvolutionChain[action.payload.pokemonId] = evolution;
			return {...state, evolutionChains: oldEvolutionChain};

		default:
			return state;
	}
};
export default rootReducer;