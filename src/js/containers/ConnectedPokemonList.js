import {connect} from "react-redux";
import PokemonList from "../components/PokemonList";
import * as actions from "../actions/index"

const mapDispatchToProps = dispatch => {
	return {
		getPokemonList : offset => dispatch(actions.getPokemonList(offset))
	}
};

const mapStateToProps = state => {
	return {pokemons : state.pokemons}
};

const ConnectedPokemonList = connect(mapStateToProps, mapDispatchToProps)(PokemonList);

export default ConnectedPokemonList