const urlBase = 'https://pokeapi.co/api/v2/pokemon/';

const imagem = document.querySelector('.imagemPokemon');
const pesquisarEnter = document.querySelector('.nomePokemon');
const pesquisarBotao = document.querySelector('.botaoPesquisar')
const nome = document.querySelector('.card-title');
const id = document.querySelector('.pokeId');
const tipo = document.querySelector('.pokeType');
const descricao = document.querySelector('.pokeDescription');
const fandom = document.querySelector('.pokeFandom');
const peso = document.querySelector('.pokePeso');
const altura = document.querySelector('.pokeAltura');

pesquisarBotao.addEventListener('click', function() {
    obterResultados(pesquisarEnter.value);
});
pesquisarEnter.addEventListener('keypress', pesquisar);
function pesquisar(event){
    key = event.keyCode;
    if(key == 13){
        obterResultados(pesquisarEnter.value);
    }
}
function obterResultados(nome){
    fetch(`${urlBase}${nome}`)
    .then(response => {
        if(!response.ok){
            throw new Error(`http error: status ${response.status}`)
        } return response.json();
    })
    .then(response => mostrarResultados(response))
    .catch(error => {alert(error.message)});
}
function mostrarResultados(pokemon){
    console.log(pokemon);
    pokemon_nome = pokemon.name;
    pokemon_id = pokemon.id;
    pokemon_skills = `${pokemon.moves.map(item => ' ' + item.move.name).toString()}`;
    pokemon_weight = pokemon.weight / 10; 
    pokemon_height = pokemon.height / 10;
    pokemon_image = `${pokemon.sprites.front_default}`;
    nome.innerHTML = pokemon_nome.toUpperCase(pokemon_nome);
    id.innerHTML = "Id Do Pokémon: " + pokemon_id; 
    tipo.innerHTML = "Tipo Do Pokémon: " + `${pokemon.types[0].type.name}`;
    descricao.innerHTML = "Habilidades: " + pokemon_skills;
    peso.innerHTML = "Peso: " + pokemon_weight + "Kg";
    altura.innerHTML = "Altura: " + pokemon_height + "m";
    imagem.innerHTML = `<img src="${pokemon.sprites.front_default}">`;
    fandom.innerHTML = `<a href="https://pokemon.fandom.com/wiki/${pokemon.name}" target="_blank"  style="display: flex; justify-content: center; align-items: center;"><button type="button" class="btn btn-warning">Mais Detalhes</button></a>`
}