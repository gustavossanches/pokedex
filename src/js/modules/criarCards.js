export default function createCards(pokemon) {
  // Creating HTML tags and variables for pokémon's data; 
  const section = document.getElementById("container-card");
  const p = document.createElement("p");
  const img = document.createElement("img");
  const div = document.createElement("div");
  const h5 = document.createElement("h5");
  let pokemonId = pokemon.id;
  let pokemonName = pokemon.name;

  // Inserting the HTML tags in their respective places
  section.appendChild(p);
  section.appendChild(img);
  section.appendChild(div);
  div.appendChild(h5);

  // Adding classes to created tags
  img.classList.add("card-img-top");
  div.classList.add("card-body");
  h5.classList.add("card-title");

  // Inserting the pokémon's data in their respective HTML tags
  p.appendChild(pokemonId);
  h5.appendChild(pokemonName);

}

//TODO: nesse module, iremos criar a função que cria o card do exemplo no index.html usando o que aprendemos nas aulas de criação de elementos DOM (UC2 - aula 8 - dia 15/11). Depois de criar iremos exportar essa função para a script.js
