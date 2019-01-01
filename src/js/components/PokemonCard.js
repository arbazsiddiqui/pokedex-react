import {Component} from "react";
import React from "react";
import {Card, Image} from 'semantic-ui-react'
import PokemonDetailsModal from './PokemonDetailsModal'

class PokemonCard extends Component {
	constructor() {
		super();
		this.state = {
			isShowingModal: false,
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);

	}

	handleClick(e) {
		e.preventDefault();
		const {pokemonId} = this.props;
		this.setState({ isShowingModal: true });
		this.props.getPokemonDetails(pokemonId)
	};

	handleClose() {
		this.setState({ isShowingModal: false });
	}

	render() {
		const {pokemon, loadingDetails} = this.props;
		return (
			<div>
				<a href="#" onClick={this.handleClick}><Card color='red'>
					<Image src={pokemon.imgUrl}/>
					<Card.Content>
						<Card.Header>{pokemon.name}</Card.Header>
						{/*<Card.Meta>*/}
							{/*<span className='date'>{pokemon.height}</span>*/}
						{/*</Card.Meta>*/}
					</Card.Content>
				</Card></a>
				{this.state.isShowingModal && <PokemonDetailsModal pokemon={pokemon} loadingDetails = {loadingDetails} handleClose={this.handleClose}/>}
			</div>
		)
	}
}

export default PokemonCard