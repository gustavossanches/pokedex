import createCards from './modules/criarCards.js'

//retorna os dados de todos os pokemons (name e url do pokemon)
const fetchAllPokemons = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100')
        const results = await response.json()
        const all = results.results
        return all
    } catch (error) {
        console.log(error)
    }
}

// const getUrlsPokemons = async () => {
//     //pegar url de todos os pokemons (um por um)
//     const all = await fetchAllPokemons()
//     for (let pokemon of all) {
//         const idPokemon = pokemon.url.split('/')[6]

//         // await fetch(urlPokemon)
//         //     .then(url => url.json())
//         //     .then(urlPokemon => arrayUrls.push(urlPokemon))//passando url de cada pokemon para o array criado aontes

//     }
//     return arrayUrls
// }

//faz o fetch na url do pokemon passada no parametro e retorna suas informações
const fetchPokemonInfo = async (urlPokemon) => { //recebe a url de UM pokemon e retorna seus dados
    const response = await fetch(urlPokemon)
    const pokemon = await response.json()
    return pokemon
}

//cria os cards quando carrega a página
const criarCards = async () => {
    const allPokemons = await fetchAllPokemons()

    for(const pokemon of allPokemons){
        const pokemonInfo = await fetchPokemonInfo(pokemon.url)

        const nome = pokemonInfo.name
        const imagem = pokemonInfo.sprites.front_default
        const id = pokemonInfo.id

        createCards(nome, imagem, id)
    }

}
criarCards()


const searchForm = document.querySelector("#search")
searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    document.querySelector("#container-cards").innerHTML = ""; //quando der o submit ele limpa a página tirando todos os cards para receber somente os filtrados no final
    const value = event.target.inputSearch.value; //pega o valor digitado no input
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100000')
    const data = await response.json() //fetch na url com todos os pokemons

    const pokemonsFiltered = data.results.filter(pokemon => pokemon.name.includes(value));//filtra is pokemons por nome verificando se o que foi digitado esta no nome dele

    //console.log("pokemonsFiltered: ", pokemonsFiltered);

    for (const pokemon of pokemonsFiltered) {
       // console.log("Pokemon: ", pokemon)
        const pokemonData = await getPokemonInfo(pokemon.url) //pega a url do pokemon e passa para a função que pega os dados pela url
        console.log(pokemonData)
        const nome = pokemonData.name;
        const imagem = pokemonData.sprites.front_default
        const id = pokemonData.id;
        createCards(nome, imagem, id) //no final do submit vai trazer novos cards com os dados filtrados
    }

})