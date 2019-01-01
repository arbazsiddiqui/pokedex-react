import {connect} from "react-redux";
import PokemonCard from "../components/PokemonCard";
import * as actions from "../actions/index"

const mapDispatchToProps = dispatch => {
	return {
		getPokemonDetails : pokemonId => dispatch(actions.getPokemonDetails(pokemonId))
	}
};

const mapStateToProps = state => {
	return {loadingDetails : state.loadingDetails}
};

const ConnectedPokemonCard = connect(mapStateToProps, mapDispatchToProps)(PokemonCard);

export default ConnectedPokemonCard