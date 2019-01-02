import {Component} from "react";
import React from "react";
import InfiniteScroll from 'react-infinite-scroller'
import PokemonCard from '../containers/ConnectedPokemonCard'
import {Container, Grid, Loader, Menu} from 'semantic-ui-react'

class PokemonList extends Component {
	constructor() {
		super();
		this.state = {
			offset: 0
		};
		this.hasMore = true;
		this.initialLoad = true;
		this.loadMore = this.loadMore.bind(this);
	}

	componentDidMount() {
		this.initialLoad = false;
	}

	loadMore() {
		this.props.getPokemonList(this.state.offset);
		this.state.offset = this.state.offset + 20;
	}


	renderList() {
		const {pokemons} = this.props;

		return Object.keys(pokemons).map((id) => {
			return (
				<Grid.Column key={id}>
					<PokemonCard
						pokemonId={id}
						pokemon={pokemons[id]}
					/>
				</Grid.Column>
			);
		});
	}

	render() {
		return (
			<div>
				<Menu pointing secondary size='huge'>
					<Menu.Item name='pokedex'/>
				</Menu>
				<InfiniteScroll
					className="card-list"
					pageStart={0}
					initialLoad = {this.initialLoad}
					loadMore={this.loadMore}
					// loader={<Loader active inline='centered' />}
					hasMore={this.hasMore}
					useWindow={true}
				>
					<Container >
						<Grid relaxed columns={5}>
							{this.renderList()}
						</Grid>
					</Container>

				</InfiniteScroll>
			</div>
		);
	}
}

export default PokemonList