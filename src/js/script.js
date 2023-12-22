import createCards from './modules/criarCards.js'


const btnNext = document.getElementById('next')
const btnPrevious = document.getElementById('previous')
let page = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0"//url padrao que vai ser trocada por results.next para paginação
let previousPage = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0"

//retorna os dados de todos os pokemons (name e url do pokemon)
const fetchAllPokemons = async (url) => {
    try {
        const response = await fetch(url)
        const results = await response.json()
        page = results.next
        previousPage = results.previous
        const all = results.results
        return all
    } catch (error) {
        console.log(error)
    }
}

//loading enquanto não carrega os dados
let loading = document.getElementById('loading')
let contentSection = document.getElementById('content-section')
let contentButtons = document.getElementById('content-buttons')
window.addEventListener('load', () => {

    contentSection.classList.remove('d-none')
    contentButtons.classList.remove('d-none')
    loading.classList.add('d-none')
})

//faz o fetch na url do pokemon passada no parametro e retorna suas informações
const fetchPokemonInfo = async (urlPokemon) => { //recebe a url de UM pokemon e retorna seus dados
    const response = await fetch(urlPokemon)
    const pokemon = await response.json()
    return pokemon
}

//cria os cards quando carrega a página
const criarCards = async (url) => {
    document.querySelector("#container-cards").innerHTML = "";
    const allPokemons = await fetchAllPokemons(url)

    for (const pokemon of allPokemons) {
        const pokemonInfo = await fetchPokemonInfo(pokemon.url)

        const type = pokemonInfo.types[0].type.name
        const nome = pokemonInfo.name
        const imagem = pokemonInfo.sprites.front_default
        const id = pokemonInfo.id
        createCards(nome, imagem, id, type)
    }

}
criarCards(page)

const searchForm = document.querySelector("#search")
searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    document.querySelector("#container-cards").innerHTML = ""; //quando der o submit ele limpa a página tirando todos os cards para receber somente os filtrados no final
    const value = event.target.inputSearch.value; //pega o valor digitado no input
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100000')
    const data = await response.json() //fetch na url com todos os pokemons

    const pokemonsFiltered = data.results.filter(pokemon => pokemon.name.includes(value));//filtra is pokemons por nome verificando se o que foi digitado esta no nome dele


    for (const pokemon of pokemonsFiltered) {
        const pokemonData = await fetchPokemonInfo(pokemon.url) //pega a url do pokemon e passa para a função que pega os dados pela url
        const type = pokemonData.types[0].type.name
        const nome = pokemonData.name;
        const imagem = pokemonData.sprites.front_default
        const id = pokemonData.id;

        createCards(nome, imagem, id, type) //no final do submit vai trazer novos cards com os dados filtrados
    }

    //mensagem caso search não tenha dados e tira os botões
    const dataSearchNull = containerCards.childNodes.length
    if(dataSearchNull == 0){
        const nullMessage = 'Nenhum pokémon foi encontrado!'
        const tagMessage = document.createElement('h3')
        tagMessage.classList.add('messageNull')
        tagMessage.append(nullMessage)
        containerCards.append(tagMessage)

        const prev = document.getElementById('previous')
        const next = document.getElementById('next')
        prev.style.display = 'none'
        next.style.display = 'none'

        prev.setAttribute("disabled", true);
        next.setAttribute("disabled", true);
    }

})

btnPrevious.addEventListener('click', () => {
    criarCards(previousPage)
})

btnNext.addEventListener('click', () => {
    criarCards(page)
})



