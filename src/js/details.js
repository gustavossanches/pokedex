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

        const hp = pokemonEstatisticas[0]
        const atk = pokemonEstatisticas[1]
        const def = pokemonEstatisticas[2]
        const spatk = pokemonEstatisticas[3]
        const spdef = pokemonEstatisticas[4]
        const speed = pokemonEstatisticas[5]


        //



        const result_name = document.getElementById('result-name')
        result_name.innerHTML = nome

        const result_height = document.getElementById('result-height')
        result_height.innerHTML = height

        const result_id = document.getElementById('result-id')
        result_id.innerHTML = id

        const result_moves = document.getElementById('result-moves')
        result_moves.innerHTML = pokemonMoves

        const result_weight = document.getElementById('result-weight')
        result_weight.innerHTML = weight



        const result_hps = document.getElementById('result-hp')
        result_hps.innerHTML = hp

        const result_atk = document.getElementById('result-atk')
        result_atk.innerHTML = atk

        const result_def = document.getElementById('result-def')
        result_def.innerHTML = def

        const result_spatk = document.getElementById('result-spatk')
        result_spatk.innerHTML = spatk

        const result_spdef = document.getElementById('result-spdef')
        result_spdef.innerHTML = spdef

        const result_speed = document.getElementById('result-spd')
        result_speed.innerHTML = speed
        
        
        const result_type = document.getElementById('result-type')
        result_type.innerHTML = pokemonTypes
        
        const image_normal = document.getElementById('image-normal')
        image_normal.src = image
        
        const image_shiny = document.getElementById('image-shiny')
        image_shiny.src = imageShiny


        



    } catch (error) {
        
    }
}

carregaDetail()