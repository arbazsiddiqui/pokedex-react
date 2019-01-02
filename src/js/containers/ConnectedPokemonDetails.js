import {connect} from "react-redux";
import PokemonDetailsModal from "../components/PokemonDetailsModal";
import * as actions from "../actions/index"

const mapDispatchToProps = dispatch => {
	return {
		getPokemonEvolution : (url, pokemonId) => dispatch(actions.getPokemonEvolution(url, pokemonId))
	}
};

const mapStateToProps = state => {
	return {loadingEvolution : state.loadingEvolution, evolutionChains : state.evolutionChains}
};

const ConnectedPokemonDetailsModal = connect(mapStateToProps, mapDispatchToProps)(PokemonDetailsModal);

export default ConnectedPokemonDetailsModal