console.log('1')

fetch('https://pokeapi.co/api/v2/pokemon/?limit=100')
    .then(response => response.json())
    .then(data => 
        console.log(data.results))
    .catch(error => console.log(error))