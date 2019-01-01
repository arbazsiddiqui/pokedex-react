import {RECEIVE_POKEMON_LIST, RECEIVE_POKEMON_DETAILS, POKEMON_DETAILS_LOADING} from "../constants/action-types";
import axios from "axios/index";
import {extractPokemonId} from '../utils';

export const receivePokemonList = offset => ({type: RECEIVE_POKEMON_LIST, payload: offset});
export const receivePokemonDetails = data => ({type: RECEIVE_POKEMON_DETAILS, payload: data});
export const pokemonDetailsLoading = bool => ({type: POKEMON_DETAILS_LOADING, payload: bool});

export const getPokemonDetails = pokemonId => dispatch => {
	dispatch(pokemonDetailsLoading(true));
	return axios(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
		.then(({data}) => {
			dispatch(receivePokemonDetails(data));
			dispatch(pokemonDetailsLoading(false));
		})
};

export const getPokemonList = offset => dispatch => {
	return axios(`http://pokeapi.salestock.net/api/v2/pokemon-form/?offset=${offset}`)
		.then(({data}) => {
			dispatch(receivePokemonList(data));
		})
};