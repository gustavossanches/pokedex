
import createCards from './modules/criarCards.js'

const carregar = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100')
        const arrayUrls = []

        const results = await response.json()
        const all = results.results

        //pegar url de todos os pokemons (um por um)
        for (let pokemon of all) {
            const idPokemon = pokemon.url.split('/')[6]
            const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`

            await fetch(urlPokemon)
                .then(url => url.json())
                .then(urlPokemon => arrayUrls.push(urlPokemon))//passando url de cada pokemon para o array criado aontes

        }

        //informações dos cards
        const pokemonCardsArray = []
        arrayUrls.forEach(pokemon => {
            const nome = pokemon.forms[0].name
            const imagem = pokemon.sprites.front_default
            const id = pokemon.id
            createCards(nome, imagem, id)
            const pokemonCard = document.getElementById(`pokemon-${id}`)
            pokemonCardsArray.push(pokemonCard)
        });


        //renderiza a pagina detail do pokemon especifico
        // pokemonCardsArray.forEach((e) => {
        //     e.addEventListener('click', (_) => {
        //         const numero_id = e.id.split('-')[1]
        //         window.location.href = `details.html?id=${numero_id}`;

        //         const teste = document.getElementById('teste')
        //         console.log(teste)
        //         const testeTag = document.createElement("p");
        //         teste.appendChild(testeTag)
        //     })
        // })



    } catch (error) {
        console.log(error)
    }
}

carregar()



/*
   const teste = document.createElement('h1')
            const testeTexto = document.createTextNode(i.name)
            teste.appendChild(testeTexto)
            const container = document.getElementById('container')
            container.appendChild(teste)
*/
