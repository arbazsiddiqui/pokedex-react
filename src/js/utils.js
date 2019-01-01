const extractPokemonId = url => {
	const split = url.split('/');
	return split[6];
};

module.exports ={
	extractPokemonId
};