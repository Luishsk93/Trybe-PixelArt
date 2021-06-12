const listaCores = document.getElementsByClassName('color');
const possiveisCores = ['black', geraCorAleatoria(), geraCorAleatoria(), geraCorAleatoria()];
const largura = 5;
const comprimento = 5;
const linhas = document.querySelectorAll('.linha');
const quadroInicial = document.getElementById('pixel-board');
const botaoVQV = document.getElementById('generate-board');
const input = document.getElementById('board-size');
let valorInput = 0;
const botao = document.getElementById('clear-board');

// Preenche o quadro
for (let i = 0; i < comprimento; i += 1) {
  for (let j = 0; j < largura; j += 1) {
    linhas[i].appendChild(criaQuadro());
    coresPaleta();
    selecionado();
    mudaSelecionado();
    // Usei como referencia https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onclick_dom. Metodo alternativo ao botao.addEventListener('click', limpaQuadro).
    botao.onclick = limpaQuadro;
  }
}
// Pinta o quadro inicial 5x5
const pixels = document.querySelectorAll('.pixel');
pixelsAPintar();

// Pinta o quadro inicial 5x5
botaoVQV.addEventListener('click', inputar);
botaoVQV.addEventListener('click', apagaLinhas);
botaoVQV.addEventListener('click', fazNovasLinhas);
botaoVQV.addEventListener('click', adicionaQuadrosePinta);


// Adiciona cores na paleta
function coresPaleta() {
  for (let i = 0; i < listaCores.length; i += 1) {
    const cor = listaCores[i];
    cor.style.backgroundColor = possiveisCores[i];
  }
}
// Cria quadro individual
function criaQuadro() {
  const quadro = document.createElement('div');
  quadro.className = 'pixel';
  quadro.style.backgroundColor = 'white';
  return quadro;
}

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

function limpaQuadro() {
  const pixels = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = 'white';
  }
}

// Recebe o valor do comprimento do quadro a ser criado
function inputar() {
  if (input.value === '') {
    alert('Board inválido!');
  } else if (parseFloat(input.value) < 5) {
    valorInput = 5;
  } else if (parseFloat(input.value) > 50) {
    valorInput = 50;
  } else {
    valorInput = parseFloat(input.value);
  }
}
// Apaga as linhas existentes
function apagaLinhas() {
  const linhas = document.querySelectorAll('.linha');
  if (valorInput > 5 && valorInput <= 50) {
    for (let i = 0; i < linhas.length; i += 1) {
      linhas[i].remove();
    }
  }
}
// Cria novas linhas, com a quantidade igual ao valor inputado
function fazNovasLinhas() {
  if (valorInput > 5 && valorInput <= 50) {
    for (let i = 0; i < valorInput; i += 1) {
      const linha = document.createElement('div');
      linha.className = 'linha';
      quadroInicial.appendChild(linha);
    }
  }
}
// Adiciona os pixels nas linhas criadas, e pinta. Obs: Sei que não é o ideal ter uma função que faz mais de uma coisa, mas não encontrei uma outra forma de criar novas linhas e pintá-las depois em funcoes diferentes.
function adicionaQuadrosePinta() {
  const linhas = document.querySelectorAll('.linha');
  if (valorInput > 5 && valorInput <= 50) {
    for (let i = 0; i < valorInput; i += 1) {
      for (let j = 0; j < valorInput; j += 1) {
        linhas[i].appendChild(criaQuadro());
      }
    }
  }
  const pixels = document.querySelectorAll('.pixel');
  function pinta(event) {
    const corSelecionada = document.querySelectorAll('.color.selected')[0].style.backgroundColor;
    for (let i = 0; i < pixels.length; i += 1) {
      const x = event.target;
      x.style.backgroundColor = corSelecionada;
    }
  }
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('click', pinta);
  }
}

// Usei como referencia esse site https://dev.to/akhil_001/generating-random-color-with-single-line-of-js-code-fhj
function geraCorAleatoria() {
  var corAleatoria = '#'+Math.floor(Math.random()*16777215).toString(16);
  return corAleatoria;
}