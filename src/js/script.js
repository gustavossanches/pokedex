import createCards from './modules/criarCards.js'

const arrayUrls = []
const pokemonCardsArray = []

const getUrls = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100')
        const results = await response.json()
        const all = results.results
        return all


    } catch (error) {
        console.log(error)
    }
}

const getUrlsPokemons = async () => {
    //pegar url de todos os pokemons (um por um)
    const all = await getUrls()
    for (let pokemon of all) {
        const idPokemon = pokemon.url.split('/')[6]
        const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`

        await fetch(urlPokemon)
            .then(url => url.json())
            .then(urlPokemon => arrayUrls.push(urlPokemon))//passando url de cada pokemon para o array criado aontes

    }
    return arrayUrls
}


const criarCards = async () => {
    const urlsPokemons = await getUrlsPokemons()
    urlsPokemons.forEach(pokemon => {
        const nome = pokemon.forms[0].name
        const imagem = pokemon.sprites.front_default
        const id = pokemon.id
        createCards(nome, imagem, id)
    });
}
//informações dos cards








criarCards()


const searchForm = document.querySelector("#search")
searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const value = event.target.inputSearch.value; //pega o valor digitado no input
    const teste = []
    const pokemonsFiltered = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100000')
        .then(response => response.json())
        .then(pokemons => pokemons.results.filter(pokemon => pokemon.name.includes(value)))
        .then(pokeFiltrados => teste.push(pokeFiltrados))

    const filtros = teste[0]
    console.log(filtros);

    const pokemonCardsArray = []
    filtros.forEach(pokemon => {
        console.log(pokemon.name)
        const nome = pokemon.forms[0].name
        const imagem = pokemon.sprites.front_default
        const id = pokemon.id
        createCards(nome, imagem, id)
        const pokemonCard = document.getElementById(`pokemon-${id}`)
        pokemonCardsArray.push(pokemonCard)
    });

})