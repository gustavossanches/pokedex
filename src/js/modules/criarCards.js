
export const escolherCor = (tipo) => {
  const colors = {
    'normal': '#afada6',
    'poison': '#a05790',
    'psychic': '#ea5a9d',
    'grass': '#7bc45b',
    'ground': '#dabb64',
    'ice': '#80defa',
    'fire': '#e84a41',
    'rock': '#bcae71',
    'dragon': '#826fee',
    'water': '#46a0f8',
    'bug': '#b0be45',
    'dark': '#855f52',
    'fighting': '#b05b50',
    'ghost': '#6e6cbf',
    'steel': '#b3b2c4',
    'flying': '#6e97ef',
    'electric': '#f7cf52',
    'fairy': '#e6a0e6',
  }
  return colors[tipo]
}
export default function createCards(nome, imagem, id, type) {
  // Creating HTML tags and variables for pokémon's data; 


  const container = document.getElementById("container-cards");
  const section = document.createElement("section");
  const p = document.createElement("p");
  const img = document.createElement("img");
  const div = document.createElement("div");
  const h5 = document.createElement("h5");
  const tipo = document.createElement("p");


  // Inserting the HTML tags in their respective places
  container.appendChild(section);
  section.appendChild(p);
  section.appendChild(img);
  section.appendChild(div);
  div.appendChild(h5);
  div.appendChild(tipo);

  // Adding classes to created HTML tags
  p.classList.add("text-center")
  p.classList.add("pokemon-id")
  section.classList.add("card");
  img.classList.add("card-img-top");
  div.classList.add("card-body");
  div.classList.add("d-flex");
  div.classList.add("flex-column");
  div.classList.add("align-items-center");
  
  h5.classList.add("card-title");
  h5.classList.add("p-2");
  

  h5.id = `pokemon-${id}`;

  tipo.classList.add("tipos");
  tipo.style.backgroundColor = escolherCor(type)

  section.style.backgroundColor = escolherCor(type)


// Adiciona um ouvinte de evento para mouseout


  section.addEventListener('click', () => {
    const numero_id = id
    window.location.href = `/src/pages/details.html?id=${numero_id}`;

  })

  /*
  h5.addEventListener('click', (e) => {
    redirect_detail(h5.id)
  })
  */

  // Inserting the pokémon's data in their respective HTML tags
  const nomeFormatado = nome.charAt(0).toUpperCase() + nome.substring(1)
  p.innerText = id;
  tipo.innerText = type;
  h5.innerText = nomeFormatado;
  img.src = imagem;
}



//TODO: nesse module, iremos criar a função que cria o card do exemplo no index.html usando o que aprendemos nas aulas de criação de elementos DOM (UC2 - aula 8 - dia 15/11). Depois de criar iremos exportar essa função para a script.js
