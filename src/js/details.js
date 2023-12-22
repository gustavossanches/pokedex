import { escolherCor } from "./modules/criarCards.js";

//pega o id da url do pokemon especifico(usar o fetch com esse id para ter elementos do pokemon especifico)
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

//botao next
const next = document.getElementById('next')
next.addEventListener('click', () => {
    let soma = id
    soma++
    params.set('id', soma)
    const updatedUrl = window.location.origin + window.location.pathname + "?" + params.toString();
    window.location.href = updatedUrl;
})


//botao previous
const previous = document.getElementById('previous')
if (id == 1) {    //some o botao caso seja o primeiro pokemon
    previous.setAttribute("disabled", true);
}
previous.addEventListener('click', () => {
    let soma = id
    soma--
    params.set('id', soma)
    const updatedUrl = window.location.origin + window.location.pathname + "?" + params.toString();
    window.location.href = updatedUrl;
})



const carregaDetail = async (id) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const results = await response.json()
        const descriptionFetch = await fetch(results.species.url)
        const descriptionretults = await descriptionFetch.json()
        const description = descriptionretults.flavor_text_entries[0].flavor_text.replaceAll('\f', ' ')
        const tagdescription = document.getElementById('description')
        tagdescription.innerHTML = description
        
        //pega as informações do pokemon da url
        const nome = results.forms[0].name
        const nomeFormatado = nome.charAt(0).toUpperCase() + nome.substring(1)


        const moves = results.moves

        //cria uma div para cada move
        moves.forEach(({ move }) => {
            const result_moves = document.getElementById('result-moves')
            result_moves.innerHTML += `<div>${move.name}</div>`
        });

        //cria uma div para cada tipo
        const types = results.types
        types.forEach(({ type }) => {
            const result_type = document.getElementById('result-type')
            result_type.innerHTML += `<div class="tipos-detail m-2 type-${type.name}">${type.name}</div>`
        })

        //adiciona style nos tipos com base na classe definida em cada um
        const tipos_pokemon_details = document.getElementsByClassName('tipos-detail')
            for(const tipo of tipos_pokemon_details){
                const tipo_classe = tipo.className.split(' ')[2].split('-')[1]
                tipo.style.backgroundColor = escolherCor(tipo_classe)
            }

        const height = results.height / 10;
        const weight = results.weight / 10;
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


        //pega os ids e insere os dados
        const result_name = document.getElementById('result-name')
        result_name.innerHTML = nomeFormatado

        const result_height = document.getElementById('result-height')
        result_height.innerHTML = height

        const result_id = document.getElementById('result-id')
        result_id.innerHTML = id



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

        const image_normal = document.getElementById('image-normal')
        image_normal.src = image

        const image_shiny = document.getElementById('image-shiny')
        image_shiny.src = imageShiny


    } catch (error) {

    }
}


carregaDetail(id)