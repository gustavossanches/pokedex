export default function createCards(nome, imagem, id) {
  // Creating HTML tags and variables for pokémon's data; 
  const container = document.getElementById("container-cards");
  const section = document.createElement("section");
  const p = document.createElement("p");
  const img = document.createElement("img");
  const div = document.createElement("div");
  const h5 = document.createElement("h5");
  

  // Inserting the HTML tags in their respective places
  container.appendChild(section);
  section.appendChild(p);
  section.appendChild(img);
  section.appendChild(div);
  div.appendChild(h5);
  
  // Adding classes to created HTML tags
  p.classList.add("text-center")
  section.classList.add("card");
  img.classList.add("card-img-top");
  div.classList.add("card-body");
  h5.classList.add("card-title");
  h5.id = `pokemon-${id}`;
  
  section.addEventListener('click', (_) => {
    const numero_id = id
    window.location.href = `details.html?id=${numero_id}`;

})

  /*
  h5.addEventListener('click', (e) => {
    redirect_detail(h5.id)
  })
  */

  // Inserting the pokémon's data in their respective HTML tags
  p.innerText = id;
  h5.innerText = nome;
  img.src = imagem;
}

//TODO: nesse module, iremos criar a função que cria o card do exemplo no index.html usando o que aprendemos nas aulas de criação de elementos DOM (UC2 - aula 8 - dia 15/11). Depois de criar iremos exportar essa função para a script.js
