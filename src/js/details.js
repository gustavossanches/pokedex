//pega o id da url do pokemon especifico(usar o fetch com esse id para ter elementos do pokemon especifico)
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
let idd = id

//teste
/*
function testandoAqui(n){
    let soma = id
    if(n == 0){
        soma--
    }else{
        soma++
    }
    params.set('id', soma)
    const updatedUrl = window.location.origin + window.location.pathname + "?" + params.toString();
    window.location.href = updatedUrl;
}
*/

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
if(id == 1){    //some o botao caso seja o primeiro pokemon
    previous.style.display = 'none'
}
previous.addEventListener('click', () => {
    let soma = id
    soma--
    params.set('id', soma)
    const updatedUrl = window.location.origin + window.location.pathname + "?" + params.toString();
    window.location.href = updatedUrl;
})


const carregaDetail = async (idd) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idd}`)
        const results = await response.json()

        //pega as informações do pokemon da url
        const nome = results.forms[0].name
        const moves = results.moves
        moves.forEach(({move}) => {
            const result_moves = document.getElementById('result-moves')
            result_moves.innerHTML += `<div>${move.name}</div>`
        });
        
        const types = results.types
        types.forEach(({type}) => {
            const result_type = document.getElementById('result-type')
            result_type.innerHTML += `<div class="type-${type.name}">${type.name}</div>`
        })

        const height = results.height / 10;
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


        //pega os ids e insere os dados
        const result_name = document.getElementById('result-name')
        result_name.innerHTML = nome

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

console.log(carregaDetail(idd))

carregaDetail(idd)