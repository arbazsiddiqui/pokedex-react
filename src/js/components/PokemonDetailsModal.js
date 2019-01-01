import {Component} from "react";
import React from 'react'
import { Button, Header, Image, Modal, Tab, List } from 'semantic-ui-react'

class PokemonDetailsModal extends Component {
	constructor(){
		super();
		this.renderBasic = this.renderBasic.bind(this);

	}

	renderBasic () {
		const {pokemon} = this.props;
		return (
			<Tab.Pane>
				<List divided relaxed>
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
							{pokemon.abilities.map(ability =>
								<List.Item>
									<List.Header>
									{ability.ability.name}
									</List.Header>
								</List.Item>
							)}
						</List>
					</List.Item>
				</List>
			</Tab.Pane>
		)
	}

	render() {

		const panes = [
			{ menuItem: 'Basic', render: this.renderBasic },
			{ menuItem: 'Stats', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
			{ menuItem: 'Evolution', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
		];

		const {pokemon, loadingDetails, handleClose} = this.props;
		return(
			<Modal open={true} closeIcon={true} onClose={handleClose}>
				<Modal.Header>{pokemon.name}</Modal.Header>
				<Modal.Content image>
					<Image wrapped src={pokemon.imgUrl} />
					<Modal.Description>
						{loadingDetails ? "Loading" : <Tab panes={panes} />}
					</Modal.Description>
				</Modal.Content>
			</Modal>
			)
	}
}

export default PokemonDetailsModal