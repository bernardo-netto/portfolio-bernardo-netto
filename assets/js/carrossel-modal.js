
// Responsabilidade: Gerenciamento do estado e controle visual dos slides internos do modal.

"use strict";

// Estados globais do Carrossel compartilhados
window.indiceSlideAtual = 0;
window.slidesTotais = [];

function atualizarVisualCarrossel() {
  const trilho = document.getElementById("modal-trilho-carrossel");
  const setaEsq = document.getElementById("seta-esq-id");
  const setaDir = document.getElementById("seta-dir-id");
  const indicadores = document.querySelectorAll(".modal-carrossel-indicador");

  if (trilho) {
    trilho.style.transform = `translateX(-${window.indiceSlideAtual * 100}%)`;
  }

  if (setaEsq) {
    if (window.indiceSlideAtual === 0) {
      setaEsq.style.opacity = "0";
      setaEsq.style.pointerEvents = "none";
    } else {
      setaEsq.style.opacity = "1";
      setaEsq.style.pointerEvents = "auto";
    }
  }

  if (setaDir) {
    if (window.indiceSlideAtual === window.slidesTotais.length - 1) {
      setaDir.style.opacity = "0";
      setaDir.style.pointerEvents = "none";
    } else {
      setaDir.style.opacity = "1";
      setaDir.style.pointerEvents = "auto";
    }
  }

  indicadores.forEach((ind, i) => {
    if (i === window.indiceSlideAtual) ind.classList.add("ativo");
    else ind.classList.remove("ativo");
  });
}

function slideProximo() {
  if (window.indiceSlideAtual < window.slidesTotais.length - 1) {
    window.indiceSlideAtual++;
    atualizarVisualCarrossel();
  }
}

function slideAnterior() {
  if (window.indiceSlideAtual > 0) {
    window.indiceSlideAtual--;
    atualizarVisualCarrossel();
  }
}

function mudarParaSlide(indice) {
  window.indiceSlideAtual = indice;
  atualizarVisualCarrossel();
}

// Vincula ao escopo global para os cliques via atributos inline (onclick) funcionarem
window.atualizarVisualCarrossel = atualizarVisualCarrossel;
window.slideProximo = slideProximo;
window.slideAnterior = slideAnterior;
window.mudarParaSlide = mudarParaSlide;