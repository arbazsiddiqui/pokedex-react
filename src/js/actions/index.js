import {RECEIVE_POKEMON_LIST, RECEIVE_POKEMON_DETAILS, UPDATE_POKEMON_DETAILS_LOADING, RECEIVE_POKEMON_EVOLUTION, UPDATE_POKEMON_EVOLUTION_LOADING} from "../constants/action-types";
import axios from "axios/index";

export const receivePokemonList = offset => ({type: RECEIVE_POKEMON_LIST, payload: offset});
export const receivePokemonDetails = data => ({type: RECEIVE_POKEMON_DETAILS, payload: data});
export const updatePokemonDetailsLoading = bool => ({type: UPDATE_POKEMON_DETAILS_LOADING, payload: bool});
export const receivePokemonEvolution = (data, pokemonId) => ({type: RECEIVE_POKEMON_EVOLUTION, payload: {data, pokemonId}});
export const updatePokemonEvolutionLoading = bool => ({type: UPDATE_POKEMON_EVOLUTION_LOADING, payload: bool});

export const getPokemonEvolution = (url, pokemonId) => dispatch => {
	dispatch(updatePokemonEvolutionLoading(true));
	return axios(url)
		.then(({data}) => axios(data.evolution_chain.url))
		.then(({data}) => {
			dispatch(receivePokemonEvolution(data, pokemonId));
			dispatch(updatePokemonEvolutionLoading(false));
		})
};

export const getPokemonDetails = pokemonId => dispatch => {
	dispatch(updatePokemonDetailsLoading(true));
	return axios(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
		.then(({data}) => {
			dispatch(receivePokemonDetails(data));
			dispatch(updatePokemonDetailsLoading(false));
		})
};

export const getPokemonList = offset => dispatch => {
	return axios(`http://pokeapi.salestock.net/api/v2/pokemon-form/?offset=${offset}`)
		.then(({data}) => {
			dispatch(receivePokemonList(data));
		})
};