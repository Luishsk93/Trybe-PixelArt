const listaCores = document.getElementsByClassName('color');

const possiveisCores = ['black', 'blue', 'yellow', 'red'];

const largura = 5;

const comprimento = 5;

const linhas = document.querySelectorAll('.linha');

// Adiciona cores na paleta
function coresPaleta() {
  for (let i = 0; i < listaCores.length; i += 1) {
    const cor = listaCores[i];
    cor.style.backgroundColor = possiveisCores[i];
  }
}
coresPaleta();

// Cria quadro individual
function criaQuadro() {
  const quadro = document.createElement('div');
  quadro.className = 'pixel';
  quadro.style.backgroundColor = 'white';
  return quadro;
}

// Preenche o quadro
function preencheQuadro(comp, larg) {
  for (let i = 0; i < comp; i += 1) {
    for (let j = 0; j < larg; j += 1) {
      linhas[i].appendChild(criaQuadro());
    }
  }
}
preencheQuadro(comprimento, largura);

function selecionado() {
  let blackIndex = -Infinity;
  for (let i = 0; i < possiveisCores.length; i += 1) {
    if (possiveisCores[i] === 'black') {
      blackIndex = i;
    }
  }
  const cor = listaCores[blackIndex];
  cor.className = 'color selected';
}

selecionado();

function mudaClasse(event) {
  const x = event.target;
  for (let i = 0; i < listaCores.length; i += 1) {
    listaCores[i].className = 'color';
  }
  x.className = 'color selected';
}

function mudaSelecionado() {
  for (let i = 0; i < listaCores.length; i += 1) {
    listaCores[i].addEventListener('click', mudaClasse);
  }
}

mudaSelecionado();

const pixels = document.querySelectorAll('.pixel');

function pinta(event) {
  const corSelecionada = document.querySelectorAll('.color.selected')[0].style.backgroundColor;
  for (let i = 0; i < pixels.length; i += 1) {
    const x = event.target;
    x.style.backgroundColor = corSelecionada;
  }
}

function pixelsAPintar() {
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('click', pinta);
  }
}

pixelsAPintar();

var botao = document.getElementById('clear-board');

function limpaQuadro() {
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = 'white';
  }
}

// Usei como referencia https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onclick_dom. Metodo alternativo ao botao.addEventListener('click', limpaQuadro).
botao.onclick = limpaQuadro;