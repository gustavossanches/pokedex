console.log('1')


const carregar = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100')
        
        const results = await response.json()
        const all = results.results
        for(let i of all) {
            console.log(i)
        }

        console.log(all)

    } catch (error) {
        console.log(error)
    }
}

carregar()

