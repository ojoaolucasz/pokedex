const urlBase = 'https://pokeapi.co/api/v2/berry/';

const imagem = document.querySelector('.imagemBerry');
const pesquisarEnter = document.querySelector('.nomeBerry');
const pesquisarBotao = document.querySelector('.botaoPesquisar')
const nome = document.querySelector('.card-title');
const id = document.querySelector('.berryId');
const consistencia = document.querySelector('.berryFirmness');
const descricao = document.querySelector('.berryDescription');
const fandom = document.querySelector('.pokeFandom');
const tempo_crescimento = document.querySelector('.growthTime');
const colheita_maxima = document.querySelector('.maxHarvest');
const tamanho = document.querySelector('.size');

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
function pegarImagem(url){
    fetch(url)
    .then(response => {
        if(!response.ok){
            throw new Error(`http error: status ${response.status}`)
        } return response.json();
    })
    .then(response => mostrarImagem(response))
    .catch(error => {alert(error.message)});
}
function mostrarImagem(resposta){
    pegar = `${resposta.sprites.default}`;
    console.log(pegar);
    imagem.innerHTML =  `<img src="${resposta.sprites.default}">`;
}
function mostrarResultados(berry){
    console.log(berry);
    berry_name = berry.name;
    berry_id = berry.id;
    berry_firmness = berry.firmness.name;
    berry_flavours = `${berry.flavors.map(item => " " + item.flavor.name).toString()}`;
    berry_growth = berry.growth_time;
    berry_max = berry.max_harvest;
    berry_size = berry.size/10;
    berry_imgUrl = berry.item.url;
    pegarImagem(berry_imgUrl);
    
    nome.innerHTML = berry_name.toUpperCase(berry_name);
    id.innerHTML = "Id Da Berry: " + berry_id;
    consistencia.innerHTML = "Consistência: " + berry_firmness;
    descricao.innerHTML = "Sabor Da Berry: " + berry_flavours;
    tempo_crescimento.innerHTML = "Tempo De Crescimento: de " + berry_growth + " em " + berry_growth + " horas.";
    colheita_maxima.innerHTML = "Número Máximo De Berries por colheita: até " + berry_max + " berries";
    tamanho.innerHTML = "Tamanho Da Berry: " + berry_size + "cm";
    fandom.innerHTML = `<a href="https://pokemon.fandom.com/wiki/${berry.name}_Berry" target="_blank"  style="display: flex; justify-content: center; align-items: center;"><button type="button" class="btn btn-warning">Mais Detalhes</button></a>`
}