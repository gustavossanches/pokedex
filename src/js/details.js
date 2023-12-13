//pega o id da url do pokemon especifico(usar o fetch com esse id para ter elementos do pokemon especifico)
const params = new URLSearchParams(window.location.search);
const id = params.get('id');