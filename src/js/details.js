
//pega o id da url do pokemon especifico(usar o fetch com esse id para ter elementos do pokemon especifico)
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const carregaDetail = async () => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const results = await response.json()
        const nome = results.forms[0].name
        const moves = results.moves
        const pokemonMoves = []
        moves.forEach(move => {
            pokemonMoves.push(move.move.name)
        });
        const pokemonTypes = []
        const types = results.types
        types.forEach(type => {
            pokemonTypes.push(type.type.name)
        })
        const height = results.height
        const weight = results.weight

        const image = results.sprites.front_default
        const imageShiny = results.sprites.front_shiny

        const pokemonEstatisticas = []
        const estatisticas = results.stats
        estatisticas.forEach(estatistica => {
            const baseStat = estatistica.base_stat
            pokemonEstatisticas.push(baseStat)
        })

    } catch (error) {
        
    }
}

carregaDetail()