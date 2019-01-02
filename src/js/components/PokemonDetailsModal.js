import {Component} from "react";
import React from 'react'
import * as _ from 'lodash'
import {Button, Dimmer, Loader, Image, Modal, Tab, List, Label} from 'semantic-ui-react'
import * as title from 'title-case'

class PokemonDetailsModal extends Component {
	constructor() {
		super();
		this.renderBasic = this.renderBasic.bind(this);
		this.renderStats = this.renderStats.bind(this);
		this.renderEvolution = this.renderEvolution.bind(this);
	}

	renderBasic() {
		const {pokemon} = this.props;
		const colorMap = {
			poison: "purple",
			water: "blue",
			flying: "brown",
			grass: "green",
			fire: "orange",
			bug: "olive",
			normal: "grey",
			fighting: "red",
			electric: "yellow",
			ground: "brown",
			rock: "brown",
			ice: "teal",
			ghost: "violet",
			dark: "black",
			steel: "grey",
			fairy: "pink",
			psychic: "pink",
			dragon: "violet"
		};
		return (
			<Tab.Pane>
				<List divided relaxed>
					<List.Item>
						<List.Header>Type</List.Header>
						<List>
							{pokemon.types.map((type, index) =>
								<Label key={index} color={colorMap[type.type.name]} horizontal>{title(type.type.name)}</Label>
							)}
						</List>
					</List.Item>
					<List.Item>
						<List.Header>Base Experience</List.Header>
						{pokemon.base_experience}
					</List.Item>
					<List.Item>
						<List.Header>Height</List.Header>
						{pokemon.height}
					</List.Item>
					<List.Item>
						<List.Header>Weight</List.Header>
						{pokemon.weight}
					</List.Item>
					<List.Item>
						<List.Header>Abilities</List.Header>
						<List>
							{pokemon.abilities.map((ability, index) =>
								<List.Item key={index}>
									<List.Header>
										{title(ability.ability.name)}
									</List.Header>
								</List.Item>
							)}
						</List>
					</List.Item>
				</List>
			</Tab.Pane>
		)
	}

	renderStats() {
		const {pokemon} = this.props;
		return (
			<Tab.Pane>
				<List divided relaxed>
					{pokemon.stats.map((stat, index) =>
						<List.Item key={index}>
							<List.Header>
								{title(stat.stat.name)}
							</List.Header>
							{stat.base_stat}
						</List.Item>
					)}
				</List>
			</Tab.Pane>)
	}

	renderEvolution() {
		const {pokemon, loadingEvolution, evolutionChains, pokemonId} = this.props;
		if (_.isEmpty(evolutionChains[pokemonId])) {
			if (loadingEvolution === false) {
				this.props.getPokemonEvolution(pokemon.species.url, pokemonId);
				return (<Dimmer active>
					<Loader indeterminate>Loading Pokemon Evolution...</Loader>
				</Dimmer>)
			}
		} else {
			return (
				<div>
					{evolutionChains[pokemonId].map((evol, index) => {
						return (
							<div key={index}>
								<Image src={evol.image} verticalAlign='middle'/>
								<span>{title(evol.name)}</span>
							</div>
						)
					})}
				</div>
			)
		}
	}

	render() {

		const panes = [
			{menuItem: 'Basic', render: this.renderBasic},
			{menuItem: 'Stats', render: this.renderStats},
			{menuItem: 'Evolution', render: this.renderEvolution}
		];

		const {pokemon, loadingDetails, handleClose} = this.props;
		return (
			<Modal open={true} closeIcon={true} onClose={handleClose}>
				<Modal.Header>{title(pokemon.name)}</Modal.Header>
				<Modal.Content image>
					<Image wrapped src={pokemon.imgUrl}/>
					{loadingDetails ?
						<Dimmer active>
							<Loader>Loading Pokemon Details...</Loader>
						</Dimmer>
						: <Modal.Description>
							<Tab panes={panes}/>
						</Modal.Description>}
				</Modal.Content>
			</Modal>
		)
	}
}

export default PokemonDetailsModal